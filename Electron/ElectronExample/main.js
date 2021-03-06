const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  Tray
} = require('electron')
const path = require('path')
const url = require('url')
const request = require('./net')
require('./ipc')


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Ele'
    // 无边框
    // frame: false 
  })
  // 必须在ready事件触发以后引入
  const { powerMonitor } = require('electron')
  // 交流电触发
  powerMonitor.on('on-ac', () => {
    console.log('充电连接')
  })
  // 透明度
  win.setOpacity(0.9)
  win.setSkipTaskbar(true)
  // 菜单
  const template = [
    {
      label: '菜单',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(template)
  menu.append(new MenuItem({label: '返回上一页', click() { 
      BrowserWindow.getFocusedWindow().webContents.goBack()
   }}))
  Menu.setApplicationMenu(menu)
  win.webContents.on('context-menu', function(e) {
    menu.popup(win)
  })
  // 然后加载应用的 index.html。
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('close', function(e) {
    // 阻止关闭
    e.preventDefault()
    // 最小化
    win.minimize()
    e.returnValue = true
  })
  // const shell = require('electron')
  // const res = shell.readShortcutLink('C:\Program Files (x86)\Google\Chrome\Application\chrome.exe')
  // console.log(res)

  tray = new Tray('./images/icon.ico')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'},
    {label: '退出', click: function() {
      // 强制关闭窗口
      win.destroy()
    }}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.on('click', function() {
    // 恢复
    win.restore()
  })

  // 网络
  // request()

  // 打开开发者工具。
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow()
  }
})

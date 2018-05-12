const { ipcRenderer, clipboard } = require('electron')
const remote = require('electron').remote
const { Notification, Menu, MenuItem, net, BrowserWindow, dialog } = remote
const url = require('url')
const path = require('path')

// const menu = new Menu()
// menu.append(new MenuItem({label: '右键菜单', click() { console.log('item 1 clicked') }}))
// menu.append(new MenuItem({type: 'separator'}))
// menu.append(new MenuItem({label: '多选', type: 'checkbox', checked: true}))
// menu.append(new MenuItem({label: '返回上一页', click() { 
//   BrowserWindow.getFocusedWindow().webContents.goBack()
// }}))

// window.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
//   menu.popup(remote.getCurrentWindow())
// }, false)

document.querySelector('#sendNotification').onclick = sendNotification



new Vue({
  el: '#app',
  data: {
    list: []
  },
  methods: {
    request() {
      // 通过ipc发起请求
      ipcRenderer.send('asynchronous-message', 'request')
      // 监听主进程返回数据
      ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(this)
        try {
          this.list = JSON.parse(arg.body)
        } catch(e) {
          this.list = []
        }
      })
    }
  }
})

function openNewWindow() {

}
document.getElementById('openDialog').onclick = showOpenDialog

function showMessageBox() {
  console.log('open dialog', dialog)
  dialog.showMessageBox({
    title: 'hello对话框',
  })
}

function showOpenDialog() {
  dialog.showOpenDialog({
    // 数组类型
    properties: ['openFile']
  }, function(filePaths) {
    console.log(filePaths)
  })
}

document.getElementById('writeclipboard').onclick = function() {
  clipboard.writeText('来自clipboard.writeText的操作', 'test')
}

document.getElementById('readclipboard').onclick = function() {
  console.log(clipboard.readText())
}

document.getElementById('capturerWin').onclick = function() {
  let child = new BrowserWindow({
    parent: BrowserWindow.getFocusedWindow(),
  })
  child.loadURL(url.format({
    pathname: path.join(__dirname, './capturer/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  child.show()
}

document.getElementById('openDragWin').onclick = function() {
  let child = new BrowserWindow({
    parent: BrowserWindow.getFocusedWindow(),
  })
  child.loadURL(url.format({
    pathname: path.join(__dirname, 'drag.html'),
    protocol: 'file:',
    slashes: true
  }))
  child.show()
}

// const client = net.request({
//   method: 'GET',
//   protocol: 'https:',
//   hostname: 'www.v2ex.com',
//   port: 443,
//   path: '/api/topics/hot.json'
// })

// let body = ''

// client.on('response', (response) => {
//   // console.log(`STATUS: ${response.statusCode}`)
//   // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//   response.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`)
//     body += chunk.toString()
//   })
//   // 渲染进程中貌似无法监听end 
//   // https://github.com/electron/electron/issues/12545
//   response.on('end', () => {
//     console.log('response请求中没有更多数据。')
//     console.log(JSON.parse(body))
//   })
// })
// client.on('error', () => {
//   console.log('error<------')
// })
// client.on('close', () => {
//   console.log('close')
// })
// // 必须调用end
// client.end()
// console.log('request complete')

function sendNotification() {
  let myNotification = new Notification({
    title: '标题',
    body: '通知正文内容',
    // os提示音
    silent: true,  
  })
  console.log(myNotification)
  myNotification.show()
}
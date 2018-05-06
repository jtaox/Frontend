const remote = require('electron').remote
const { Notification, Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({label: '右键菜单', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: '多选', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)


document.querySelector('#sendNotification').onclick = sendNotification

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
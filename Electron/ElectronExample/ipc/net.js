const { ipcMain } = require('electron')
const request = require('./../net/index');

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('execute', arg)
  request().then(data => event.sender.send('asynchronous-reply', data))
})

const { ipcMain } = require('electron')
const request = require('./../net/index');

ipcMain.on('asynchronous-message', (event, arg) => {
  request().then(data => event.sender.send('asynchronous-reply', data))
})

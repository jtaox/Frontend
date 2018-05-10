const { ipcRenderer, clipboard } = require('electron')

const dragDiv = document.getElementById('dragDiv')
document.addEventListener('drop', function (e) {
  e.preventDefault()
  e.stopPropagation()
  const fd = new FormData()
  let i = 0
  for (let f of e.dataTransfer.files) {
    fd.append('file' + (i++), f)
  }
  // fd.append('file', e.dataTransfer.files)
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  axios({
    url: 'http://localhost:7001/api/upload',
    method:'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: fd
  }).then(res => {
    console.log(res)
    if (res.data.code) {
      const str = res.data.data.map(item => 'http://localhost:7001' + item.path).join(',')
      clipboard.writeText(str, 'selection')
    }
  }, err => {
    console.log(err)
  })
})
document.addEventListener('dragover', function (e) {
  e.preventDefault()
  e.stopPropagation()
})
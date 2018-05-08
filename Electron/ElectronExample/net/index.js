const { net } = require('electron')

const url = 'https://www.v2ex.com/api/topics/hot.json'
module.exports = function() {
  return new Promise((resolve, reject) => {
    let body = ''
    const client = net.request({
      method: 'GET',
      protocol: 'https:',
      hostname: 'www.v2ex.com',
      port: 443,
      path: '/api/topics/hot.json'
    })
    client.on('response', (response) => {
      // console.log(`STATUS: ${response.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`)
        body += chunk
      })
      response.on('end', () => {
        resolve({ body })
      })
    })
    client.on('error', (err) => {
      console.log('error<------')
      reject({ err })
    })
    client.on('close', () => {
      console.log('close')
    })
    // 必须调用end
    client.end()

  })
}


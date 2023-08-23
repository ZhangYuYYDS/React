var http = require('http');

const server1 = http.createServer(function (request, response) {
    // 发送响应数据 "Hello World"
    response.end('2000端口返回的结果');
})
server1.listen(2000, () => {
    console.log('2000端口创建成功');
})

const server2 = http.createServer(function (request, response) {
    // 发送响应数据 "Hello World"
    response.end('3000端口返回的结果');
})
server2.listen(3000, () => {
    console.log('3000端口创建成功');
})
var http = require('http');

const server = http.createServer(function (request, response) {
    // response对象用于给客户端返回结果

    // request对象中包含本次客户端请求的所有信息
    // 1. 请求的url
    // 2. 请求的method
    // 3. 请求的headers
    // 4. 请求携带的数据


    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
})

server.listen(8888, () => {
    console.log('Server running at http://127.0.0.1:8888/');
})
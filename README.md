# redux-saga-chat-example

## WORK IN PROGRESS

A chat app built with [redux-saga](https://github.com/yelouafi/redux-saga) and [Socket.IO](http://socket.io/).

The app is consist of two parts: [server](https://github.com/kuy/redux-saga-chat-example/tree/master/src/server) and [client](https://github.com/kuy/redux-saga-chat-example/tree/master/src/client).
The server side, which is implemented with [koa](https://github.com/koajs/koa) + [koa-socket](https://github.com/mattstyles/koa-socket), provides Socket.IO endpoint and a (fake) DB backend.

## Get Started

Clone code from [github](https://github.com/kuy/redux-saga-chat-example) and install dependencies.
To use koa-socket, Please make sure that you're using Node.js v4 or later.

```
git clone https://github.com/kuy/redux-saga-chat-example.git
cd redux-saga-chat-example
npm install
```

### Start server

```
npm start
```

### Start client (webpack-dev-server)

```
npm run client
```

### Open `http://localhost:8080/` in 2 tabs

>Notice:
This example assume you to run on local, which means not on virtual machines
like VMware, Virtualbox, etc. If a request doesn't reach to the server,
please try to rewrite `localhost` to your IP or hostname in server code.

## License

MIT

## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)

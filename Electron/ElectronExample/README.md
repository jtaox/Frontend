听说Electron爆出了 XSS 漏洞~

Electron中存在两种进程类型：主进程和渲染进程。

主进程：

运行package.json和main.js(取决于package.json中main字段，通常为main.js)的进程，一个Electron有且仅有一个主进程。该进程负责与操作系统交互、创建web页面展示用户界面等。

渲染进程：

Electron使用[Chromium](https://zh.wikipedia.org/zh/Chromium)展示web页面，web页面运行在它自己的渲染进程中。

在普通浏览器中，web页面不允许接触原生资源，在Electron中可以通过Node.js的api对操作系统进行一些底层的交互

主进程通过[BrowserWindow](https://electronjs.org/docs/api/browser-window#browserwindow)类创建页面，每个BrowserWindow实例都在自己的渲染进程里运行，也就是说每个页面都对应一个独立的渲染进程。渲染进程会在窗口中渲染web页面。

![img-0](https://raw.githubusercontent.com/jtaox/Frontend/master/Electron/ElectronExample/example/img-0.png){:height="50%" width="50%"}

上面代码运行在主进程中，是一个创建窗口的简单例子。创建了BrowserWindow实例，并调用该实例的`loadURL`方法加载html文件。在项目根目录通过`npm start`命令启动程序，便可以看到一个宽度为800，高度为600的窗口，窗口为index.html的渲染结果。创建BrowserWindow对象可以传入一个配置参数，提供了很多[选项](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions)，比如通过x、y字段指定窗口相对屏幕的偏移，通过title字段指定窗口默认标题等等。

上面代码只能运行在主进程，Electron中所有API都会指定进程类型：

![]()

有些API只能在主线程中使用，比如创建和控制窗口的BrowserWindow，有的只能在渲染线程中使用，比如在渲染进程中使用主进程模块的[remote](https://electronjs.org/docs/api/remote#remote)，也有的API既可以在主线程中使用，也可以在渲染进程中使用，比如操作剪切板的clipboar。既然分为主线程和渲染线程，那进程间通信是不可避免的


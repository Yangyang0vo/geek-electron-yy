const { app, BrowserWindow, nativeImage, Menu } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    height: 667,
    width: 375,
    webPreferences: {
      nodeIntegration: true, // 是否启用node集成 渲染进程的内容有访问node的能力
      webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
      webSecurity: false, // 禁用同源策略
      nodeIntegrationInSubFrames: true // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
    },
    icon: nativeImage.createFromPath('./public/favicon.ico'),
  });


  win.on('ready-to-show', () => {
    win.show();
    win.focus();
  });

  // win.loadFile('./public/index.html');
  setTimeout(() => {
    win.loadURL('http://localhost:3000/home/index')
    win.show();
  }, 6000);
  // win.webContents.openDevTools()
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: '欢迎来极客园～'
  }, {
    label: '尽情玩耍吧！'
  }
])
// 在whenReady()成功后调用createWindow()。
app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(dockMenu)
  }

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

}).then(createWindow);


// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();

//关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 通过检查 Node.js 的 process.platform 变量，您可以针对特定平台运行特定代码。
// 请注意，Electron 目前只支持三个平台：win32(Windows), linux(Linux) 和 darwin(macOS) 。

// 如果没有窗口打开则打开一个窗口(macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

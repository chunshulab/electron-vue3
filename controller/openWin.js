const { ipcMain, BrowserView, BrowserWindow } = require('electron')
const WinState = require('electron-win-state').default
const path = require("path")
const saveas = require('./saveas.js')

const btnCss = `right:50px;position:fixed;bottom:100px;width:120px;height:30px;line-height:30px;text-align:center;background-color:#1A84FF;cursor:pointer;z-index:1000;border-radius:15px;color:#fff;`
const js = `
  const div=document.createElement('div')
  div.innerHTML='关闭窗口'  
  div.style.cssText='${btnCss}'
  div.addEventListener('click',()=>{myApi.close()})
  document.body.appendChild(div)
 
`
let win = null

ipcMain.handle('on-open-event', (e, url) => {
  const winState = new WinState({
    defaultHeight: 800,
    defaultWidth: 600,
    electronStoreOptions: {
      name: 'window-state-open'
    }
  })
  win = new BrowserWindow({
    ...winState.winOptions,
    show: false,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/open.js')
    }
  })
  win.loadURL(url)
  win.on('ready-to-show', () => {
    win.show()
  })
  winState.manage(win)
  win.webContents.openDevTools()
  win.webContents.executeJavaScript(js).catch(() => { })
  win.webContents.on('context-menu', (e, args) => {
    saveas(args.srcURL)
  })
})
ipcMain.handle('on-close-event', (e) => {
  win.close()
})
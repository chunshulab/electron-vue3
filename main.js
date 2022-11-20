const { app, BrowserWindow } = require('electron')
const path = require("path")
const WinState = require("electron-win-state").default
const createTray=require('./tray')

require("./controller/getSource")
require("./controller/alert")
require('./controller/openWin')
require("./controller/getFilelist")
require('./controller/buildMenu')


const createWindow = () => {
  const winState = new WinState({
    defaultWidth: 1000,
    defaultHeight: 800,
    electronStoreOptions: {
      name: 'window-state-main'
    }
  })
  const win = new BrowserWindow({
    ...winState.winOptions,
    webPreferences: {
      preload: path.resolve(__dirname, "./preload/index.js")
    },
    show: false

  })
  win.loadURL("http://127.0.0.1:5173/")

  win.webContents.openDevTools()

  winState.manage(win)
  win.on('ready-to-show', () => {
    win.show()
  })
  createTray(app,win)
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


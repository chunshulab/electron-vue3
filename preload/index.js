const { contextBridge, ipcRenderer } = require('electron')

const sendUrl = async (url) => {
  let result = await ipcRenderer.invoke('on-url-event', url)
  return result
}

const alert = (msg) => {
  ipcRenderer.invoke('on-alert-event', msg)
}

const open = (url) => {
  ipcRenderer.invoke('on-open-event', url)
}
const close=()=>{
  ipcRenderer.invoke("on-close-event")
}
contextBridge.exposeInMainWorld("myApi", {
  sendUrl,
  alert,
  open,
  close
})
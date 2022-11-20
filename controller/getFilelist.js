const {ipcMain} =require('electron')
const fs=require('fs')
const path = require('path')

ipcMain.handle("on-getfiles-event", (e,arg)=>{
    const files= fs.readdirSync(path.resolve(__dirname,'../public/upload'))
    return files
})
const {Tray,app,Menu} =require('electron')
function createTray(app,win){
    const tray=new Tray('ico.png')
    tray.setToolTip("我的应用")
    tray.on('click',(e)=>{
        if(e.shiftKey){
            app.quit()
        }
    })
    /*tray.setContextMenu(Menu.buildFromTemplate([
        {label:'item1'},
        {label:'item2',click:()=>{
            win.isVisible()?win.hide():win.show()
            }}
    ]))*/
}

module.exports=createTray
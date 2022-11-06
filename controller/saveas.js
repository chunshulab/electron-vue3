const { Menu, dialog } = require("electron")
const got = require('got').default
const path = require('path')
const imageType = require('image-type')
const randomstring = require('randomstring')
const fs = require('fs')

const saveas = async (srcUrl) => {
  if (srcUrl) {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '图片另存为...',
        accelerator: "CommandOrControl+s",
        click: () => {
          got.get(srcUrl).then(async (Response) => {
            const chunk = Buffer.from(Response.rawBody)
            const imgType = imageType(chunk)

            const { filePath, canceled } = await dialog.showSaveDialog({
              title: '图片另存为',
              defaultPath: path.resolve(__dirname, "../public/upload/" + randomstring.generate(10) + `.${imgType.ext}`)
            })
            if (!canceled) {
              fs.writeFileSync(filePath, chunk)
            }
          }).catch((e) => { })
        },

      }
    ])
    contextMenu.popup()
  }
}
module.exports = saveas
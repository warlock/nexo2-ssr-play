const fs = require('fs')
const ejs = require('ejs')

/* eslint no-eval: off */

function extract (text) {
  const templateEx = /<template[^>]*>((.|[\n\r])*)<\/template>/im
  const styleEx = /<style[^>]*>((.|[\n\r])*)<\/style>/im
  const scriptEx = /<script[^>]*>((.|[\n\r])*)<\/script>/im
  const template = templateEx.exec(text)[1]
  const style = styleEx.exec(text)[1]
  const script = scriptEx.exec(text)[1]
  return {
    template,
    style,
    script
  }
}

module.exports = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, fileData) => {
      if (err) reject(err)
      else {
        if (data) console.log(JSON.stringify(data))
        const ext = extract(fileData)
        const scr = eval(ext.script)
        resolve(ejs.render(ext.template, scr.data))
      }
    })
  })
}

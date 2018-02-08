/*
const header = document.getElementById('bu')
const shadow = header.attachShadow({mode: 'open'});
shadow.innerHTML = '<h1>test2</h1>';
style = document.createElement('style')
style.textContent = `h1{ color: red; }`
shadow.appendChild(style)
*/
const render = require('./render')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  render('./index.ejs')
    .then(web => {
      res.send(web)
    })
    .catch(error => {
      res.send(error)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

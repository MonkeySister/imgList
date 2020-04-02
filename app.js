
const express = require("express");
const fs = require('fs')
//为req增加一个请求对象body
const bodyParser = require('body-parser');

//2.配置
const app = express();
//配置bodyparser包
app.use(bodyParser.urlencoded({ extended: true }));
//配置静态资源
app.use("/public", express.static("./public"));
app.use("/node_modules", express.static("./node_modules"));
app.engine('html', require('express-art-template'));


app.get('/', (req, res, next) => {
  let imgList = fs.readdirSync('./public/img')
  imgList.sort((a, b) => {
    return Number(a.substring(5, a.length)) - Number(b.substring(5, b.length))
  })
  res.render('index.html', {
    imgFilesList: imgList
  })
})


app.post('/imgLists', (req, res, next) => {
  let imgList = fs.readdirSync('./public/img/' + req.body.url)
  imgList = imgList.filter(item => {
    return item.includes('jpg') || item.includes('png') || item.includes('jpeg')
  })
  res.send({
    data: imgList
  })
})

//4.监听端口
app.listen(12345, () => {
  console.log("run start at 12345....");
});
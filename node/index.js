var Crawler = require('crawler');
const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

var c = new Crawler({
  callback: function (error, res, done) {
    done().then((res) => {
      console.log(2);
    });
  },
});

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method == 'OPTIONS') res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

app.post('/get', async (req, res) => {
  console.log(req.body);
  // const params = req.body;
  // let resultString = '';
  // const queueList = params.source[0].value.split('\n').map((item, index) => {
  //   const restUrl = params.source.reduce((pre, cur, key) => {
  //     return (pre += `&${cur.keyParams}=${encodeURI(
  //       params.source[key].value.split('\n')[index]
  //     )}`);
  //   }, '');
  //   return {
  //     uri: `${params.url}?enc=utf-8${restUrl}`,
  //     callback: (error, res, done) => {
  //       var $ = res.$;
  //       let result = [];
  //       $('.s-category .J_valueList a').each((e, a) => {
  //         result.push(a.attribs.title);
  //         console.log(e, item, a.attribs.title);
  //       });
  //       resultString += `${[item]}:${result.toString()}\n\n`;
  //       // fs.writeFile('./data.md', data, { flag: 'a' }, () => {});
  //       done();
  //     },
  //   };
  // });
  // c.queue(queueList);
  fs.readFile('./data.md', (err, data) => {
    res.json(data);
  });
  // setTimeout(() => {
  // res.json(path.resolve(__dirname, './data.md'));
  // }, 30000);
});

app.listen(9000, () => {
  console.log('成功启动在9000端口');
});

const Crawler = require('crawler');
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
  res.header('Access-Control-Allow-Origin', 'http://test.zmllgg.icu');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method == 'OPTIONS') res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

app.post('/get', async (req, res) => {
  /** 获取参数 */
  const params = req.body;
  /** 保存结果 */
  let resultString = '';
  /** promise list */
  const queneList = params.source[0].value.split('\n').map((item, index) => {
    /** 拼接url后面的参数 */
    const restUrl = params.source.reduce((pre, cur, key) => {
      return (pre += `&${cur.keyParams}=${encodeURI(
        params.source[key].value.split('\n')[index]
      )}`);
    }, '');
    /** 返回一个promise对象 */
    return new Promise((resolve, reject) => {
      c.queue([
        {
          uri: `${params.url}?enc=utf-8${restUrl}`,
          callback: (error, res, done) => {
            var $ = res.$;
            let result = [];
            /** 需要获取内容的节点 最好能唯一标识它 */
            $(params.domElement).each((e, a) => {
              result.push(a.attribs.title);
            });
            /** 拼接结果 */
            resultString += `${[item]}:${result.toString()}\n\n`;
            resolve(resultString);
            done();
          },
        },
      ]);
    });
  });
  Promise.all(queneList).then(() => {
    res.json(resultString);
  });
});

app.listen(9022, () => {
  console.log('成功启动在9000端口');
});

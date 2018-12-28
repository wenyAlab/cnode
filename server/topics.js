const express = require('express');
const Router = express.Router();
const model = require('./db/model');
// const fetch = require('node-fetch');
const Topics = model.getModel('topics');


Router.get('/list', function(req, res) {
  // fetch('https://cnodejs.org/api/v1/topics?mdrender=false&page=5&limit=40')
  // .then(res => res.json())
  // .then(res => {
  //   if (res.success === true) {
  //     res.data.map((i) => {
  //       const { title, create_at, tag, author_id, content, last_reply_at, top, good, reply_count, visit_count, author } = i
  //       const topicsModel = new Topics({title, create_at, tag, author_id, content, last_reply_at, top, good,reply_count,visit_count, author})
  //       topicsModel.save(function(err, doc) {
  //         if (err) {
  //           return res.json({code: 1, data: '保存出错了'})
  //         }
  //         if (doc) {
  //           Topics.find({}, function(err, doc) {
  //             if (err) {
  //               return res.json({code: 1, data: '读取数据出错了'})
  //             }
  //             if (doc) {
  //               return res.json({code: 0, data: doc})
  //             }
  //           })
  //         }
  //       })
  //     })
  //   }
  // })
  Topics.find({}, function(err, doc) {
    if (err) {
      return res.json({code: 1, data: '读取数据出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

module.exports = Router;
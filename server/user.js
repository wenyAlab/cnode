const express = require('express');
const Router = express.Router();
const model = require('./db/model');
// const fetch = require('node-fetch');

// const Topics = model.getModel('topics')
const User = model.getModel('user')


Router.get('/info', function(req, res) {
  // Topics.find({}, function(err, doc) {
  //   if (doc) {
  //     doc.map(i => {
  //         console.log(i.author.loginname)
  //         // fetch(`https://cnodejs.org/api/v1/user/${i.author.loginname}`)
  //         // // /user/:loginname 
  //         // .then(res => res.json())
  //         // .then(res => {
  //         //   if (res.success === true) {
  //         //     console.log(res.data)
  //         //     // res.data.map((i) => {
  //         //       const { loginname, avatar_url, githubUsername, create_at, score, recent_topics, recent_replies } = res.data
  //         //       const userModel = new User({loginname, avatar_url, githubUsername, create_at, score, recent_topics, recent_replies})
  //         //       userModel.save(function(err, doc) {
  //         //         if (err) {
  //         //           return res.json({code: 1, data: '保存出错了'})
  //         //         }
  //         //         if (doc) {
  //         //           console.log('success')
  //         //           // User.find({}, function(err, doc) {
  //         //           //   if (err) {
  //         //           //     return res.json({code: 1, data: '读取数据出错了'})
  //         //           //   }
  //         //           //   if (doc) {
  //         //           //     return res.json({code: 0, data: doc})
  //         //           //   }
  //         //           // })
  //         //         }
  //         //       })
  //         //     // })
  //         //   }
  //         // })
  //     })
  //   }
    User.find({}, function(err, doc) {
      if (err) {
        return res.json({code: 1, data: '读取数据出错了'})
      }
      if (doc) {
        return res.json({code: 0, data: doc})
      }
    })
})

module.exports = Router;
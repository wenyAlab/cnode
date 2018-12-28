const mongoose = require('mongoose');
const db_url = 'mongodb://127.0.0.1:27017/cnode';

mongoose.connect(db_url);

const models = {
  user: {
    loginname: {type: String, require:true},
    avatar_url: {type: String, require:true},
    githubUsername: {type: String, require:true},
    create_at: {type: String, require:true},
    score: {type: String, require:true},
    recent_topics: {type: Array, require:true},
    recent_replies: {type: Array, require:true},
  },
  topics:{
    title: {type: String, require: true},
    author: {type: Object, require: true},
    create_at: {type: String, require: true},
    tag: {type: String, require: true},
    author_id: {type: String, require: true},
    content: {type: String, require: true},
    last_reply_at: {type: String, require: true},
    top: {type: Boolean, require: true},
    good: {type: Boolean, require: true},
    reply_count: {type: Number, require: true},
    visit_count: {type: Number, require: true},
  }
}

for( let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function( model ) {
    return mongoose.model(model);
  },
}
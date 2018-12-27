const mongoose = require('mongoose');
const db_url = 'mongoose://localhost:27017';

mongoose.connect(db_url);

const models = {
  userModel: {
    username: {type: String, require: true},
    avatar: {type: String, require:true},
  },
  topicsModel:{
    title: {type: String, require: true},
    author: {type: String, require: true},
    createTime: {type: String, require: true},
    tag: {type: String, require: true},
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
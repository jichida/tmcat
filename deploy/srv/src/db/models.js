let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;
let mongoosePaginate = require('mongoose-paginate');
const config = require('../config.js');
const moment = require('moment');

mongoose.Promise = global.Promise;
//系统设置
let UserSchema = new Schema({
  name:String,
  phone:String,
  avatar:String
});
UserSchema.plugin(mongoosePaginate);
let UserModel  = mongoose.model('user',  UserSchema);

exports.UserModel = UserModel;

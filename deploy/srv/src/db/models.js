const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const config = require('../config.js');
const moment = require('moment');

mongoose.Promise = global.Promise;
//用户
const UserSchema = new Schema({
  name:String,
  phone:String,
  avatar:String
});
UserSchema.plugin(mongoosePaginate);
const UserModel  = mongoose.model('user',  UserSchema);

//职位对照
const GameDescSchema = new Schema({
  pid:Number,
  title:String,
  desc:String
});
GameDescSchema.plugin(mongoosePaginate);
const GameDescModel  = mongoose.model('gamedesc',  GameDescSchema);

//结果显示记录
const ResultSchema = new Schema({
  phone:Number,
  name:String,
  avatar:String,
  title:String,
  desc:String,
  createtime:String
});
ResultSchema.plugin(mongoosePaginate);
const ResultModel  = mongoose.model('result',  ResultSchema);


exports.ResultModel = ResultModel;
exports.UserModel = UserModel;
exports.GameDescModel = GameDescModel;

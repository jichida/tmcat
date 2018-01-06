const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const config = require('../config.js');
const moment = require('moment');

mongoose.Promise = global.Promise;
//用户
let UserSchema = new Schema({
  name:String,
  phone:String,
  avatar:String
});
UserSchema.plugin(mongoosePaginate);
const UserModel  = mongoose.model('user',  UserSchema);

//职位对照
let GameDescSchema = new Schema({
  pid:Number,
  title:String,
  desc:String
});
GameDescSchema.plugin(mongoosePaginate);
const GameDescModel  = mongoose.model('gamedesc',  GameDescSchema);


exports.UserModel = UserModel;
exports.GameDescModel = GameDescModel;

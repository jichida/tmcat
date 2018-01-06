const DBModels = require('../db/models');
const _ = require('lodash');
const csvwriter = require('csvwriter');
const config = require('../config.js');

const downloadexcel = (req,res)=>{
  const userModel = DBModels.UserModel;
  const fields = 'name phone avatar';
  const query = {};

  // const sz = fields.split(' ');
  const csvfields = '姓名,手机号,头像地址';// sz.join(',');
  console.log(`csvfields-->${csvfields}`);

  const filename = 'db-userdata-' + new Date().getTime() + '.csv';
  res.set({'Content-Disposition': 'attachment; filename=\"' + filename + '\"', 'Content-type': 'text/csv'});
  res.write(csvfields + '\n');

  let cancelRequest = false;
  req.on('close', (err)=>{
     cancelRequest = true;
  });

  const cursor = userModel.find(query,fields).cursor();
  cursor.on('error', (err)=> {
    // res.write('Error:' + err);
    // throw new Error(err);
    console.log(`算结束了啊..............`);
    res.end('');
  });

  cursor.on('data', (doc)=>
  {
    if(cancelRequest){
      cursor.close();
      console.log(`取消下载了..............`);
    }
    else{
      doc = JSON.parse(JSON.stringify(doc));
      const newdoc = {
        '姓名':doc.name,
        '手机号':doc.phone,
        '头像地址':`${config.rooturl}${doc.avatar}`
      };
      csvwriter(newdoc, {header: false, fields: csvfields}, (err, csv)=> {
        // console.log(`csv-->${csv}`);
         if (!err && !!csv && !cancelRequest) {
           res.write(csv);
         }
      });
    }
  }).
  on('end', ()=> {
    setTimeout(()=> {
      res.end('');
    }, 1000);
  });
}


module.exports= downloadexcel;

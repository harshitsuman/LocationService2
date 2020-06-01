const {TableQuery } = require('azure-storage');
const cacheConnection = require('../db/storageConnection');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const server  = http.createServer(app);
const io = socketIO(server);
var users = {};

io.on('connect',async function (socket){

    /**
     * connected new Device or existing device
     */

    socket.on('user',function (data){
      console.log(data.deviceSerialNumber)
      for(var i = 0; i<data.deviceSerialNumber.length; ++i){
        if(!users[data.deviceSerialNumber[i]])
        users[data.deviceSerialNumber[i]] = [this.id];
        else
        users[data.deviceSerialNumber[i]].push(this.id);
        console.log(`User connected !! socketId : ${this.id}, deviceSerialNumber : ${data.deviceSerialNumber[i]} `);
      }
    });

    /**
     * Disconnected who has loged out
     */

    socket.on('disconnect',function (data){
       
        var index = null ;
        for(var i in users){
           if((index=users[i].findIndex(data => data == this.id)) != -1){
            console.log(`User disconnected !! socketId : ${this.id}, deviceSerialNumber : ${Object.keys(users)}`);
            if(users[i].length != 1) 
            users[i].splice(index,1);
            else
            delete users[i];
            break;
            }
        }
     });
        
     /**
      * Sending DeviceData (DeviceSerialNumber, Latitude, Longitude, Speed) to UI
      * 
      * Based on the request 
      */
     
     var userArray = [] , str = '';
     await setInterval(async () => {
      userArray=Object.keys(users); 
      if(userArray.length){
      userArray.map((val,index) => {
      if(index==0) str = `query.where("DeviceSerialNumber == '${val}'")` 
      else str += `.or("DeviceSerialNumber == '${val}'")`
      });
      var query = new TableQuery().select(['DeviceSerialNumber', 'Latitude','Longitude','Speed','RecordedTime','SatelliteTime','ServerTime','Timestamp']);
      await cacheConnection.queryEntities('gps_data',
      await eval(str) , null,async (err,{entries=[]}) => { 

      if(entries.length != 0){ 
            await entries.map(async item => {
                  if(err) throw err;
                  const { DeviceSerialNumber:{_:deviceSerialNumber} , Latitude:{_:latitude}, Longitude:{_:longitude}, Speed:{_:speed} } = item;
                  await users[deviceSerialNumber].map(async socketid => {
                      await io.sockets.to(socketid).emit('chat',{ deviceSerialNumber , latitude , longitude, speed});
                   });
              });
            }
          });
         }
        },8000);
    });


module.exports = server;
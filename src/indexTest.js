// const {TableQuery} = require('azure-storage');

// const conn = require('./config/storageConnection');

// var device = "864495034011334";

// var query = new TableQuery().select('DeviceSerialNumber', 'Latitude', 'Longitude', 'Speed', 'ServerTime')

// var t = async function(){ await conn.queryEntities('gps_data', query.where('DeviceSerialNumber eq ?', device), null, async(err,data) => {
//     if(!err) {
//         const JsonData = JSON.stringify(data,'', 2);
//         console.log(JsonData); //2nd
//         console.log('Hello'); //3rd
//     }
//     return 'JsonData'; //1st
// })};

// t()
// .then(async function (result) { await console.log('Device Details: ',result)}); //1st
// var device = {deviceSerialNumber : ['864495034011417', '864495034011418','864495034011416','864495034011233' ]};

// =========================================================================================
// const {TableQuery} = require('azure-storage');

// const conn = require('./db/storageConnection');

// var device = "864495034011334";

// var query = new TableQuery().select('DeviceSerialNumber', 'Latitude', 'Longitude', 'Speed', 'ServerTime')

// var t = async function(){ await conn.queryEntities('gps_data', query, null, async(err,data) => {
//     if(!err) {
//         const JsonData = JSON.stringify(data,'', 2);
//         console.log(JsonData); //2nd
//         console.log('Hello'); //3rd
//     }
//     return 'JsonData'; //1st
// })};

// t()
// .then(async function (result) { await console.log('Device Details: ',result)}); //1st
// =============================================================================================

// function user(){
//     console.log('I am from user...')
// }

// function getData(val){
//     val();
// }
// console.log(Math.max());
// getData(user);

// ====================================================================================
// const {TableQuery} = require('azure-storage');

// const conn = require('./db/storageConnection');

// var device = [864495034011866,864495034011877,864495034011334,864495034011221];
// var device = '864495034011866';
// var query = new TableQuery().select('DeviceSerialNumber', 'Latitude', 'Longitude', 'Speed', 'ServerTime').where(`DeviceSerialNumber eq ?`, device);

// var t = async function(){ await conn.queryEntities('gps_data', query , null, async(err,data) => {
//     if(!err) {
//         const JsonData = JSON.stringify(data,'', 2);
//         console.log(JsonData); 
//     }
// })};

// t()
// ================================================================================

// var getUser = (id, callback) => {
//     var user = {
//         id : id,
//         name : 'Harshit'
//     };
//     callback(user);
// }

// getUser(21, userObject=> console.log(userObject))


// function getUser(callback) {
//     callback();
//     console.log('getUser');
// }

// getUser(() => {
//     console.log('user data');
// });

let a = function()  { return arguments};
console.log(a('hi'));
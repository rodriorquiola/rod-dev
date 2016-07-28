var express = require('express');
var router = express.Router();
var rq=require('request');
var querystring=require('querystring');
var Cookies=require('cookies');
/* GET users listing. */
var request=require('request');
var ses=null;
var allSes=null;
router.get('/login', function(req, res, next) {

var sessionJD=null;
var formData={
 "email":"admin",
"password":"istrador"
};

  request({
    headers:{
   "Content-Type":"application/x-www-urlencoded",
  },
  method:"POST",
  //host:"52.42.220.194:5082",
  uri:"http://52.42.222.59:8082/api/session",
  form:formData
},function(error, response, body)
{
  var cookies = response.headers["set-cookie"];
  console.log(cookies);
  var arrayCookie=cookies[0].split(";");  
ses=arrayCookie[0];
allSes=cookies;
 res.json({"cookie":ses});
});

 
});


router.get("/positions",function(req,res)
{

//Cookie:JSESSIONID=ffyneiefc5fzmz05gw71o5hs
console.log(ses);
 request({
  "headers":{
    "Cookie":allSes != null?allSes[0]:null
 
  },
 uri:"http://52.42.255.179:8082/api/positions"

},function(error,response,body){
 res.statusCode=response.statusCode.toString(); 
 res.json(response);
}
);
});

//RODRIGO

router.get("/devices",function(req,res)
{
//Cookie:JSESSIONID=ffyneiefc5fzmz05gw71o5hs
console.log(ses);
 request({
  "headers":{
    "Cookie":allSes != null?allSes[0]:null
 
  },
 uri:"http://52.42.255.179:8082/api/devices?_dc=1469673668161&page=1&start=0&limit=25"
 
},function(error,response,body)
{
 res.statusCode=response.statusCode.toString(); 
 res.json(response);
}
);
});

router.get("/serverSettings",function(req,res)
{
//Cookie:JSESSIONID=ffyneiefc5fzmz05gw71o5hs
console.log(ses);
 request({
  "headers":{
    "Cookie":allSes != null?allSes[0]:null
 
  },
 uri:"http://52.42.255.179:8082/api/server?_dc=1469673651304"
 
},function(error,response,body)
{
 res.statusCode=response.statusCode.toString(); 
 res.json(response);
}
);
});

module.exports = router;


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(express.static('public'));

var item = [];
var workItem = [];

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req , res){

  let day = date.getDate();
  res.render("list" , {listTitle : day , newListItem : item});
});

app.get("/work" , function(req,res){
  res.render("list", {listTitle : "work" , newListItem : workItem})
})

app.post("/" , function(req ,res){
  
  if(req.body.list === "work")
  {
    workItem.push(req.body.newItem);
    res.redirect("/work")
  }
  
  item.push(req.body.newItem);
  res.redirect("/");
})

app.listen(3000 , function(){
  console.log("Server is up and running!");
});

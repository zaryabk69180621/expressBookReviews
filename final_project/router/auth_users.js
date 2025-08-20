const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
return users.find((user)=>{return user.username===username})?true:false;


}

const authenticatedUser = (username,password)=>{ //returns boolean

let user=users.find((user)=>{return user.username===username});
if(user){
return user['password']===password;

} 


}

//only registered users can login
regd_users.post("/login", (req,res) => {
//Write your code here
if(isValid(req.body.username)&&authenticatedUser(req.body.username,req.body.password)){
let token= jwt.sign({username:req.body.username},"mysec",{expiresIn:"3d"});
req.session.token=token;
res.send(token);
}else{
res.status(400);
res.send("error creating")
}
}
);
// Add a book review
regd_users.put("/review/:isbn",function(req,res){

let isbn= req.params.isbn;
//asumption index is the sibn
let temp={...books[isbn]};
let l=Object.keys(temp).length;
let index=l>0?l-1:0;
temp['reviews'][index]=req.body;
books.splice(isbn,1,temp);
res.send(temp);
})

regd_users.delete("/review/:isbn",function(req,res){

let isbn= req.params.isbn;
//asumption index is the sibn
let temp={...books[isbn]};
temp['reviews']={};
books.splice(isbn,1,temp);
res.send(temp);
}) 
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

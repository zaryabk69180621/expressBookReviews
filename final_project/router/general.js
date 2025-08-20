const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {

let user=req.body;
if(users.findIndex((e)=>{return e.username==user.username})!=-1){
res.status(400);
res.send("user already registered");

}else{

users.push(user);
res.status(200);
res.send("user registered successfully");
}



});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
if(books.length>0){
res.json(books);

}else{
res.status(500);
res.send("error sending the books")
}
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
console.log("here")
let {isbn}= req.params;
if(isbn>=0&&isbn<books.length){

let b= books[isbn];
res.status(200);
res.send(b);
}else{

res.status(400);
res.send("error cpouldnt find the desired book");
}

});
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

let {author}=req.params;

author= author.split("-").join(" ");
let b= books.find((book)=>book['author']==author);
if(b){

res.status(200);
res.send(b);
}else{

res.status(400);
res.send("error cpouldnt find the desired book");
}

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
let {title}=req.params;
title= title.split("-").join(" ");
let b= books.find((book)=>book['title']==title);
if(b){

res.status(200);
res.send(b);
}else{

res.status(400);
res.send("error cpouldnt find the desired book");
}
});

// Get book review
public_users.post("/review/:isbn",function(req,res){

let isbn= req.params.isbn;
//asumption index is the sibn
let temp={...books[isbn]};
let l=Object.keys(temp).length;
let index=l>0?l-1:0;
temp['reviews'][index]=req.body;
books.splice(isbn,1,temp);
res.send(temp);






})

public_users.delete("/review/:isbn",function(req,res){

let isbn= req.params.isbn;
//asumption index is the sibn
let temp={...books[isbn]};
temp['reviews']={};
books.splice(isbn,1,temp);
res.send(temp);






})

public_users.get('/review/:isbn',function (req, res) {
let {isbn}=req.params;


if(isbn>=0&&isbn<books.length){

res.status(200);
console.log("inhere",books[isbn])

res.send(books[isbn]['reviews']);
}else{
res.status(500);
res.send("error couldnt find the desired review");

}

});

module.exports.general = public_users;

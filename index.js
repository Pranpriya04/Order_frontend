require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const { render } = require('ejs');

const port = process.env.PORT || 5500;
const base_url = process.env.BASE_URL;

app.set("views",path.join(__dirname,"/public/views"));
app.set("view engine","ejs");
app.use(bodyParser.json());  //bodyParser use form data
app.use(bodyParser.urlencoded({extended:false})) // ไม่ให้เข้ารหัส


app.use(express.static(__dirname+"/public"));

app.get("/",async(req,res)=>{  //เช็คจาก / ใน web
    const response = await axios.get(base_url+"/products"); //url / backend
    res.render("home",{
        product: response.data, //product: ตั้งอะไรก็ได้
    });
});

app.get("/Category",async(req,res)=>{
    const response = await axios.get(base_url+"/categorys");
    res.render("Category",{
        category: response.data, //product: ตั้งอะไรก็ได้
    });
})

app.get("/Statuses",async(req,res)=>{
    const response = await axios.get(base_url+"/statuses");
    res.render("Status",{
        status: response.data, 
    });
})

app.get("/createCategory",async(req,res)=>{
    res.render("createCategory");
})

app.get("/editCategory/:category_id",async(req,res)=>{
    const response = await axios.get(base_url+"/categorys/"+req.params.category_id);
    console.log(response.data);
    res.render("editCategory",{
        category: response.data,
    });
})


app.post("/editCategory/:category_id",async(req,res)=>{
    const response = await axios.put(base_url+"/categorys/"+req.params.category_id,req.body);
    console.log(response.data);
    res.redirect("/Category");
})

app.post("/createCategory",async(req,res)=>{
    const response = await axios.post(base_url+"/categorys",req.body);
    if (response.data.status == true) {
        res.redirect("/Category")
    }else{
        res.redirect("/createCategory")
    }
})

app.get("/delCategory/:category_id",async(req,res)=>{
    const response = await axios.delete(base_url+"/categorys?category_id="+req.params.category_id);
    res.redirect("/Category");
})

app.listen(port,()=>{
    console.log(`Frontend run port ${port}`);
})
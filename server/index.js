const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
    host     :   process.env.DATABASE_HOST,
    user     :   process.env.DATABASE_USERNAME,
    password :   process.env.MYSQL_ROOT_PASSWORD,
    database :   process.env.MYSQL_DATABASE
})

app.get('/getMenu/All', (req, res) => {
    db.query("SELECT * FROM menu", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.get('/getMenu/Hot', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 1", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});
app.get('/getMenu/Iced', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 2", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});
app.get('/getMenu/Frappe', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 3", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
    
});

app.post('/getMenu/Search', (req, res) => {
    console.log(req.body.search);
    let data = req.body.search
    db.query(`SELECT * FROM menu WHERE menu_name LIKE '%${data}%'`, (err, result) => {
        if(err){    
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
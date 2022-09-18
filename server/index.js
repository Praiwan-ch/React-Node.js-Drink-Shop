const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "27.254.62.115",
    user: "cn_asm_php",
    password: "Fpr7P6R85sf6csiL#",
    database: "cn_asm_php"
})

app.get('/v_asset', (req, res) => {
    db.query("SELECT * FROM asset", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen('3001', () => {
    console.log('Server is running');
})
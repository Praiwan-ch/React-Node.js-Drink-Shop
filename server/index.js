const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host     :   process.env.DATABASE_HOST,
    user     :   process.env.DATABASE_USERNAME,
    password :   process.env.MYSQL_ROOT_PASSWORD,
    database :   process.env.MYSQL_DATABASE
})

app.get('/getMenu', (req, res) => {
    db.query("SELECT * FROM menu", (err, result) => {
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
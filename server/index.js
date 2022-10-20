const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const multer  = require('multer')
const path = require('path');

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

let auth  = '' 

// Status Check
app.get('/status', (req, res)=>{
    res.status(400)
})

// Login
app.post('/login', (req, res)=>{
    db.query(`SELECT * FROM user WHERE usr_username = '${req.body.username}' AND usr_password = '${req.body.password}'`, (err, result) => {
        if(err || !result.length){
            res.send(false)
        }else{
            auth = result[0].usr_firstname + " " + result[0].usr_lastname
            res.send(true)
        }
    });
})

// Authorization
app.get('/auth', (req, res)=>{
    if(auth !== ''){
        res.send(auth)
    }else{
        res.send(false)
    }
})

// Logout
app.get('/logout', (req, res)=>{
    auth = ''
    if(auth === ''){
        res.send(true)
    }else{
        res.send(false)
    }
})

// Get all menu
app.get('/getMenu/All', (req, res) => {
    db.query("SELECT * FROM menu JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id ORDER BY menu_id", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Get all menu type
app.get('/getType', (req, res) => {
    db.query("SELECT * FROM menu_type ORDER BY menu_type_id", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Get menu hot
app.get('/getMenu/Hot', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 1", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Get menu iced
app.get('/getMenu/Iced', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 2", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Get menu frappe
app.get('/getMenu/Frappe', (req, res) => {
    db.query("SELECT * FROM menu WHERE menu_type_id = 3", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Get menu by search
app.post('/getMenu/Search', (req, res) => {
    let data = req.body.search
    db.query(`SELECT * FROM menu JOIN menu_type ON menu.menu_type_id = menu_type.menu_type_id WHERE menu_name LIKE '%${data}%' OR menu_type_name LIKE '%${data}%' ORDER BY menu_id`, 
        (err, result) => {
            if(err){    
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

// Upload file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './../views/public/image/');
    },
  
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage })

// Update file in database
app.post('/upload', upload.single('file'),(req, res) => {
	const { filename: image } = req.file;
    db.query(`UPDATE menu SET menu_image = '${req.file.filename}' WHERE menu_id = LAST_INSERT_ID();`, 
        (err, result) => {
            if(err){    
                console.log(err);
                res.send(false)
            }else{
                res.send(true);
            }
        }
    );
});

// Add menu
app.put('/addMenu', (req, res) => {
    const menu_name  =  req.body.menu_name
    const menu_price =  req.body.menu_price
    const menu_type  =  req.body.menu_type_id
    const menu_image =  '-'
    db.query(`INSERT INTO menu (menu_name, menu_price, menu_type_id, menu_image) VALUES (?,?,?,?)`, 
        [menu_name, parseFloat(menu_price), parseInt(menu_type), menu_image],
        (err, result) => {
            if(err){    
                console.log(err);
                res.send(false)
            }else{
                res.send(true);
            }
        }
    );
});

var current_id = ''

// Update Menu
app.post('/updateMenu', (req, res) => {
    current_id = req.body.menu_id 
    const menu_id    =  req.body.menu_id 
    const menu_name  =  req.body.menu_name
    const menu_price =  req.body.menu_price
    const menu_type  =  req.body.menu_type_id
    db.query(`UPDATE menu SET menu_name = '${menu_name}', menu_price = '${menu_price}' , menu_type_id = '${menu_type}' WHERE menu_id = '${menu_id}'`,
        (err, result) => {
            if(err){    
                console.log(err);
                res.send(false)
            }else{
                res.send(true);
            }
        }
    );
});

// Delete menu
app.post('/deleteMenu',(req,res) =>{
    const menu_id = req.body.menu_id
    db.query(`DELETE FROM menu WHERE menu_id = '${menu_id}'`, (err, result) => {
        if(err){    
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// Update image
app.post('/updateImage', upload.single('file'),(req, res) => {
    const { filename: image } = req.file;
    db.query(`UPDATE menu SET menu_image = '${req.file.filename}' WHERE menu_id = '${current_id}';`, 
        (err, result) => {
            if(err){    
                console.log(err);
                res.send(false)
            }else{
                res.send(true);
            }
        }
    )
});

app.post('/addReceipt', (req, res)=>{
    db.query(`INSERT INTO receipt SET rcp_date = current_timestamp()`)
    db.query('SELECT rcp_id FROM receipt WHERE rcp_id = (SELECT MAX(rcp_id) FROM receipt)', (err, result) => {
        if(!err){
            for(let i=0; i<req.body.length; i++)
            db.query(`INSERT INTO receipt_detail VALUE ('${result[0].rcp_id}', '${req.body[i].menu_id}', '${req.body[i].menu_amount}', '${req.body[i].menu_amount * req.body[i].menu_price}')`)
            res.send(true)
        }else{
            res.send(false)
        }
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
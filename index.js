require('./models/db');
const express = require('express');
const cors = require('cors');
const verify = require('./routes/verifyToken');
const path = require('path');

const port = process.env.PORT || 8080;

var app = express();

// Routes
const authRoute = require('./routes/user');
const inventoryRoute = require('./routes/inventory');

// Middleware
app.use(express.json());
app.use(cors());
//app.use(express.static(path.join(__dirname,'/angular')));
app.use('/api/user',authRoute);
app.use('/api/inventory',verify,inventoryRoute);

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'angular/angular/index.html'));
// });

app.listen(port,()=>{
    console.log(`Server has started at port : ${port}`);
});

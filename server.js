'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
const multer = require("multer");
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"), (req, res)=>{
    const file = req.file;
    if(!file) res.send("Please upload a valid file");
    else res.send({"name":file.originalname, "type":file.type, "size":file.size})
})

app.get('/hello', function(req, res){
    res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Node.js listening ...');
});

const express = require("express")
const cors = require('cors')
const nodemailer = require('nodemailer')
const path = require('path')
const db = require('./db')
const sequelize = require("sequelize")

// init express server and router
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())


const router = express.Router()
router.get('/booking', function (req, res, next) {
   //method get data booking from database
});

router.post('/register', function (req, res, next) {
    if(req.body.username == "" || req.body.email == "" || req.body.password == "" ){
        res.status(400).json({
            message: "EMPTY FIELD"
        })
        return
    }

    db.user.create({
        id_user: req.body.id_user
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

    })
    .then(function(data){
        db.user.create({
            id_user: data.id
        }).then(function(){
            res.status(201).json({
                message: "user berhasil terdaftar"
            })
        })
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({
            message: err
        })
    })
});

router.post('/login', function (req, res, next) {
    if(req.body.username == "" || req.body.password == ""){
        res.status(400).json({
            message: "EMPTY FIELD"
        })
        return
    }

    db.user.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(function(data){
        res.status(200).json({
            message: "success login",
            data: data
        })
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({
            message: err
        })
    })
});

router.post('/booking', function (req, res, next) {
    db.booking.findOne({
        where: {
            Username: req.body.Username
        }
    })
    .then(function(data){
        db.booking.findOne({
            where: {
                name: req.body.name,
                number_phone: req.body.number_phone,
                email: req.body.email
                service: req.body.service
            }
        })
            }).then(function(){
                 res.status(200).json({
                   message: "You Have Made a Booking :)"
             })
            })
            .catch(function(err){
                console.log(err)
                res.status(500).json({
                    message: err
                })
            })
        });

router.get('/booking', function (req, res, next) {
    res.redirect('https://nodejs-production-176d.up.railway.app/static/booking.html')
});

// http router
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use("/", router);

const port = 3000
app.listen(port, function () {
    db.conn.authenticate()
        .then(function () {
            console.log("Database terhubung")
        })
        .catch(function (err) {
            console.log("Database gagal terhubung karena:", err)
        })
    console.log("server start on", port)
})
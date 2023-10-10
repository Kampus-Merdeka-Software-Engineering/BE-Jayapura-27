const express = require("express")
const cors = require('cors')
const path = require('path')
const db = require('./db')
const sequelize = require("sequelize")
const bodyParser = require('body-parser')
const ejs = require('ejs')

// init express server and router
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors())


const router = express.Router()
router.get('/', function (req, res, next) {
    res.redirect('https://kampus-merdeka-software-engineering.github.io/FE-Jayapura-27/index.html')
});

// Membuat route POST untuk sign up
router.post('/registrasi', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      // Cari pengguna dengan username yang sama
      const existingUser = await db.user.findOne({
        where: {
          username: username,
        },
      });
      // Jika pengguna sudah ada
      if (existingUser) {
        return res.status(409).json({ message: 'Username sudah digunakan' });
      }
      // Buat pengguna baru
      const newUser = await db.user.create({
        username: username,
        email: email,
        password: password,
      });
      res.status(201).json({ message: 'Pendaftaran berhasil', user: newUser });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat pendaftaran' });
    }
});

 // Membuat route POST untuk login
 router.post('/login', function (req, res, next) {
  if (req.body.username == "" || req.body.password == ""){
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


    router.post('/booking', async (req, res) => {
        const { nama, noHP, email, service } = req.body;

          try {
            // Simpan data booking ke dalam database
            const newbooking = await db.booking.create({
              nama,
              noHP,
              email,
              service,
            });
        res.status(201).json({ message: 'Booking berhasil.' });
          } catch (error) {
            console.error('Terjadi kesalahan saat melakukan booking:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat melakukan booking.' });
          }
        });

    
// Membuat router get booking
router.post('/riwayat', async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    console.log(email)
  
    try {
        const bookings = await db.booking.findAll({
          where: { email }
        });
      
        res.status(200).json({
          message: "riwayat booking terlihat",
          data: bookings
        });
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data booking:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data booking.' });
      }
  });
// router.get('/booking', function (req, res, next) {
//     res.redirect('http://localhost:4500/static/riwayat_booking.html')
// });

// http router
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use("/", router);

const port = 4500
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

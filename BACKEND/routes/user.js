const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
var auth = require('../services/authentication');
var checkRoles = require('../services/checkRoles');


router.post('/singup', (req, res) => {
    let user = req.body;
    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email], (err, results) => {

        if (!err) {
            if (results.length <= 0) {
                query = "insert into user (name,contactnumber,email,password,status,role) values (?,?,?,?,'false','user') ";
                connection.query(query, [user.name, user.contactnumber, user.email, user.password, user.status, user.role], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "successfuly Registred" });
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({ message: "Amaily already exist" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email,password,role,status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "incorect username" });
            } else if (results[0].status === 'false') {
                return res.status(401), json({ message: "wait for admin approval" });
            } else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accesstoken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8H' })
                res.status(200).json({ token: accesstoken });
            } else {
                return res.status(400).json({ message: "something went wrongm please try later" })
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/forgotepassword', (req, res) => {
    let user = req.body;
    query = "select email,password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({ message: "password sent successfuly in your email" });
            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Passsword by cafe management System',
                    html: '<p><b> your login details for cafe management</b><br><b>Email: </b>' + results[0].email + '<br><b>Password:</b>' + results[0].password + '<br><a href="http://localhost:4200/">Clique here to login</a></p>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent' + info.response);
                    }
                });
                return res.status(200).json({ message: "password sent successfuly in your email" });
            }
        }
    })
})

router.get('/get', auth.authenticateToken, checkRoles.checkRoles, (req, res) => {
    var query = "select id,name,email,contactnumber,status from user where role='user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRoles.checkRoles, (req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user does not exist" });
            }
            return res.status(200).json({ message: "user update succesfuly" });
        } else {
            return res.status(500).json(err);
        }

    })
})

router.get('/checktoken', auth.authenticateToken, (req, res) => {
    return res.status(200).json({ message: 'true' });
})

router.post('/changepasssword', auth.authenticateToken, (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    console.log(email);
    var query = "select * from user where email=? and password=?";
    connection.query(query, [email, user.oldpassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "incorecte old password" });
            } else if (results[0].password == user.oldpassword) {
                query = "update user set password=? where email=?";
                connection.query(query, [user.newpassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "password updat succesfuly" });
                    } else {
                        return res.status(500).json(err);
                    }
                })
            } else {
                return res.status(400).json({ message: "sommething went wrong.please try later" });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})



module.exports = router;
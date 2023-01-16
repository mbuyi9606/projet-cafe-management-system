const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

router.get('/generatereort', auth.authenticateToken, (req, res, next) => {
    const generateuuid = uuid.v2();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    query = "insert into bill(name,uuid,email,contactnumber,paymentmethod,total,productDetails,createdBy) values (?,?,?,?,?,?,?,?)";
    connection.query(query, [orderDetails.name, generateuuid, orderDetails.email, orderDetails.contactnumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), { productDetails, productDetailsReport, name: orderDetails.name, email: orderDetails.email, contactnumber: orderDetails.contactnumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount }, (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    pdf.create(data).toFile('/generate_pdf/' + generateuuid + ".pdf", function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.json(err);
                        } else {
                            return res.status(200).json({ uuid: generateuuid });
                        }
                    })
                }
            })
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/getpdf', auth.authenticateToken, function (req, res) {
    const orderDetails = req.body;
    const pdfpath = '/generate_pdf/' + orderDetails.uuid + '.pdf';
    if (fs.existssyc(pdfpath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfpath).pipe(res);
    } else {
        var productDetailsReport = JSON.parse(orderDetails.productDetails);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), { productDetails, productDetailsReport, name: orderDetails.name, email: orderDetails.email, contactnumber: orderDetails.contactnumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount }, (err, results) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                pdf.create(data).toFile('/generate_pdf/' + orderDetails.uuid + ".pdf", function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    } else {
                        res.contentType("application/pdf");
                        fs.createReadStream(pdfpath).pipe(res);
                    }
                })
            }
        })
    }
})

router.get('/getbills', auth.authenticateToken, (req, res, next) => {
    var query = "select * from bill order by id DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from bill where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "bill does not exist" });
            }
            return res.status(200).json({ message: "bill deleted succesfuly" });
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRoles = require('../services/checkRoles');

router.post('/add', auth.authenticateToken, checkRoles.checkRoles, (req, res, next) => {
    let product = req.body;
    var query = "insert into product(name,categoryid,description,price,status) values (?,?,?,?,'true')";
    connection.query(query, [product.name, product.categoryid, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "product added successfuly" });
        } else {
            return res.status(500).json(err)
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select p.id,p.description,p.price,p.status,c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getByCategory/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name from product where categoryId=? and status ='true'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getbyId/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name,decription,price from product where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRoles.checkRoles, (req, res, next) => {
    let product = req.body;
    var query = "update product set name=?, categoryId=?,description=?, price=? where id=?";
    connection.query(query, [product.name, product.categoryid, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "product does not found" });
            }
            return res.status(200).json({ messsage: "product update succesfuly" });
        } else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authenticateToken, checkRoles.checkRoles, (req, res, next) => {
    const product = req.params.id;
    var query = "delete from product where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "product does not exist" });
            }
            return res.status(200).json({ message: "product successfuly deleted" });
        } else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updatestatus', auth.authenticateToken, checkRoles.checkRoles, (req, res, next) => {
    let user = req.body;
    var query = "update product set status=? where id=?";
    connection.query(query, [product.status, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "product does not exist" });
            }
            return res.status(200).json({ message: "product pdate successfuly" });
        } else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;
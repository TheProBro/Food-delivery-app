const express = require("express");
const router = express.Router();
const User = require("../models/User");
const  {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post("/createuser", [body('email').isEmail(), body('pass').isLength({min: 5})],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(req.body.pass, salt))
            .then(hash => {
                User.create({
                    name: req.body.name,
                    pass: hash,
                    email: req.body.email,
                    location: req.body.location,
                })
                res.json({ message: "User Created" });
            })
            .catch(err =>{
                console.log(err)
                res.json({ message: "User not Created" });
            })
});


router.post("/loginuser",(req, res) => {
    User.findOne({
        email: req.body.email
        // pass: req.body.pass,
    })
    .then((user) => {
        if(user){
            bcrypt.compare(req.body.pass, user.pass)
            .then((bool)=>{
                if(bool){
                    const data={
                        user:{
                            id: user.id
                        }
                    }
                    const jwtSecret="abcdefghijklmnopqrstuvwxyz"
                    const authToken=jwt.sign(data, jwtSecret)
                    res.json({ message: "User Logged In" , authToken: authToken, email: user.email, location: user.location});

                }
                else{
                    res.json({ message: "Icorrect Password" });
                }
            })
            .catch(err => console.log("error: ",err))
        }
        else{
            res.json({ message: "User not found" });
        }
    })
    .catch(err => console.log("error: ",err))
});
// router.use()
module.exports = router;
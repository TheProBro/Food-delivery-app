const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderdata", (req, res) => {
    const {email, location, data} = req.body;
    Order.create({
        email: email,
        location: location,
        data: data
    })
    .then((order) => {
        res.status(200).json({"Order Placed": order});
    })
    .catch(err => console.log("error: ",err))
});

module.exports = router;
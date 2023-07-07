const express = require("express");
const router = express.Router();

router.post("/displaydata", (req, res) => {
    res.send([global.food_items, global.food_categories])
});

module.exports = router;
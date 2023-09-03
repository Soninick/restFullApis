const express = require(express);
const router =new express.Router();


// 2: define a router
router.get("/home", (req, res) => {
    res.send("hey this is routher")
})
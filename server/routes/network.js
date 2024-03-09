const router = require('express').Router();

// Creating Network With admin user
router.get("/network", (req, res) => {
    res.send("Network page");
});

// Creating Channel
router.get("/channel", (req, res) => {
    res.send("Channel page");
});

// Creating Organization
router.get("/organization", (req, res) => {
    res.send("Organization page");
});

// Joining Organization to Channel
router.get("/join", (req, res) => {
    res.send("Join page");
});

// Creating Organization's Users
router.get("/create-users", (req, res) => {
    res.send("create-users page");
});

// Deploying Chaincode
router.get("/deploy", (req, res) => {
    res.send("deploy page");
});

// Invoking Chaincode
router.get("/invoke", (req, res) => {
    res.send("invoke page");
});





module.exports = router;

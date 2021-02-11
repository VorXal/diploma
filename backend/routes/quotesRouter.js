const router = require('express').Router();
let Controller = require('../models/API/controllerAPI');

router.route('/').get((req, res) => {
    res.send('Welcome to main quotes page');
});

router.route('/crypto').get(async function(req, res) {
    res.json(await Controller.getAllCoinsInfo());
});

router.route('/crypto').post(async function(req, res){
    res.json(await Controller.getCoinInfo(req.body.id));
})

router.route('/currency').get(async function(req, res){
    res.json(await Controller.getAllRatesToUSD());
});

router.route('/stock').get((req, res) => {
    res.json(Controller.getTickerList());
});

router.route('/stock').post(async function(req, res){
    let tickersString = "";
    let length = Object.keys(req.body).length > 10 ? 10: Object.keys(req.body).length;
    for(let i = 0; i < length; i++){
        tickersString += req.body[Object.keys(req.body)[i]] + ",";
    }
    tickersString = tickersString.slice(0,-1);
    
    res.json(await Controller.getPriceOfStocks(tickersString));
})
module.exports = router;
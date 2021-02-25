const router = require('express').Router();
let Calculator = require('../models/calculatorFinance');

router.route('/').get((req, res) => {
    res.send('Welcome to main materials page');
});

router.route('/instruments').get((req, res) => {
    res.send('Main page of instruments. On this page would be a list of calculators')
});

router.route('/instruments/PV').post((req, res) => {
    console.log(req.body);
    let rate = req.body.rate;
    let FV = req.body.FV;
    let numOfPeriods = req.body.numOfPeriods;
    res.json(Calculator.getPV(rate, FV, numOfPeriods));
});

router.route('/instruments/FV').post((req, res) => {
    console.log(req.body);
    let rate = req.body.rate;
    let startingAmount = req.body.startingAmount;
    let numOfPeriods = req.body.numOfPeriods;
    res.json(Calculator.getFV(rate, startingAmount, numOfPeriods));
});

router.route('/instruments/NPV').post((req, res) => {
    let rate = req.body.rate;
    let initial = req.body.initial;
    delete req.body.rate;
    delete req.body.initial;
    let cashFlows = Object.values(req.body);
    console.log(req.body);
    console.log(cashFlows);
    res.json(Calculator.getNPV(rate, initial, cashFlows));
});

router.route('/instruments/IRR').post((req, res) => {
    let values = Object.values(req.body);
    res.json(Calculator.getIRR(values));
});

router.route('/instruments/PP').post((req, res) => {
    res.json(+Calculator.getPP(Object.values(req.body)).toFixed(2));
});

router.route('/instruments/ROI').post((req, res) => {
    let invested = req.body.invested;
    let returned = req.body.returned;
    res.json(Calculator.getROI(-invested, returned));
});

router.route('/instruments/R72').post((req, res) => {
    res.json(Calculator.getR72(req.body.rate));
});

router.route('/instruments/AM').post((req, res) => {
    let principal = req.body.principal;
    let rate = req.body.rate;
    let numOfPeriods = req.body.numOfPeriods;
    let type = req.body.type;
    res.json(Calculator.getAmortization(principal, rate, numOfPeriods, type));
});

router.route('/instruments/PI').post((req, res) => {
    let rate = req.body.rate;
    let initial = req.body.initial;
    delete req.body.rate;
    delete req.body.initial;
    let cashFlows = Object.values(req.body);;
    res.json(Calculator.getPI(rate, initial, ...cashFlows));
});

router.route('/instruments/DF').post((req, res) => {
    let rate = req.body.rate;
    let numOfPeriods = req.body.numOfPeriods;
    res.json(Calculator.getDF(rate, numOfPeriods)); 
});

router.route('/instruments/CI').post((req, res) => {
    let principal = req.body.principal;
    let rate = req.body.rate;
    let numOfPeriods = req.body.numOfPeriods;
    let numOfCompoundings = req.body.numOfCompoundings;
    res.json(Calculator.getCI(rate, numOfCompoundings, principal, numOfPeriods));
});

router.route('/instruments/CAGR').post((req, res) => {
    let beginningValue = req.body.beginningValue;
    let endingValue = req.body.endingValue;
    let numOfPeriods = req.body.numOfPeriods;
    res.json(Calculator.getCAGR(beginningValue, endingValue, numOfPeriods));
});

router.route('/instruments/LR').post((req, res) => {
    let totalDebts = req.body.totalDebts;
    let totalIncome = req.body.totalIncome;
    res.json(Calculator.getLR(totalDebts, totalIncome));
});

router.route('/instruments/WACC').post((req, res) => {
    let marketValueOfEquity = req.body.marketValueOfEquity;
    let marketValueOfDebt = req.body.marketValueOfDebt;
    let costOfEquity = req.body.costOfEquity;
    let costOfDebt = req.body.costOfDebt;
    let taxRate = req.body.taxRate;
    res.json(Calculator.getWACC(
        marketValueOfEquity,
        marketValueOfDebt,
        costOfEquity,
        costOfDebt,
        taxRate
    ));
});

router.route('/instruments/PMT').post((req, res) => {
    let rate = req.body.rate;
    let numOfPayments = req.body.numOfPayments;
    let principal = req.body.principal;
    res.json(Calculator.getPMT(rate, numOfPayments, principal));
});

router.route('/instruments/IAR').post((req, res) => {
    let investmentReturn = req.body.investmentReturn;
    let inflationRate = req.body.inflationRate;
    res.json(Calculator.getIAR(investmentReturn, inflationRate));
});

router.route('/instruments/PV')
router.route('/instruments/FV')
router.route('/instruments/NPV')
router.route('/instruments/IRR')
router.route('/instruments/PP')
router.route('/instruments/ROI')
router.route('/instruments/AM')
router.route('/instruments/PI')
router.route('/instruments/DF')
router.route('/instruments/CI')
router.route('/instruments/CAGR')
router.route('/instruments/LR')
router.route('/instruments/WACC')
router.route('/instruments/PMT')
router.route('/instruments/IAR')

module.exports = router;
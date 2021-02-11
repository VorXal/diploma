const CryptoInformer = require('./cryptoAPI.js');
const CurrencyInformer = require('./currencyAPI.js');
const StockInformer = require('./stockAPI.js');

const Controller = {
    getAllCoinsInfo: async function(){
        return await CryptoInformer.getAllCoinsInfo();
    },
    getCoinInfo: async function(id){
        return await CryptoInformer.getCoinInfo(id);
    },
    getAllRatesToUSD: async function(){
        return await CurrencyInformer.getAllRatesToUSD();
    },
    getPriceOfStocks: async function(tickersString){
        return await StockInformer.getPriceOfStocks(tickersString);
    },
    getTickerList: function(){
        return StockInformer.getTickerList();
    }
}

module.exports = Controller;
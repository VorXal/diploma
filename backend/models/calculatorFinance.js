const Finance = {
  getPV: function (rate, cf1, numOfPeriod) {
    numOfPeriod = typeof numOfPeriod !== 'undefined' ? numOfPeriod : 1;
    let r = rate / 100, pv;
    pv = cf1 / Math.pow((1 + r), numOfPeriod);
    return Math.round(pv * 100) / 100;
  },
  getFV: function (rate, cf0, numOfPeriod) {
    let r = rate / 100, fv;
    fv = cf0 * Math.pow((1 + r), numOfPeriod);
    return Math.round(fv * 100) / 100;
  },
  getNPV: function(rate, initial, cashFlows) {
    let r = rate / 100, npv = -initial;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += (cashFlows[i] / Math.pow((1 + r), i + 1));
    }
    return Math.round(npv * 100) / 100;
  },
  getIRR: function (values, guess) {
    guess = typeof guess === "undefined" ? 0.1 : guess;

    let epslMax = 0.0000001;
    let step = 0.00001;
    let iterMax = 39;

    //Check for valid inputs
    if (guess <= -1) {
      return "Error - invalid guess";
    }

    if (values.length < 1) {
      return null;
    }

    //Scale up the Epsilon Max based on cash flow values
    let tempVar = values[0] > 0 ? values[0] : values[0] * -1;
    let i = 0;

    while (i < values.length) {
      if (Math.abs(values[i]) > tempVar) {
        tempVar = Math.abs(values[i]);
      }
      i++;
    }

    let tempNpvEpsl = tempVar * epslMax * 0.01

    let tempRate0 = guess;
    let tempNpv0 = this.getInternalPV(values, tempRate0);

    let tempRate1 = tempNpv0 > 0 ? tempRate0 + step : tempRate0 - step;

    if (tempRate1 <= -1) {
      return "Error - invalid values";
    }

    let tempNpv1 = this.getInternalPV(values, tempRate1);

    i = 0;

    while (i <= iterMax) {
      if (tempNpv1 === tempNpv0) {
        tempRate0 = tempRate1 > tempRate0 ? tempRate0 - step : tempRate0 + step;

        tempNpv0 = this.getInternalPV(values, tempRate0);

        if (tempNpv1 === tempNpv0) {
          return "Error - invalid values";
        }
      }

      tempRate0 = tempRate1 - (tempRate1 - tempRate0) * tempNpv1 / (tempNpv1 - tempNpv0);

      //Secant method
      if (tempRate0 <= -1) {
        tempRate0 = (tempRate1 - 1) * 0.5;
      }

      //Give the algorithm a second chance...
      tempNpv0 = this.getInternalPV(values, tempRate0);
      tempVar = tempRate0 > tempRate1 ? tempRate0 - tempRate1 : tempRate1 - tempRate0;

      let tempVar2 = tempNpv0 > 0 ? tempNpv0 : tempNpv0 * -1;

      //Test for npv = 0 and rate convergence
      if (tempVar2 < tempNpvEpsl && tempVar < epslMax) {
        return +(tempRate0 * 100).toFixed(3);
      }
      //Transfer values and try again...
      tempVar = tempNpv0;
      tempNpv0 = tempNpv1;
      tempNpv1 = tempVar;
      tempVar = tempRate0;
      tempRate0 = tempRate1;
      tempRate1 = tempVar;

      i++;

    }
    return "Error - iterMax exceeded"
  },
  getInternalPV: function (values, guess) {
    guess = typeof guess === "undefined" ? 0.1 : guess;

    let lowerBound = 0;
    let upperBound = values.length - 1;

    let tempTotal = 0
    let divRate = 1 + guess;

    while (lowerBound <= upperBound && values[lowerBound] === 0) {
      lowerBound++;
    }

    let i = upperBound;
    let step = -1

    while (i >= lowerBound) {
      tempTotal = tempTotal / divRate;
      tempTotal = tempTotal + values[i];
      i = i + step;
    }
    return tempTotal;
  },
  getPP: function (cfs) {
    let output = 0;
    let i = 1;
    while(cfs[0] > 0 && i < cfs.length - 1){
      cfs[0] -= cfs[i];
      i++;
      output++;
    }
    return output;
  },
  getROI: function (cf0, earnings) {
    var roi = (earnings - Math.abs(cf0)) / Math.abs(cf0) * 100;
    return Math.round(roi * 100) / 100;
  },
  getR72: function (rate) {
    return 72/rate;
  },
  getAmortization: function (principal, rate, period, yearOrMonth, payAtBeginning) {
    var numerator, denominator, am;
    var ratePerPeriod = rate / 12 / 100;

    // for inputs in years
    if (!yearOrMonth) {
      numerator = buildNumerator(period * 12);
      denominator = Math.pow((1 + ratePerPeriod), period * 12) - 1;

      // for inputs in months
    } else if (yearOrMonth === 1) {
      numerator = buildNumerator(period)
      denominator = Math.pow((1 + ratePerPeriod), period) - 1;

    } else {
      console.log('not defined');
    }
    am = principal * (numerator / denominator);
    return Math.round(am * 100) / 100;

    function buildNumerator(numInterestAccruals) {
      if (payAtBeginning) {
        //if payments are made in the beginning of the period, then interest shouldn't be calculated for first period
        numInterestAccruals -= 1;
      }
      return ratePerPeriod * Math.pow((1 + ratePerPeriod), numInterestAccruals);
    }
  },
  getPI: function (rate, cfs) {
    var totalOfPVs = 0, PI;
    for (var i = 2; i < arguments.length; i++) {
      var discountFactor;
      // calculate discount factor
      discountFactor = 1 / Math.pow((1 + rate / 100), (i - 1));
      totalOfPVs += arguments[i] * discountFactor;
    }
    PI = totalOfPVs / Math.abs(arguments[1]);
    return Math.round(PI * 100) / 100;
  },
  getDF: function (rate, numOfPeriods) {
    return +(1/Math.pow(1+rate/100,numOfPeriods)).toFixed(4);
  },
  getCI: function (rate, numOfCompoundings, principal, numOfPeriods) {
    var CI = principal * Math.pow((1 + ((rate / 100) / numOfCompoundings)), numOfCompoundings * numOfPeriods);
    return Math.round(CI * 100) / 100;
  },
  getCAGR: function (beginningValue, endingValue, numOfPeriods) {
    var CAGR = Math.pow((endingValue / beginningValue), 1 / numOfPeriods) - 1;
    return Math.round(CAGR * 10000) / 100;
  },
  getLR: function (totalDebts, totalIncome) {
    return +(totalDebts / totalIncome).toFixed(3);
  },
  getWACC: function (marketValueOfEquity, marketValueOfDebt, costOfEquity, costOfDebt, taxRate) {
    var E = marketValueOfEquity;
    var D = marketValueOfDebt;
    var V = marketValueOfEquity + marketValueOfDebt;
    var Re = costOfEquity;
    var Rd = costOfDebt;
    var T = taxRate;

    var WACC = ((E / V) * Re / 100) + (((D / V) * Rd / 100) * (1 - T / 100));
    return Math.round(WACC * 1000) / 10;
  },
  getPMT: function (rate, numOfPayments, principal) {
    var rate = rate / 1200, pmt;
    pmt = principal * rate / (1 - Math.pow(1 + rate, -numOfPayments))
    return Math.round(pmt * 100) / 100;
  },
  getIAR: function (investmentReturn, inflationRate) {
    return +(100 * (((1 + investmentReturn/100) / (1 + inflationRate/100)) - 1)).toFixed(2);
  }
}
module.exports = Finance;
var numericValidation = function(data, message) {
  if (!Number.isFinite(data)) {
    console.error(message);
    return true;
  } else {
    return false;
  }
};
var requiredValidation = function(data, message) {
  if (data == null) {
    console.error(message);
    return true;
  } else {
    return false;
  }
};
var groupOneValidation = function(i, n) {
  if (
    requiredValidation(i, "need data interest to calculate") ||
    numericValidation(i, "interest must be numeric") ||
    requiredValidation(n, "need total data to calculate") ||
    numericValidation(n, "total data must be numeric")
  ) {
    return true;
  } else {
    return false;
  }
};

var groupTwoValidation = function(i, n, v) {
  if (
    groupOneValidation(i, n) ||
    requiredValidation(v, "need data value to calculate") ||
    numericValidation(v, "value must be numeric")
  ) {
  }
};
export default class TableFunction {
  //f=p
  futurePresent({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return Math.pow(1 + i, n);
  }
  //p=f
  presentFuture({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return Math.pow(1 + i, -n);
  }
  //a=f
  annualFuture({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return i / (Math.pow(1 + i, n) - 1);
  }
  //a=p
  annualPresent({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  }

  //f=a
  futureAnnual({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return (Math.pow(1 + i, n) - 1) / i;
  }

  //p=a
  presentAnnual({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    var u = 1 + i;
    return (Math.pow(u, n) - 1) / (i * Math.pow(u, n));
  }

  //a=g
  annualGradient({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return 1 / i - n / (Math.pow(1 + i, n) - 1);
  }

  //p=g
  presentGradient({ i = null, n = null }) {
    if (groupOneValidation(i, n)) {
      return;
    }
    return (
      (Math.pow(1 + i, n) - i * n - 1) / (Math.pow(i, 2) * Math.pow(1 + i, n))
    );
  }

  find(value = null, table = null, i = null, n = null) {
    var returned;
    if (groupTwoValidation(i, n, value)) {
      return;
    }
    switch (table) {
      case "F/P":
        returned = value * this.futurePresent({ i, n });
        break;
      case "P/F":
        returned = value * this.presentFuture({ i, n });
        break;
      case "F/A":
        returned = value * this.futureAnnual({ i, n });
        break;
      case "A/F":
        returned = value * this.annualFuture({ i, n });
        break;
      case "A/P":
        returned = value * this.annualFuture({ i, n });
        break;
      case "P/A":
        returned = value * this.presentAnnual({ i, n });
        break;
      case "A/G":
        returned = value * this.annualGradient({ i, n });
        break;
      case "P/G":
        returned = value * this.presentGradient({ i, n });
        break;
      default:
        console.error("table error");
        returned = null;
    }
    return returned;
  }

  printTable(maxInterest = null, maxPeriods = null) {
    if (groupOneValidation(maxInterest, maxPeriods)) {
      return null;
    }
    var table = [];
    for (var i = 1; i <= maxInterest * 2; i++) {
      var tablePeriods = [];
      var interest = i / 2;
      for (var j = 1; j <= maxPeriods; j++) {
        tablePeriods.push({
          n: j,
          fp: Number(this.futurePresent({ i: interest, n: j })).toFixed(4),
          pf: Number(this.presentFuture({ i: interest, n: j })).toFixed(4),
          fa: Number(this.futureAnnual({ i: interest, n: j })).toFixed(4),
          af: Number(this.annualFuture({ i: interest, n: j })).toFixed(4),
          ap: Number(this.annualPresent({ i: interest, n: j })).toFixed(4),
          pa: Number(this.presentAnnual({ i: interest, n: j })).toFixed(4),
          ag: Number(this.annualGradient({ i: interest, n: j })).toFixed(4),
          pg: Number(this.presentGradient({ i: interest, n: j })).toFixed(4)
        });
      }
      table.push({ tablePeriods });
    }
    return table;
  }
}

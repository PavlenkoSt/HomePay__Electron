const productCalc = {
  getMarginFromPercentAndPrice: (percent: number, price: number) => {
    return productCalc.checkFalsyResult(+(price + (price * percent) / 100).toFixed(2))
  },
  getPercentFromPrices: (retail: number, wholesale: number) => {
    return productCalc.checkFalsyResult(+((wholesale * 100) / retail - 100).toFixed(2))
  },
  getMarginValueFromPrices: (retail: number, wholesale: number) => {
    return productCalc.checkFalsyResult(+(+wholesale - retail).toFixed(2))
  },
  getWholesaleFromRetailAndMarginValue: (retail: number, marginvalue: number) => {
    return productCalc.checkFalsyResult(+(retail + marginvalue).toFixed(2))
  },
  getPercentFromRetailAndMarginValue: (retail: number, marginValue: number) => {
    return productCalc.checkFalsyResult(+((marginValue * 100) / retail).toFixed(2))
  },
  checkFalsyResult: (res: number) => {
    if (isNaN(res) || !isFinite(res)) {
      return 0
    } else {
      return res
    }
  },
}

export default productCalc

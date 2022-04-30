const formatWithFloat = (sum: number, withGrn?: boolean) => {
  if (Number(sum) === sum && sum % 1 !== 0) {
    if (withGrn) {
      return `${sum.toFixed(2)} ₴`
    } else {
      return sum.toFixed(2)
    }
  } else {
    if (withGrn) {
      return `${sum} ₴`
    } else {
      return sum
    }
  }
}

export default formatWithFloat

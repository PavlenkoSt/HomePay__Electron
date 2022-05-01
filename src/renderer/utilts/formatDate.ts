const formatDate = {
  number: (date: Date) => {
    return `${formatDate.addZero(date.getDate())}.${formatDate.addZero(
      date.getMonth() + 1
    )}.${date.getFullYear()}`
  },
  addZero: (dateElem: number) => {
    if (dateElem < 10) {
      return `0${dateElem}`
    }
    return dateElem
  },
}

export default formatDate

const numWord = (value: number, words: string[]) => {
  const calc = Math.abs(value) % 100

  const num = calc % 10

  if (calc > 10 && calc < 20) return words[2]
  if (num > 1 && num < 5) return words[1]
  if (num == 1) return words[0]

  return words[2]
}

export default numWord

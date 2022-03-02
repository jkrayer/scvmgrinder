export const symbol = (score) => score === 0 ? `±${score}` : score > 0 ? `+${score}` : score

export const roll = (d, n = 1) => Math.floor(Math.random() * d) + 1

export const trace = (message) => (x) => {
    console.log(message, x)
    return x
}

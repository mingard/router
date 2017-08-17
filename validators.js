const numberValidator = num => !isNaN(parseFloat(num)) && isFinite(num)
const objectIdValidator = value => value.match(/^[a-fA-F0-9]{24}/)

module.exports = {
  numberValidator,
  objectIdValidator
}
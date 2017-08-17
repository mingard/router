const numberValidator = value => !isNaN(value)
const objectIdValidator = value => value.match(/^[a-fA-F0-9]{24}/)

module.exports = {
  numberValidator,
  objectIdValidator
}
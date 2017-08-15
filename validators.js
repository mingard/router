const numberValidator = value => value.match(/^\d+$/)
const objectIdValidator = value => value.match(/^[a-fA-F0-9]{24}/)

module.exports = {
  numberValidator,
  objectIdValidator
}
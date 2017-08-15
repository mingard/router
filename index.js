'use strict'
const util = require('./util')
const validators = require('./validators')

const Router = function () {
  this.routes = []
  // Define default validators (can be extended)
  this.validators = {
    Number: validators.numberValidator,
    ObjectId: validators.objectIdValidator
  }

  return this
} 

Router.prototype.add = function () {
  this.routes.push([...arguments])

  return this
}

Router.prototype.match = function (route) {
  const parts = util.sanitizePath(route)
    .split('/')
  
  const matches = this.matchParts(parts)

  console.log(route, matches)
}

Router.prototype.matchParts = function (parts) {
  const routes = [...this.routes]
  return routes.find(route => {
    return route
      .map((routePart, index) => this.matchPart(routePart, parts[index]))
      .every(Boolean)
  })
}

Router.prototype.matchPart = function (routeSchema, part) {
  // Test match when preset variable options are set.
  if (typeof routeSchema === 'object') {
    const field = Object.keys(routeSchema)[0]

    if (!Array.isArray(routeSchema[field])) return

    return routeSchema[field].includes(part)
  }

  // Create schema object of analysed route.
  const schema = util.analyseSchema(routeSchema)

  // Not a variable part. Must match exact string.
  if (!schema.isVar) return schema.value === part

  // If variable is optional but isn't supplied.
  if (schema.isOptional && !part) return true

  const validator = this.validators[schema.validator]

  // Variable is not optional and corresponding part is set.
  // Must exist, and be valid if a validator is defined.
  if (schema.isVar) return (part && (!validator || validator(part)))

}

module.exports = function () {
  return new Router()
}

module.exports.Router = Router
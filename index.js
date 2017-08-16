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

Router.prototype.match = function (origin) {
  const parts = util.sanitizePath(origin)
    .split('/')
  
  const matchingRoute = this.matchParts(parts)

  if (!matchingRoute) {
    return {
      origin,
      err: {
        msg: 'No matching route found'
      }
    }
  }

  const match = matchingRoute
    .map(route => util.isObject(route) ? Object.keys(route)[0] : route)
    .join('/')
  const params = this.getParamsFromUrl(matchingRoute, parts)

  return {
    origin,
    match,
    params
  }
}

Router.prototype.getParamsFromUrl = function (route, urlParts) {
  return Object.assign({}, 
    ...route.map((part, index) => {
      const schema = util.analyseSchema(part)

      if (schema.isVar && urlParts[index]) {
        return {[schema.value]: urlParts[index]}
      }
    })
    .filter(Boolean)
  )
}

Router.prototype.matchParts = function (parts) {
  return this.routes.find(route => {

    return route
      .map((routePart, index) => this.matchPart(routePart, parts[index]))
      .every(Boolean)
  })
}

Router.prototype.matchPart = function (routeSchema, part) {
  // Create schema object of analysed route.
  const schema = util.analyseSchema(routeSchema)

  // Not a variable part. Must match exact string.
  if (!schema.isVar) return schema.value === part

  // If schema has options, make sure current part is one of them.
  if (schema.options) return schema.options.includes(part)

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
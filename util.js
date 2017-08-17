const sanitizePath = url => url.replace(/^\/|\/$/g, '')

const isObject = sub => typeof sub === 'object'

const analyseSchema = schema => {
  const key = isObject(schema) ? Object.keys(schema)[0] : schema
  const options = isObject(schema) && schema[key]
  const validatorMatch = key.match(/\[(.*)\]/)
  const validator = validatorMatch && validatorMatch[1]

  const map = {
    isOptional: key
      .replace(/\[.*\]/g, '')
      .endsWith('?'),
    isVar: key.startsWith(':'),
    value: key
      .replace(':', '')
      .replace('?', '')
      .replace(/\[.*\]/g, '')
  }

  if (typeof validator !== 'undefined') Object.assign(map, {validator})
  if (options) Object.assign(map, {options})

  return map
}

const regexValidate = regex => {
  return val => new RegExp(`${regex}$`, 'ig').test(val)
}

module.exports = {
  analyseSchema,
  isObject,
  regexValidate,
  sanitizePath
}
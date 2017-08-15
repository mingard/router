const sanitizePath = route => {
  return route.replace(/^\/|\/$/g, '')
}

const analyseSchema = schema => {
  const validatorMatch = schema.match(/\[(.*)\]/)
  const validator = validatorMatch && validatorMatch[1]

  return {
    isOptional: schema
      .replace(/\[.*\]/g, '')
      .endsWith('?'),
    isVar: schema.startsWith(':'),
    validator,
    value: schema
      .replace(':', '')
      .replace('?', '')
      .replace(/\[.*\]/g, '')
  }
}

module.exports = {
  analyseSchema,
  sanitizePath
}
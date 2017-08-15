const Router = require('./index')

const getTitles = () => {
  return ['foo', 'bar', 'baz']
}

const RouterInstance = function () {
  const router = new Router()
    .add('article', ':id[ObjectId]', ':page?[Number]')
    .add('article', {':title': getTitles()})

  router.match('/article/593fee8cd8ab693784c139ac')
  router.match('/article/593fee8cd8ab693784c139ac/2')
  router.match('/article/2')
  router.match('/article/bar')
  router.match('/article/foo')
}

module.exports = new RouterInstance()
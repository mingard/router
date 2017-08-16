const Router = require('./index')

const getTitles = () => {
  return ['foo', 'bar', 'baz']
}

const RouterInstance = function () {
  const router = new Router()
    .add('article', ':page?[Number]')
    .add('article', ':documentId[ObjectId]', ':page?[Number]')
    .add('article', {':title': getTitles()})

  console.log(router.match('/article/593fee8cd8ab693784c139ac'))
  console.log(router.match('/article/593fee8cd8ab693784c139ac/2'))
  console.log(router.match('/article/2'))
  console.log(router.match('/article/bar'))
  console.log(router.match('/article/foo'))
}

module.exports = new RouterInstance()
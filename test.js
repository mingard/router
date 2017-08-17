const Router = require('./index')

const getTitles = () => {
  return ['foo', 'bar', 'baz']
}

const RouterInstance = function () {
  const router = new Router()
    .add('articles', ':page?[Number]')
    .add('articles', ':documentId[ObjectId]', ':page?[Number]')
    .add('articles', {':title': getTitles()})
    .add('books', ':page?[\\d+]')

  console.log(router.match('/articles/593fee8cd8ab693784c139ac'))
  console.log(router.match('/articles/593fee8cd8ab693784c139ac/2'))
  console.log(router.match('/articles/2'))
  console.log(router.match('/articles/bar'))
  console.log(router.match('/articles/foo'))
  console.log(router.match('/books/1'))
  console.log(router.match('/books/'))
}

module.exports = new RouterInstance()
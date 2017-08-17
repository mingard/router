const Router = require('./index')

const getTitles = () => {
  return ['foo', 'bar', 'baz']
}

const todaysDate = () => {
  const today = new Date()

  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const Today = date => date === todaysDate()

const RouterInstance = function () {
  const router = new Router()
    .addValidators({
      Today
    })
    .addRoute('news', ':date[Today]')
    .addRoute('articles', ':page?[Number]')
    .addRoute('articles', ':documentId[ObjectId]', ':page?[Number]')
    .addRoute('articles', {':title': getTitles()})
    .addRoute('books', ':page?[\\d+]')
    .addRoute('books', ':page?[\\d+]')

  console.log(router.match('/articles/593fee8cd8ab693784c139ac'))
  console.log(router.match('/articles/593fee8cd8ab693784c139ac/2'))
  console.log(router.match('/articles/2'))
  console.log(router.match('/articles/bar'))
  console.log(router.match('/articles/foo'))
  console.log(router.match('/books/1'))
  console.log(router.match('/books/'))
  console.log(router.match(`/news/${todaysDate()}`))
}

module.exports = new RouterInstance()
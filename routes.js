const nextRoutes = require('next-routes')

const routes = (module.exports = nextRoutes()) // eslint-disable-line no-multi-assign

routes.add('index', '/')
routes.add('login', '/login')
routes.add('blogs', '/blogs')
routes.add('photos', '/photos')
routes.add({
  page: 'photos/id',
  name: 'photos/id',
  patern: '/photos/:photo_id',
})
routes.add({
  page: 'blogs/id',
  name: 'blogs/id',
  patern: '/blogs/:blog_id',
})

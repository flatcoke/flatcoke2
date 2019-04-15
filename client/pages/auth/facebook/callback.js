import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    console.log(req)
    const { user } = req
    if (user) {
      res.writeHead(302, {
        Location: '/',
      })
    } else {
      res.writeHead(302, {
        Location: '/login',
      })
    }
    res.end()
  }
}

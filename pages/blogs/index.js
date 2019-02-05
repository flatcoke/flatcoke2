import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPosts } from 'actions/posts'
import Layout from 'components/layout'

class Post extends React.Component {
  static async getInitialProps({ store, isServer }) {
    await store.dispatch(getPosts())

    return { isServer }
  }

  render() {
    const { items } = this.props
    return (
      <Layout title="FLATCOKE BLOG">
        {items.map(item => item.title)}
        <div>blogs</div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.posts.items,
    next: state.posts.next,
    previous: state.posts.previous,
  }
}

const mapDispatchToProps = dispatch => ({
  getPosts: bindActionCreators(getPosts, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)

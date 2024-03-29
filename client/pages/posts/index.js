import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPosts } from 'actions/posts'
import Layout from 'components/Layout'
import PostList from 'components/Blog/PostList'

class PostListPage extends React.Component {
  static async getInitialProps({ store, isServer }) {
    await store.dispatch(getPosts())

    return { isServer }
  }

  render() {
    const { items } = this.props

    return (
      <Layout title="FLATCOKE BLOG">
        <div>
          <PostList posts={items} />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.posts.items,
    // next: state.posts.next,
    // previous: state.posts.previous,
  }
}

const mapDispatchToProps = dispatch => ({
  getPosts: bindActionCreators(getPosts, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListPage)

import React from 'react'
import { getPost } from 'actions/posts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PostPage extends React.Component {
  static async getInitialProps({ store, query }) {
    const { id } = query
    await store.dispatch(getPost(id))
    return {}
  }

  render() {
    const { post } = this.props
    return <div>{post ? post.content : ''}</div>
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
  }
}

const mapDispatchToProps = dispatch => ({
  getPost: bindActionCreators(getPost, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)

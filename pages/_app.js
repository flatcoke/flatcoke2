import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import initStore from '../store'

export default withRedux(initStore)(
  class BlogApp extends App {
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      }

      return { pageProps }
    }

    renderHead = () => {
      return (
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css"
            rel="stylesheet"
            type="text/css"
          />
        </Head>
      )
    }

    render() {
      const { Component, pageProps, store } = this.props
      return (
        <Container>
          <Provider store={store}>
            {this.renderHead()}
            <style jsx global>{`
              body {
                font-family: 'Spoqa Han Sans', sans-serif;
                font-weight: 300;
              }
            `}</style>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  }
)

import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

export default class BlogApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
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
    const { Component, pageProps } = this.props
    return (
      <Container>
        {this.renderHead()}
        <style jsx global>{`
          body {
            font-family: 'Spoqa Han Sans', sans-serif;
            font-weight: 300;
          }
        `}</style>
        <Component {...pageProps} />
      </Container>
    )
  }
}

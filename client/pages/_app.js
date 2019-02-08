import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../lib/getPageContext'
import initStore from '../store'

export default withRedux(initStore)(
  class BlogApp extends App {
    constructor() {
      super()
      this.pageContext = getPageContext()
    }

    static async getInitialProps({ Component, ctx }) {
      let pageProps = {}

      if (Component.getInitialProps) {
        pageProps = Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      }

      return { pageProps }
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
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
            href="https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/2.1.2/css/SpoqaHanSans-kr.css"
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
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <Provider store={store}>
                {this.renderHead()}
                <style jsx global>{`
                  body {
                    font-family: 'Spoqa Han Sans', sans-serif;
                    font-weight: 300;
                  }
                `}</style>
                <CssBaseline />
                <Component pageContext={this.pageContext} {...pageProps} />
              </Provider>
            </MuiThemeProvider>
          </JssProvider>
        </Container>
      )
    }
  }
)

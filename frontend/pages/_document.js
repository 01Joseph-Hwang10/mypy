import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body onLoad={brython}>
          <Main />
          <NextScript />
          <script type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/brython@3.9.1/brython.min.js">
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument

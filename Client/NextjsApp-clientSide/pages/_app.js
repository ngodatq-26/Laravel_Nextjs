import '../styles/globals.css'
import wrapper from "../redux/configureStore"
import React from 'react'
import { Router } from 'next/router'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

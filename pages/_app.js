import Layout from 'components/layout'
import 'styles/globals.css'
import Script from 'next/script'
import * as gtag from 'lib/gtag'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

config.autoAddCss = false

const MyApp = props => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}');
          `
        }}
      />
      <Layout>
        <props.Component {...props.pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

import Meta from 'components/meta'
import Container from 'components/container'
import Hero from 'components/hero'

const Custom404 = () => {
  return (
    <Container>
      <Meta pageTitle='404 - Page not fount' />
      <Hero title='404' subtitle='ページが見つかりません' />
    </Container>
  )
}

export default Custom404

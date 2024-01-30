import Container from 'components/container'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main>
        <Container>{children}</Container>
      </main>

      <Footer />
    </>
  )
}
export default Layout

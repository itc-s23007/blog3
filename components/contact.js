import Social from 'components/social'
import styles from 'styles/contact.module.css'

const Contact = () => (
  <div className={styles.stack}>
    <h3 className={styles.heading}>Contact</h3>
    <Social />
    <address>cube@web.mail.address</address>
  </div>
)

export default Contact

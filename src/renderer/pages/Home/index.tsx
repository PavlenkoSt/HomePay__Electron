import WithNavbar from 'renderer/layouts/WithNavbar'
import styles from './styles.module.scss'

const Home = () => {
  return (
    <WithNavbar>
      <div className={styles.container}>Home</div>
    </WithNavbar>
  )
}

export default Home

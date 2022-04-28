import { useEffect } from 'react'

import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'

import styles from './styles.module.scss'

const Home = () => {
  const { moneyStore } = useStore()

  useEffect(() => {
    moneyStore.init()
  }, [])

  return (
    <WithNavbar>
      <div className={styles.container}>
        <div className={styles.bill}>Текущий баланс: {moneyStore.bill} ₴</div>
      </div>
    </WithNavbar>
  )
}

export default Home

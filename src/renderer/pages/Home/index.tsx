import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import HomeTable from './HomeTable'

import styles from './styles.module.scss'

const Home = () => {
  const { moneyStore, productsStore } = useStore()

  useEffect(() => {
    moneyStore.init()
    productsStore.init()
  }, [])

  return (
    <WithNavbar>
      <div className={styles.container}>
        <HomeTable />
      </div>
    </WithNavbar>
  )
}

export default observer(Home)

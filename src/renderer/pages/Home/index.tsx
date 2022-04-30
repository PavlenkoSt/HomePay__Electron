import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import HomeTable from './HomeTable'
import HomePlan from './HomePlan'

import styles from './styles.module.scss'

const Home = () => {
  const { moneyStore, productsStore, plansStore } = useStore()

  useEffect(() => {
    moneyStore.init()
    productsStore.init()
    plansStore.init()
  }, [])

  return (
    <WithNavbar>
      <div className={styles.container}>
        <HomeTable />
        <HomePlan />
      </div>
    </WithNavbar>
  )
}

export default observer(Home)

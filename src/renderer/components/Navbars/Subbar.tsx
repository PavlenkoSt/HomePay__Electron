import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import { BudgetTabsEnum } from 'renderer/types/routesTypes'

import styles from './Subbar.module.scss'

type RouteType = {
  id: number
  name: string
  tab: BudgetTabsEnum
}

type SubbarPropsType = {
  tabs: RouteType[]
}

const Subbar: FC<SubbarPropsType> = ({ tabs }) => {
  const { routesStore } = useStore()

  return (
    <div className={styles.subbar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => routesStore.setBudgetRoute(tab.tab)}
          className={`${styles.route} ${routesStore.budgetRoute === tab.tab && styles.active}`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  )
}

export default observer(Subbar)

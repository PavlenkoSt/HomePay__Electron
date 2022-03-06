import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import styles from './Subbar.module.scss'

type RouteType = {
  id: number
  name: string
  tab: any
}

type SubbarPropsType = {
  tabs: RouteType[]
  action: (route: any) => void
  route: any
}

const Subbar: FC<SubbarPropsType> = ({ tabs, action, route }) => {
  return (
    <div className={styles.subbar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => action(tab.tab)}
          className={`${styles.route} ${route === tab.tab && styles.active}`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  )
}

export default observer(Subbar)

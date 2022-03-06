import { Dispatch, FC, SetStateAction } from 'react'

import { BudgetTabsEnum } from 'renderer/pages/Budget'

import styles from './Subbar.module.scss'

type RouteType = {
  id: number
  name: string
  tab: BudgetTabsEnum
}

type SubbarPropsType = {
  tabs: RouteType[]
  activeTab: BudgetTabsEnum
  setActiveTab: Dispatch<SetStateAction<BudgetTabsEnum>>
}

const Subbar: FC<SubbarPropsType> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className={styles.subbar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.tab)}
          className={`${styles.route} ${activeTab === tab.tab && styles.active}`}
        >
          {tab.name}
        </div>
      ))}
    </div>
  )
}

export default Subbar

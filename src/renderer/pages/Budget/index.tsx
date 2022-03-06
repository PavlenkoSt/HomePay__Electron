import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { BudgetTabsEnum } from 'renderer/types/routesTypes'

import styles from './styles.module.scss'

const Budget = () => {
  const { routesStore } = useStore()

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Доход', tab: BudgetTabsEnum.INCOME },
          { id: 1, name: 'Расход', tab: BudgetTabsEnum.OUTCOME },
          { id: 2, name: 'Должники', tab: BudgetTabsEnum.DEBTORS },
        ]}
      />
      <div className={styles.container}>{routesStore.budgetRoute}</div>
    </WithNavbar>
  )
}

export default observer(Budget)

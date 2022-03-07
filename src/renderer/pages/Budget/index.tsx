import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { BudgetTabsEnum } from 'renderer/types/routesTypes'

import Debtors from './Debtors'
import Incomes from './Incomes'
import Outcomes from './Outcomes'

const Budget = () => {
  const { routesStore } = useStore()

  const { budgetRoute, setBudgetRoute } = routesStore

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Доход', tab: BudgetTabsEnum.INCOME },
          { id: 1, name: 'Расход', tab: BudgetTabsEnum.OUTCOME },
          { id: 2, name: 'Должники', tab: BudgetTabsEnum.DEBTORS },
        ]}
        action={setBudgetRoute}
        route={budgetRoute}
      />
      <div className="container">
        {budgetRoute === BudgetTabsEnum.INCOME && <Incomes />}
        {budgetRoute === BudgetTabsEnum.OUTCOME && <Outcomes />}
        {budgetRoute === BudgetTabsEnum.DEBTORS && <Debtors />}
      </div>
    </WithNavbar>
  )
}

export default observer(Budget)

import { useState } from 'react'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'

export enum BudgetTabsEnum {
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
  DEBTORS = 'DEBTORS',
}

const Budget = () => {
  const [activeTab, setActiveTab] = useState(BudgetTabsEnum.INCOME)

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Доход', tab: BudgetTabsEnum.INCOME },
          { id: 1, name: 'Расход', tab: BudgetTabsEnum.OUTCOME },
          { id: 2, name: 'Должники', tab: BudgetTabsEnum.DEBTORS },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </WithNavbar>
  )
}

export default Budget

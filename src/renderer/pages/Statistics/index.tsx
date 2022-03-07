import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { StatisticsTabsEnum } from 'renderer/types/routesTypes'

import Journal from './Journal'
import Reports from './Reports'

const Statistics = () => {
  const { routesStore } = useStore()

  const { statisticsRoute, setStatisticsRoute } = routesStore

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Журнал', tab: StatisticsTabsEnum.JOURNAL },
          { id: 1, name: 'Отчёты', tab: StatisticsTabsEnum.REPORTS },
        ]}
        action={setStatisticsRoute}
        route={statisticsRoute}
      />
      <div className="container">
        {statisticsRoute === StatisticsTabsEnum.JOURNAL && <Journal />}
        {statisticsRoute === StatisticsTabsEnum.REPORTS && <Reports />}
      </div>
    </WithNavbar>
  )
}

export default observer(Statistics)

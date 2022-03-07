import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { StatisticsTabsEnum } from 'renderer/types/routesTypes'

const Statistics = () => {
  const { routesStore } = useStore()

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Журнал', tab: StatisticsTabsEnum.JOURNAL },
          { id: 1, name: 'Отчёты', tab: StatisticsTabsEnum.REPORTS },
        ]}
        action={routesStore.setStatisticsRoute}
        route={routesStore.statisticsRoute}
      />
      <div className="container">{routesStore.statisticsRoute}</div>
    </WithNavbar>
  )
}

export default observer(Statistics)

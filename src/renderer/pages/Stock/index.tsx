import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { StockTabsEnum } from 'renderer/types/routesTypes'

const Stock = () => {
  const { routesStore } = useStore()

  return (
    <WithNavbar>
      <Subbar
        tabs={[
          { id: 0, name: 'Товары', tab: StockTabsEnum.STOCK_LIST },
          { id: 1, name: 'Завоз', tab: StockTabsEnum.DELIVERY },
        ]}
        action={routesStore.setStockRoute}
        route={routesStore.stockRoute}
      />
      <div className="container">{routesStore.stockRoute}</div>
    </WithNavbar>
  )
}

export default observer(Stock)

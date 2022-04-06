import { observer } from 'mobx-react-lite'

import Subbar from 'renderer/components/Navbars/Subbar'
import WithNavbar from 'renderer/layouts/WithNavbar'
import { useStore } from 'renderer/store'
import { StockTabsEnum } from 'renderer/types/routesTypes'

import StockList from './StockList'

const Stock = () => {
  const { routesStore } = useStore()

  const { stockRoute, setStockRoute } = routesStore

  return (
    <WithNavbar>
      <Subbar
        tabs={[{ id: 0, name: 'Товары', tab: StockTabsEnum.STOCK_LIST }]}
        action={setStockRoute}
        route={stockRoute}
      />
      <div className="container">{stockRoute === StockTabsEnum.STOCK_LIST && <StockList />}</div>
    </WithNavbar>
  )
}

export default observer(Stock)

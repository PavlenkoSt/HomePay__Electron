import { FC, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import IProduct from 'renderer/types/IProduct'
import Options from './Options'
import RemoveProductModal from './RemoveProductModal'
import AddProductModal from './AddProductModal'
import DeliveryModal from './DeliveryModal'
import MoveModal from './MoveModal'

import styles from './Product.module.scss'

import optionsPic from 'renderer/assets/options.svg'
import removePic from 'renderer/assets/close.svg'

type ProductPropsType = {
  product: IProduct
}

const Product: FC<ProductPropsType> = ({ product }) => {
  const [removeProductModalVisible, setRemoveProductModalVisible] = useState(false)
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [moveModal, setMoveModal] = useState(false)
  const [deliveryModal, setDeliveryModal] = useState(false)

  const { productsStore } = useStore()

  const openEditModal = useCallback(() => {
    setOptionsVisible(false)
    setEditModalVisible(true)
  }, [])

  const openMoveModal = useCallback(() => {
    setOptionsVisible(false)
    setMoveModal(true)
  }, [])

  return (
    <>
      <tr className={styles.line}>
        <td>{product.name}</td>
        {productsStore.activeCategoryId === 'all-products' && (
          <td>
            {productsStore.categories.find((category) => category.id === product.categoryId)
              ?.name || 'Без категории'}
          </td>
        )}
        <td>{product.price.retail.toFixed(2)}</td>
        <td>{product.price.wholesale.toFixed(2)}</td>
        <td>{product.price.margin.value.toFixed(2)}</td>
        <td>{product.price.margin.percent}</td>
        <td>{product.count}</td>
        <td className={styles.action}>
          <div onClick={() => setDeliveryModal(true)} className={styles.btn} title="Завоз">
            <div className={styles.addBtn}>+</div>
          </div>
          <div
            onMouseEnter={() => setOptionsVisible(true)}
            onMouseLeave={() => setOptionsVisible(false)}
            className={styles.btnWrapper}
          >
            <div className={styles.btn}>
              <img className={styles.pic} src={optionsPic} />
            </div>
            {optionsVisible && <Options moveHandler={openMoveModal} editHandler={openEditModal} />}
          </div>
          <div
            onClick={() => setRemoveProductModalVisible(true)}
            className={styles.btn}
            title="Удалить"
          >
            <img className={styles.pic} src={removePic} />
          </div>
        </td>
      </tr>
      <RemoveProductModal
        visible={removeProductModalVisible}
        setVisible={setRemoveProductModalVisible}
        product={product}
      />
      <AddProductModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        editMode
        product={product}
        editId={product.id}
      />
      <MoveModal visible={moveModal} setVisible={setMoveModal} product={product} />
      <DeliveryModal visible={deliveryModal} setVisible={setDeliveryModal} product={product} />
    </>
  )
}

export default observer(Product)

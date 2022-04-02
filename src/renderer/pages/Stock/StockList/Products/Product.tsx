import { FC, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'

import IProduct from 'renderer/types/IProduct'
import RemoveProductModal from './RemoveProductModal'
import Options from './Options'

import styles from './Product.module.scss'

import optionsPic from 'renderer/assets/options.svg'
import removePic from 'renderer/assets/close.svg'
import AddProductModal from './AddProductModal'
import MoveModal from './MoveModal'

type ProductPropsType = {
  product: IProduct
}

const Product: FC<ProductPropsType> = ({ product }) => {
  const [removeProductModalVisible, setRemoveProductModalVisible] = useState(false)
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [moveModal, setMoveModal] = useState(false)

  const openEditModal = useCallback(() => {
    setOptionsVisible(false)
    setEditModalVisible(true)
  }, [])

  const openMoveModal = useCallback(() => {
    setMoveModal(true)
  }, [])

  return (
    <>
      <tr className={styles.line}>
        <td>{product.name}</td>
        <td>{product.price.retail.toFixed(2)}</td>
        <td>{product.price.wholesale.toFixed(2)}</td>
        <td>{product.price.margin.value.toFixed(2)}</td>
        <td>{product.price.margin.percent}</td>
        <td>{product.count}</td>
        <td className={styles.action}>
          <div
            onMouseEnter={() => setOptionsVisible(true)}
            onMouseLeave={() => setOptionsVisible(false)}
            className={styles.btnWrapper}
          >
            <div className={styles.btn} title="Редактировать">
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
    </>
  )
}

export default observer(Product)

import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'renderer/store'
import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'

import styles from './EditBillModal.module.scss'

type EditBillModalPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const EditBillModal: FC<EditBillModalPropsType> = ({ visible, setVisible }) => {
  const { moneyStore } = useStore()

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(moneyStore.bill.toString())
  }, [moneyStore.bill])

  const close = useCallback(() => {
    setVisible(false)
    setValue(moneyStore.bill.toString())
  }, [moneyStore.bill])

  const edit = useCallback(() => {
    moneyStore.setBillDB(+value)
    setVisible(false)
    ToastService.showSuccess('Баланс изменен')
  }, [value])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Редактировать баланс</h2>
        <div className={styles.body}>
          <Input
            label="Баланс"
            setValue={(text: string) => setValue((+text).toString())}
            value={value}
            type="number"
          />
        </div>
        <div className={styles.btns}>
          <TextButton onClick={close}>Отмена</TextButton>
          <TextButton onClick={edit} type={ButtonTypeEnum.PRIMARY}>
            Редактировать
          </TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default observer(EditBillModal)

import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import Input from 'renderer/components/Form/Input'
import ModalWrapper from 'renderer/components/ModalWrapper'
import ToastService from 'renderer/services/ToastService'
import { useStore } from 'renderer/store'

import styles from './EditMonthPlanModal.module.scss'

type EditMonthPlanModalPropsStyle = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  id: number
  title: string
  goal: number
}

const EditMonthPlanModal: FC<EditMonthPlanModalPropsStyle> = ({
  visible,
  setVisible,
  id,
  title,
  goal,
}) => {
  const { plansStore } = useStore()

  const [goalValue, setGoalValue] = useState(goal.toString() || '0')

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  const edit = useCallback(() => {
    plansStore.editPlanMonthDB(id, +goalValue)

    close()

    ToastService.showSuccess(`План на ${title} успешно изменен`)
  }, [id, goalValue])

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Редактирование плана на {title}</h2>
        <div className={styles.input}>
          <Input
            value={goalValue}
            setValue={(text: string) => setGoalValue((+text).toString())}
            label="Ожидаемый доход"
            type="number"
          />
        </div>
        <div className={styles.btns}>
          <TextButton type={ButtonTypeEnum.PRIMARY} onClick={edit}>
            Принять
          </TextButton>
          <TextButton onClick={close}>Отмена</TextButton>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default EditMonthPlanModal

import { Dispatch, FC, SetStateAction } from 'react'
import { Checkbox } from 'pretty-checkbox-react'

import TextButton, { ButtonTypeEnum } from 'renderer/components/Btns/TextButton'
import useSchemaMonthPlan from 'renderer/hooks/plans/useSchemaMonthPlan'
import ModalWrapper from 'renderer/components/ModalWrapper'
import Input from 'renderer/components/Form/Input'

import styles from './AddMonthPlan.module.scss'

type AddMonthPlanPropsType = {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const SchemaMonthPlanModal: FC<AddMonthPlanPropsType> = ({ visible, setVisible }) => {
  const {
    currentDate,
    close,
    set,
    onChange,
    autoContinueMonthPlan,
    setAutoContinueMonthPlan,
    benefits,
    setBenefits,
  } = useSchemaMonthPlan({ setVisible })

  return (
    <ModalWrapper visible={visible} close={close}>
      <div>
        <h2 className="title">Добавить план на текущий месяц ({currentDate})</h2>
        <div>
          <div className={styles.checkbox}>
            <Checkbox
              shape="curve"
              variant="thick"
              color="success-o"
              onChange={onChange}
              state={autoContinueMonthPlan}
              //@ts-ignore
              setState={setAutoContinueMonthPlan}
            >
              Автоматически пересоздавать данный план для следующих месяцев
            </Checkbox>
          </div>
          <Input
            label="Ожидаемый доход"
            value={benefits}
            setValue={(text: string) => setBenefits((+text).toString())}
            type="number"
          />
          <div className={styles.btns}>
            <TextButton onClick={set} type={ButtonTypeEnum.PRIMARY}>
              Принять
            </TextButton>
            <TextButton onClick={close}>Отмена</TextButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default SchemaMonthPlanModal

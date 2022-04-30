import TextButton from 'renderer/components/Btns/TextButton'
import HomePlanItem from './HomePlanItem'

import styles from './styles.module.scss'

const HomePlan = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Ежемесячные финансовые планы</h4>
      <div className={styles.planList}>
        <HomePlanItem removePlan={() => {}} />
        <div className={styles.btn}>
          <TextButton>Показать ещё</TextButton>
        </div>
      </div>
      <h4 className={styles.title}>Дополнительные финансовые планы</h4>
      <div>
        <HomePlanItem removePlan={() => {}} />
        <div className={styles.btn}>
          <TextButton>Показать ещё</TextButton>
        </div>
      </div>
    </div>
  )
}

export default HomePlan

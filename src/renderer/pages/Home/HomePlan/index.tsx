import HomePlanItem from './HomePlanItem'

import styles from './styles.module.scss'

const HomePlan = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Дополнительные финансовые планы</h4>
      <div>
        <HomePlanItem removePlan={() => {}} />
      </div>
    </div>
  )
}

export default HomePlan

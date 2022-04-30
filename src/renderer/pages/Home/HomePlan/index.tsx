import HomePlanItem from './HomePlanItem'

import styles from './styles.module.scss'

const HomePlan = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Финансовый план</h4>
      <div>
        <HomePlanItem />
      </div>
    </div>
  )
}

export default HomePlan

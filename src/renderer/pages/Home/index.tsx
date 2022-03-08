import { useState } from 'react'
import WithNavbar from 'renderer/layouts/WithNavbar'

import styles from './styles.module.scss'

const Home = () => {
  const [state, setState] = useState('')
  const [val, setVal] = useState('')

  return (
    <WithNavbar>
      <div className={styles.container}>
        <div>{state}</div>
        <button
          onClick={() => {
            setState(window.electron.store.get('foo'))
          }}
        >
          get!
        </button>
        <input value={val} onChange={(e) => setVal(e.target.value)} />
        <button
          onClick={() => {
            console.log(window.electron.store.set('foo', val))
          }}
        >
          set!
        </button>
      </div>
    </WithNavbar>
  )
}

export default Home

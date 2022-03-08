import { render } from 'react-dom'
import Modal from 'react-modal'

import App from './App'

Modal.setAppElement('#root')

render(<App />, document.getElementById('root'))

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any
        set: (key: string, val: any) => void
        // any other methods you've defined...
      }
    }
  }
}

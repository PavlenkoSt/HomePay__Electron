import { render } from 'react-dom'
import App from './App'

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

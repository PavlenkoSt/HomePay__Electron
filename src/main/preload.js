const { contextBridge, ipcRenderer } = require('electron')
const { STORE_GET, STORE_SET } = require('../constants.js')

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping')
    },
    on(channel, func) {
      const validChannels = ['ipc-example']
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example']
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args))
      }
    },
  },
  store: {
    get(val) {
      return ipcRenderer.sendSync(STORE_GET, val)
    },
    set(property, val) {
      ipcRenderer.send(STORE_SET, property, val)
    },
  },
})

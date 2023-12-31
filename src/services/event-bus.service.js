export const SHOW_MSG = 'show-msg'

class EventBusError extends Error {
    constructor(message) {
      super(message)
      this.name = "EventBusError"
    }
}

function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener){

            listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
            return ()=>{
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        off(evName, listener) {
            if (listenersMap[evName]) {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, ...data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(...data))
        }
    }
}

export const eventBus = createEventEmitter()

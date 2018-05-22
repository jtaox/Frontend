import { Dep } from './dep'

export function observer(data) {
  if (!data || typeof data !== 'object') return
  Object.keys(data).forEach(key => {
    definePreperty(data, key, data[key])
  })
}

function definePreperty(data, key, val) {
  observer(val)
  const dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      Dep.target && !dep.hasSub(Dep.target) && dep.addSub(Dep.target)
      console.log('get', key)
      return val
    },
    set(newVal) {
      if (val === newVal) return
      observer(newVal)
      val = newVal
      console.log('set', key)
      dep.notifyAll()
    }
  })
}

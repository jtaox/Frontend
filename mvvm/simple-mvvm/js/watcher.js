import { Dep } from './dep'
export class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm
    // this.exp = exp
    this.cb = cb
    this.getter = exp
    this.val = this.get()
  }
  update() {
    // const value = this.getter(this.vm) // 取到最新值
    const value = this.get()
    const oldVal = this.val
    if (value !== oldVal) {
      this.val = value
      this.cb.call(this.vm, value, oldVal)
    }
  }
  get() {
    Dep.target = this
    const val = this.getter(this.vm)
    Dep.target = null
    return val
  }
}
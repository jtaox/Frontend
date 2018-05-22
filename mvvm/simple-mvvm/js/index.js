import { observer } from './observer'
import { Compile } from './compile'

class SimpleMVVM {
  constructor(option) {
    this.$option = option
    this.init()
  }
  init(el) {
    this.data = this.$option.data
    Object.keys(this.data).forEach(key => Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: () => this.data[key],
      set: val => this.data[key] = val
    }))
    observer(this.data)
    this.compile = new Compile(this.$option.el, this)
  }
}

window.sm = new SimpleMVVM({
  el: '#app',
  data: {
    person: {
      jiangtao: {
        name: 'hello'
      }
    }
  },
  methods: {
    inputChange(event) {
      this.person.jiangtao.name = event.target.value
    }
  }
})
document.querySelector('button').onclick = function() {
  sm.data.person.jiangtao = {
    name: '替换成功'
  }
}
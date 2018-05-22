import { isElement, isTextNode } from './utils'
import { Watcher } from './watcher'

export class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$fragment = this.node2Fragment(this.$el)
    this.propertyReg = /[^\w.$]/
    this.compileEle(this.$fragment, vm)
    this.$el.appendChild(this.$fragment)
  }
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child = null
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  compileEle(el, vm) {
    const textReg = /\{\{(.*)\}\}/
    const directiveReg = /^[:@]\w+$/
    el.childNodes.forEach((item) => {
      if (isElement(item)) {
        this.compileAttr(item, directiveReg, vm)
      } else if(isTextNode(item) && textReg.test(item.textContent)) {
        // $1表示匹配的结果
        this.compileText(item, RegExp.$1, vm)
      }
      // 遍历编译子节点
      if (item.childNodes && item.childNodes.length) {
        this.compileEle(item, vm)
      }
    })
  }
  compileAttr(node, reg, vm) {
    const attrs = node.attributes
    for(let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      if (!reg.test(attr.name)) continue
        // attr.indexOf('@') === 0 || attr.indexOf(':') === 0
        // console.log(attr.value)
      const { name, value } = attr
      if (~name.indexOf('@')) this.eventHandler({ node, name, value, vm })
      else if (~name.indexOf(':')) this.normalHandler({ name, value })
    }
  }
  eventHandler({ node, name, value, vm }) {
    name = name.split('@')[1]
    const fun = vm.$option.methods[value]
    node.addEventListener(name, fun.bind(vm), false)
  }
  normalHandler() {

  }
  compileText(node, exp, vm) {
    this.updateAndWatch('text', node, exp.trim(), vm)
  }
  updateAndWatch(type, node, exp, vm) {
    const getter = this.parseProperty(exp)
    const fun = this.updater(type, node, getter(vm))
    new Watcher(vm, getter, function(val, oldVal) {
      fun(node, val)
    })
  }
  updater(type, node, val) {
    const fun = this[type + 'Updater']
    fun && fun(node, val)
    return fun
  }
  textUpdater(node, val) {
    node.textContent = typeof val === 'undefined' ? '' : val 
  }
  parseProperty(property) {
    // 不合法的属性
    if (this.propertyReg.test(property)) return
    // 针对子对象 
    const properties = property.split('.')
    return function(obj) {
      properties.forEach(key => {
        if (!obj) return
        obj = obj[key]
      })
      console.log(obj)
      return obj
    }
  }
}

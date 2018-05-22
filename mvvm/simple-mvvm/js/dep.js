export function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  hasSub(sub) {
    return ~this.subs.indexOf(sub)
  },
  notifyAll() {
    this.subs.forEach(sub => sub.update())
  }
}
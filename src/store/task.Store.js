import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: '学习react',
      isDone: true,
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: false,
    },
  ]
  constructor() {
    makeAutoObservable(this)
  }
  // 修改状态的方法
  changeChecked(id, isDone) {
    const Item = this.list.find((item) => item.id === id)
    Item.isDone = isDone
  }
  // 全选
  checkedAll(isDone) {
    this.list.forEach((item) => (item.isDone = isDone))
  }
  //  计算属性， 只有全部子项选中 修改全部选中
  get isAll() {
    return this.list.every((item) => item.isDone)
  }
  //  已完成
  get isFulfilTask() {
    return this.list.filter((item) => item.isDone).length
  }
  // 删除
  delItem(id) {
    this.list = this.list.filter((item) => item.id !== id)
  }
  // 新增
  addItem(task) {
    this.list.push(task)
  }
}
export default TaskStore

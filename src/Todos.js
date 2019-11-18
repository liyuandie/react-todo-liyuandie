import React, { Component } from 'react'
// import Input from './Input'
import ListItem from './ListItem'
import Footer from './Footer'

import './style.css'
class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [], //列表数据
      inputValue: '', //input 监听
      isAllchecked: false, //全选
      // lenth: 0, //任务数量
      // 全局状态，通过底部筛选栏控制显示状态 0：all；1：active；2：completed
      filterStatus: 0
    }
  }

  render() {
    let items2render = []
    const { filterStatus, items, isAllchecked } = this.state
    if (filterStatus === 0) {
      items2render = items
    }
    if (filterStatus === 1) {
      items2render = items.filter(item => item.isChose === false)
    }
    if (filterStatus === 2) {
      items2render = items.filter(item => item.isChose === true)
    }
    const itemLeft = items.filter(item => item.isChose === false).length
    return (
      <div className="index">
        <div>Todos</div>
        <div>
          {/* <button onClick={this.clickText.bind(this)}>全选</button> */}
          <button onClick={this.toggleAll} disabled={!items.length > 0}>
            {isAllchecked ? '全不选' : '全选'}
          </button>
          <input
            // ref={input => {
            //   this.input = input
            // }} //ref = { (绑定的元素)=>{赋值}}
            // onChange={this.inputChange.bind(this)} //监听输入框的内容
            onChange={e => this.setState({ inputValue: e.target.value })}
            // onKeyUp={this.addList.bind(this)}
            onKeyUp={this.addList}
            placeholder="why be to"
          />
        </div>
        {/* {this.state.items.map((item, index) => {
          return (
            <ListItem
              itemTitle={item.title} //标题
              index={index} //下标
              isChose={item.isChose} //状态
              key={item + index} //key
              change={this.toggle.bind(this, item)}
              deleteItem={this.deleteItem.bind(this, index)} //删除方法
            ></ListItem>
          )
        })} */}
        {items2render.length <= 0 ? (
          <div> No Datas !</div>
        ) : (
          items2render.map((item, index) => {
            return (
              <ListItem
                itemTitle={item.title}
                index={index}
                isChose={item.isChose}
                key={item.id}
                id={item.id}
                toggle={this.toggle}
                deleteItem={this.deleteItem}
              ></ListItem>
            )
          })
        )}
        <Footer
          // lenth={this.state.lenth}
          // itemLeth={this.state.items.length}
          // deleteItem={this.deleteItem.bind(this)}
          // items={this.state.items}
          //   clearCompleted ={this.clearCompleted.bind(this,JSON.parse(localStorage.items))}
          // taBav={this.tab.bind(this)}
          filter={this.filterTodo}
          filterStatus={filterStatus}
          clearCompleted={this.clearCompleted}
          itemLeft={itemLeft}
        ></Footer>
      </div>
    )
  }
  //监听
  // inputChange() {
  //   this.setState({
  //     inputValue: this.input.value
  //   })
  // }
  //增加
  // addList(e) {
  //   if (this.input.value !== '') {
  //     if (e.keyCode === 13) {
  //       let list = [...this.state.items]
  //       list.push({ title: this.state.inputValue, isChose: false }) //****
  //       console.log(list)
  //       this.setState(
  //         {
  //           items: list,
  //           lenth: this.state.lenth + 1
  //         },
  //         () => {
  //           localStorage.setItem('items', JSON.stringify(this.state.items)) //存本地
  //           console.log('存储本地了') //localStorage(key,value) value 必须是字符串
  //           console.log(localStorage)
  //           console.log(JSON.parse(localStorage.items))
  //         }
  //       )
  //       this.input.value = ''
  //     }
  //   }
  // }

  addList = e => {
    let { items } = this.state
    if (e.keyCode === 13) {
      if (!e.target.value) return
      let id = 0
      if (items.length > 0) {
        id = items[0].id + 1
      }
      items.unshift({
        title: e.target.value,
        isChose: false,
        id: id
      })
      this.setState({
        items: items
      })
      e.target.value = ''
    }
  }
  //删除
  // deleteItem(index) {
  //   let items = this.state.items
  //   items.splice(index, 1)
  //   this.setState({
  //     items: items
  //   })
  //   localStorage.setItem('items', JSON.stringify(this.state.items))
  // }
  deleteItem = id => {
    let { items } = this.state
    const list = items.filter(item => item.id !== id)
    this.setState({
      items: list
    })
  }
  //选中
  // toggle(item) {
  //   item.isChose = !item.isChose
  //   let lenth = this.state.lenth + (item.isChose ? -1 : 1)
  //   this.setState({
  //     items: this.state.items,
  //     lenth: lenth
  //   })
  //   localStorage.setItem('items', JSON.stringify(this.state.items))
  // }
  toggle = id => {
    let { items } = this.state
    const list = items.map(item => {
      if (item.id === id) {
        item.isChose = !item.isChose
      }
      return item
    })
    this.setState({
      items: list
    })
  }
  //全选
  // clickText() {
  //   const items = this.state.items

  //   this.setState(
  //     {
  //       isAllchecked: !this.state.isAllchecked //点击改变状态
  //     },
  //     () => {
  //       items.forEach(item => {
  //         //循环 每个itemsList 的isChose = isAllchecked 的状态
  //         item.isChose = this.state.isAllchecked
  //       })
  //       this.setState({
  //         items: items //重新渲染一下数据
  //       })
  //     }
  //   )
  //   console.log('22222222222', this.state.isAllchecked, this.state.items)
  //   localStorage.setItem('items', JSON.stringify(this.state.items))
  // }
  toggleAll = async () => {
    let { items } = this.state
    await this.setState({
      isAllchecked: !this.state.isAllchecked
    })
    const list = items.map(item => {
      item.isChose = this.state.isAllchecked
      return item
    })
    this.setState({
      items: list
    })
  }
  //切换
  // tab(current) {
  //   this.setState(
  //     {
  //       current: current
  //     },
  //     () => {
  //       let list = JSON.parse(localStorage.items)
  //       if (current === 0) {
  //         console.log('全部显示')
  //         this.setState({
  //           items: list
  //         })
  //       } else if (current === 1) {
  //         console.log('显示未完成')
  //         let todos = []
  //         list.forEach(item => {
  //           if (item.isChose === false) {
  //             todos.push(item)
  //           }
  //         })
  //         this.setState({ items: todos })
  //       } else if (current === 2) {
  //         console.log('显示完成')
  //         let todos1 = []
  //         list.forEach(item => {
  //           if (item.isChose === true) {
  //             todos1.push(item)
  //           }
  //         })
  //         this.setState({ items: todos1 })
  //       }
  //     }
  //   )
  // }

  filterTodo = type => {
    if (type === 'All') {
      this.setState({
        filterStatus: 0
      })
    } else if (type === 'Active') {
      this.setState({
        filterStatus: 1
      })
    } else if (type === 'Completed') {
      this.setState({
        filterStatus: 2
      })
    }
  }

  //清空
  // clearCompleted(item) {
  //   let todos = []
  //   item.forEach(item => {
  //     if (!item.isChose) {
  //       todos.push(item)
  //     }
  //   })
  //   this.setState({
  //     items: todos
  //   })
  //   // localStorage.setItem('items', JSON.stringify(this.state.items))
  // }
  clearCompleted = item => {
    let { items } = this.state
    const list = items.filter(item => item.isChose === false)
    this.setState({
      items: list
    })
    // localStorage.setItem('items', JSON.stringify(this.state.items))
  }
}

export default Todos

import React, { Component } from 'react'

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false //显示 隐藏
    }
  }
  // mouseOve(){
  //     this.setState({
  //         isShow : true
  //     })
  // }
  mouseOve = () => {
    this.setState({
      isShow: true
    })
  }

  // mouseOut(){
  //     this.setState({
  //         isShow : false
  //     })
  // }

  mouseOut = () => {
    this.setState({
      isShow: false
    })
  }
  render() {
    const { toggle, deleteItem, id, itemTitle, isChose } = this.props
    return (
      //三元判断 选中的样式
      <div
        className={isChose ? 'listItem-isChose' : 'listItem'}
        onMouseOver={this.mouseOve} //移入
        onMouseOut={this.mouseOut} //移出
      >
        <div>
          <input
            type="checkbox"
            // onChange={this.toggle.bind(this)}
            //isChose 是true 选中 不是true 不选中
            onChange={() => toggle(id)}
            // checked={this.props.isChose ? true : false}
            checked={isChose}
          />
          <span> {itemTitle} </span>
          {/* <button onClick={this.delete.bind(this)} style={{ display: this.state.isShow ? '' : 'none' }}>
            删除
          </button> */}
          <button onClick={() => deleteItem(id)} style={{ display: this.state.isShow ? '' : 'none' }}>
            删除
          </button>
        </div>
      </div>
    )
  }
  //   //删除
  //   delete() {
  //     this.props.deleteItem()
  //   }
  //   //选中
  //   toggle() {
  //     this.props.change()
  //   }
}

export default ListItem

import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShow : false, //显示 隐藏
         }
    }
    mouseOve(){
        this.setState({
            isShow : true
        })
    }
    mouseOut(){
        this.setState({
            isShow : false
        })
    }
    render() { 
        return ( 
            //三元判断 选中的样式 
            <div className={this.props.isChose?'listItem-isChose':'listItem'}
            onMouseOver = {this.mouseOve.bind(this)} //移入  
            onMouseOut = {this.mouseOut.bind(this)}  //移出
            >
                <div>
                    <input
                    type = 'checkbox'
                    onChange = {this.toggle.bind(this)}
                    //isChose 是true 选中 不是true 不选中
                    checked={this.props.isChose ? true:false}
                    />
                    <span> {this.props.itemTitle} </span>                
                    <button 
                    onClick = {this.delete.bind(this)}
                    style={{display : this.state.isShow ? '':'none'}} >删除</button>
                </div>
            </div>
         );
    }
    //删除
    delete(){
       this.props.deleteItem()
    }
    //选中
    toggle(){
       this.props.change()
    }
}
 
export default ListItem;
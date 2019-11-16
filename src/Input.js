import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputValue : ''
         }
    }
    render() { 
        return ( 
            <div>
                <button>全选</button>
                <input 
                ref = {(input)=>{this.input=input}} //ref = { (绑定的元素)=>{赋值}}
                onChange={this.inputChange.bind(this)}//监听输入框的内容
                onKeyUp = {this.addList.bind(this)}
                placeholder='why be to' />
            </div>
         );
    }
    //监听
    inputChange(){
        this.setState({
            inputValue : this.input.value
        })
    }
}
 
export default Input;
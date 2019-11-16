import React, { Component } from 'react';

// import Input from './Input'
import ListItem from './ListItem'
import Footer from './Footer'

import './style.css'
class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items:[], //列表数据
            inputValue:'', //input 监听 
            isAllchecked : false, //全选
            lenth : 0 ,//任务数量
         }
    }
    render() { 
        return ( 
           <div className="index">
               <div>Todos</div>
               <div>
                <button
                onClick={this.clickText.bind(this)}
                >全选</button>
                <input 
                ref = {(input)=>{this.input=input}} //ref = { (绑定的元素)=>{赋值}}
                onChange={this.inputChange.bind(this)}//监听输入框的内容
                onKeyUp = {this.addList.bind(this)}
                placeholder='why be to' />
            </div>
            {
                this.state.items.map((item,index)=>{
                    return(
                        <ListItem
                        itemTitle = {item.title} //标题
                        index = {index} //下标
                        isChose ={item.isChose} //状态
                        key={ item+index} //key
                        change = {this.toggle.bind(this,item)}
                        deleteItem = {this.deleteItem.bind(this,index)}//删除方法
                        
                        ></ListItem>
                    )                 
                })
            }        
               <Footer
               lenth ={this.state.lenth}
                itemLeth = {this.state.items.length}
                deleteItem = {this.deleteItem.bind(this)}
                items = {this.state.items}
                clearCompleted ={this.clearCompleted.bind(this,JSON.parse(localStorage.items))}
                taBav = {this.tab.bind(this)}
               ></Footer>
           </div>
         );
    }
    //监听
    inputChange(){
        this.setState({
            inputValue : this.input.value
        })
    }
     //增加
     addList(e){
        if(this.input.value!==''){
            if(e.keyCode===13){
                let list = [...this.state.items]
                list.push({title:this.state.inputValue,isChose:false}) //****
            //    console.log(list)
                this.setState({
                    items : list,
                    lenth : this.state.lenth+1
                },()=>{
                    localStorage.setItem('items',JSON.stringify(this.state.items)) //存本地
                    console.log('存储本地了')   //localStorage(key,value) value 必须是字符串
                    console.log(localStorage)  
                    console.log(JSON.parse(localStorage.items))             
                })
                this.input.value = ''
            }  
        }
    }
    //删除
    deleteItem(index){
        let items = this.state.items
        items.splice(index,1)
        this.setState({
            items : items
        })
        localStorage.setItem('items',JSON.stringify(this.state.items))
    }
    //选中 
    toggle(item){
        item.isChose = !item.isChose
        let lenth = this.state.lenth + (item.isChose ? -1 : 1)
        this.setState({
            items : this.state.items,
            lenth : lenth
        })
        localStorage.setItem('items',JSON.stringify(this.state.items))
    }
    //全选
    clickText(){
        let items = this.state.items 
        this.setState({
            isAllchecked : !this.state.isAllchecked //点击改变状态
        },()=>{
            items.forEach((item)=>{ //循环 每个itemsList 的isChose = isAllchecked 的状态
                item.isChose = this.state.isAllchecked
            })
            this.setState({
                 items : items //重新渲染一下数据
            })
        })
        localStorage.setItem('items',JSON.stringify(this.state.items))
    }
    //切换
    tab(current){
        this.setState({
            current : current
        },()=>{
            let list = JSON.parse(localStorage.items)
            if(current===0){
                console.log('全部显示')
                this.setState({
                    items : list
                })
            }else if(current===1){
               console.log('显示未完成')
               let todos = []
               list.forEach((item)=>{
                if(item.isChose===false){
                    todos.push(item)
                }
            })
            this.setState({items : todos})
            }else if(current===2){
               console.log('显示完成')
               let todos1 = []
               list.forEach((item)=>{
                if(item.isChose===true){
                    todos1.push(item)
                }
            })
            this.setState({items : todos1})
            }
        }) 
   }
    //清空 
    clearCompleted(item){
        let todos =[]
        item.forEach((item)=>{
                if(!item.isChose){
                   todos.push(item)
                }     
        })
        this.setState({
            items : todos
        })
        localStorage.setItem('items',JSON.stringify(this.state.items))
   }
}
 
export default Todos
;

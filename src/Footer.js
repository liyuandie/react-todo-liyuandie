import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            tab : ['All','Active','Completed'],
            current : 0, //控制切换判断
            show : false
         }
    }
    render() { 
        return ( 
            //style={{display:this.props.itemLeth>0?'flex':'none'}}
            <div className="footer">
                <div className="Number"> {this.props.itemLeth} 
                 {this.props.items%2===0 && this.props.items>1?'items': 'item'} left</div>
                    <div className="tabBav">
                        {
                            this.state.tab.map((item,index)=>{
                                return(
                                     <div
                                    key={item+index}
                                    onClick={this.tab.bind(this,index)}
                                    className = {this.state.current === index ? 'active':''}
                                    > {item} </div>
                                )
                            })
                        }
                    </div>
                        <button
                        onClick = {this.clear.bind(this)}
                        >clear Completed</button>
                    </div>
         );
    }
     //切换
     tab(current){
        this.setState({
            current : current
        },()=>{
            this.props.taBav(current)
        })
        
    }
    //清空选中
    clear(){
         this.props.clearCompleted()
    }
}
 
export default Footer;
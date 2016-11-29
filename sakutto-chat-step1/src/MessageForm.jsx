import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-onsenui';
import * as fb from './fb';

export default class MessageForm extends React.Component {

  render() {
    //TODO:CSSを外出しする
    var formStyle = { width:"100%", height:"60px", backgroundColor:"lemonchiffon", zIndex:"10"};
    var inputStyle = {borderRadius:"5px", width:"70%", marginLeft:"2%", marginRight:"2%", height:"30px", marginTop:"12px", fontSize:"26px", backgroundColor:"white", color:"black"};
    var buttonStyle = {verticalAlign:"top", height:"40px", marginTop:"12px"};

    return (
      <div id="message-form" style={formStyle}>
        <input type="text" ref="message"  style={inputStyle}/>

        <Button style={buttonStyle} onClick={(e) => {
              //テキストボックスから入力値を取得
              const contents = ReactDOM.findDOMNode(this.refs.message).value.trim();
              if(contents != "") {
                //テキストボックスが空でなければ、メッセージを登録
                fb.sendMessage({contents:contents});
                //メッセージを登録したらテキストボックスは空にする
                ReactDOM.findDOMNode(this.refs.message).value = "";
              }
            }}>送信</Button><br/>
      </div>
    );
  }
}

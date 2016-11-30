import React from 'react';
import ReactDOM from 'react-dom';

export default class Message extends React.Component {

  render() {
    //親コンポーネントで属性として指定されたあたいはthis.propsで受け取ることができる
    var  message = this.props.message;
    var  self = this.props.self;

    //TODO:CSSを外出しする
    var messageStyle = {display:"table", width:"100%"};
    var column1Style = {display:"table-cell", width:"16%"};
    var column2Style = {display:"table-cell", position:"relative",  width:"68%", verticalAlign:"top"};
    var column3Style = {display:"table-cell", width:"16%"};
    var photoStyleOther = {borderRadius:"25%", width:"80%", marginTop:"10px", marginLeft:"10%", marginRight:"10%"};
    var photoStyleSelf = {borderRadius:"25%", width:"80%", marginTop:"10px", marginLeft:"10%", marginRight:"10%"};
    var contentsStyle = {display:"inline-block", position:"relative", top:"-20px", width:"80%", padding:"10px", borderRadius:"10px" };
    var displayNameStyle = {fontSize:"11px ", color:"dodgerblue", marginTop:"3px", margin:"0", width:"100%"};
    var triangle;
    if(!self) {
      photoStyleSelf.display = "none";
      contentsStyle.backgroundColor = "#D9F0FF";
      contentsStyle.margin = "0% 10% 0% 0%";
    } else {
      photoStyleOther.display = "none";
      contentsStyle.backgroundColor = "#BCF5A9";
      contentsStyle.margin = "0% 0% 0% 10%";
      displayNameStyle.textAlign ="right";
    }

    //メッセージ（サムネ、ユーザ名、投稿内容）の表示
    return (
      <div style={messageStyle}>
        <div style={column1Style}>
          <img src={message.user.photoURL} style={photoStyleOther}/>
        </div>
        <div  style={column2Style}>
          <div style={displayNameStyle}>{message.user.displayName}</div>
          <br/>
          <span style={contentsStyle}>{message.contents}</span>
        </div>
        <div style={column3Style}>
          <img src={message.user.photoURL} style={photoStyleSelf}/>
        </div>
      </div>);
  }
}

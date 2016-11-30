import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar} from 'react-onsenui';
import * as fb from './fb';
import Message from './Message';
import MessageForm from './MessageForm';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    //コンストラクタでメッセージ一覧を初期化
    this.state = {messages:[]};
  }

  componentDidMount() {
    //メッセージの追加イベントをハンドリングしてstateで保持しているメッセージ一覧に投稿されたメッセージを追加
    fb.handleAddedMessage(function(message) {
      const messages = this.state.messages.concat();
      messages.push(message);
      this.setState({"messages": messages});
    }.bind(this));

    //iPhoneで入力フォームがスクロールされてしまう問題の対応
    document.getElementById('chat').parentNode.style.overflow = 'visible';

    ///////step2で追加 start /////////
    fb.handleChengedUser(function(user) {
      this.setState({"user": user});
    }.bind(this));
    ///////step2で追加 end /////////


  }

  componentDidUpdate() {
    //stateが更新されたら（メッセージが追加されたら）、一番下までスクロールする
    var node = document.getElementById('messages');
    node.scrollTop = node.scrollHeight;
  }


  render() {
    //TODO:CSSを外出しする
    var chatStyle = {width:"100%", height:"100%"};
    var messagesStyle = {overflow:"auto", width:"100%", height:"100%"};
    var marginStyle = {height:"60px"};

    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >
        <div id="chat" style={chatStyle}>
        {/* MessageFormタグでフォームを表示 */}
          <MessageForm key="form"/>

          <div id="messages" style={messagesStyle}>
          {/* メッセージの数分ループして、Messageタグでメッセージを表示*/}
          {this.state.messages.map((message) => {
              return (
                <Message key={message.mid} message={message} self={fb.isSelf(message.user.uid)}/>
              );
          })}
            <div style={marginStyle}></div>
          </div>

        </div>
      </Page>
    );
  }
}

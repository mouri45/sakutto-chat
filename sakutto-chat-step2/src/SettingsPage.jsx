import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar, Button} from 'react-onsenui';
import * as fb from './fb';


export default class SettingsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {user:fb.getUser()};
  }
  componentDidMount() {
    fb.handleChengedUser(function(user) {
      this.setState({"user": user});
    }.bind(this))
  }


  render() {
    //TODO:CSSを外出しする
    const pageStyle = {height:"100%"};
    const imageStyle = {width:"50%", marginTop:"20%", marginLeft:"25%", marginRight:"25%", borderRadius:"25%", borderColor:"dodgerblue", borderStyle:"solid", borderWidth:"1px"};
    const nameStyle = {textAlign:"center"};
    const buttonStyle = {textAlign:"center", marginTop:"10%"};

    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Title</div>
          </Toolbar>
        }
      >

        <div style={pageStyle}>
          <div>
            <img className="setting-thumbnail" src={this.state.user.photoURL} style={imageStyle}/>
          </div>
          <div style={nameStyle}>
            {this.state.user.displayName}
          </div>
          <div style={buttonStyle}>
            {(() => {
              if (this.state.user.signin) {
                return <Button onClick={()=>fb.logout()}>ログアウト</Button>;
              } else {
                return <Button onClick={()=>fb.login()}>Twitterでログイン</Button>
              }
            })()}
          </div>
          <div>
          </div>

        </div>

      </Page>
    );
  }
}

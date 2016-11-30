import firebase from 'firebase';

var config = {
  //ここに設定をコピー
};
firebase.initializeApp(config);

var defaultUser = {
  uid:"",
  displayName:"名無し",
  photoURL:"user.png",
  signin:false
};

var user = defaultUser;

export function getUser() {
  return user;
}

export function isSelf(uid) {
  if(uid != "" && getUser().uid == uid) {
    return true;
  }
  return false;
}

export function sendMessage(message) {
  message.user = getUser();
  //firebaseからメッセージを登録する時のKeyを取得
  var newPostKey = firebase.database().ref().child('messages').push().key;
  message.mid = newPostKey;
  //messagesの下にメッッセージを追加
  var updates = {};
  updates['/messages/' + newPostKey] = message;
  firebase.database().ref().update(updates);
}

export function handleAddedMessage(callback) {
  //messagesのリファレンスを取得
  var commentsRef = firebase.database().ref('messages').limitToLast(100);
  //メッセージが追加されたら呼び出されるコールバック関数を設定
  commentsRef.on('child_added', function(data) {
    callback(data.val());
  });
}

///////step2のコードをstep3で書き換え/////////
var provider = new firebase.auth.TwitterAuthProvider();
var ref = null;

export function login() {
  //Webかスマホアプリかで処理を分岐
  if(typeof cordova==="undefined"){
    firebase.auth().signInWithRedirect(provider);
  }else{
    ref = window.open('https://{ここをプロジェクト名に置き換え}.firebaseapp.com/login.html?t=' + new Date().getTime(), '_blank', 'location=yes');
    ref.addEventListener('loadstart', handleLoadStart);
  }
}

function handleLoadStart(event) {
    var params = getUrlVars(event.url);
    if(event.url.indexOf("close.html") > -1) {
      if(params["uid"]) {
        ref.removeEventListener('loadstart', handleLoadStart);
        ref.close();
        ref = null;
        user = {
          uid:params["uid"],
          displayName:decodeURI(params["displayName"]),
          photoURL:"https://" + params["photoURL"].substring("http://".length),
          signin:true
        }
        applyChangedUserCallbacks.forEach(function(callback) {
          callback(getUser());
        });
      }
    }
}
function getUrlVars(url) {
  var vars = [], max = 0, hash = "", array = "";
  hash  = url.split('?')[1].split('&');
  max = hash.length;
  for (var i = 0; i < max; i++) {
    array = hash[i].split('=');
    vars.push(array[0]);
    vars[array[0]] = array[1];
  }
  return vars;
}



if(typeof cordova==="undefined"){
  //この処理はWeb用なのでスマホアプリ上では実行しない
  firebase.auth().getRedirectResult().then(function(result) {
    console.log("login");
    if(result.user) {
      user = {
        uid:result.user.uid,
        displayName:result.user.displayName,
        photoURL:"https://" + result.user.photoURL.substring("http://".length),
        signin:true
      }
      applyChangedUserCallbacks.forEach(function(callback) {
        callback(getUser());
      });
    }
  }).catch(function(error) {
    console.log(error);
    alert("ログインに失敗しました:" + error.message);
  });
}

export function logout() {
  console.log("logout");
  user = defaultUser;
  applyChangedUserCallbacks.forEach(function(callback) {
    callback(getUser());
  });
  firebase.auth().signOut().then(function() {
    console.log("logout success");
  }, function(error) {
    console.log("logout error");
  });
}

var applyChangedUserCallbacks = [];
export function handleChengedUser(callback) {
  applyChangedUserCallbacks.push(callback);
}

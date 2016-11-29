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

var Clay = require('@rebble/clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);

function getSettings() {
  var raw = localStorage.getItem('clay-settings');
  var s = raw ? JSON.parse(raw) : {};
  return {
    backend: s.backend || 'ntfy',
    serverUrl: (s.serverUrl || 'https://ntfy.sh').replace(/\/+$/, ''),
    topic: s.topic || '',
    pushoverToken: s.pushoverToken || '',
    pushoverUser: s.pushoverUser || '',
    pushoverPriority: s.pushoverPriority || '1'
  };
}

function sendNtfy(s) {
  if (!s.topic) {
    console.log('No ntfy topic configured. Open app settings.');
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', s.serverUrl + '/' + s.topic);
  xhr.setRequestHeader('Title', 'Find Phone');
  xhr.setRequestHeader('Tags', 'phone');
  xhr.onload = function() { console.log('ntfy POST status: ' + xhr.status); };
  xhr.onerror = function() { console.log('ntfy POST failed'); };
  xhr.send('Find my phone!');
}

function sendPushover(s) {
  if (!s.pushoverToken || !s.pushoverUser) {
    console.log('Pushover token/user not configured. Open app settings.');
    return;
  }
  var params =
    'token=' + encodeURIComponent(s.pushoverToken) +
    '&user=' + encodeURIComponent(s.pushoverUser) +
    '&title=' + encodeURIComponent('Find Phone') +
    '&message=' + encodeURIComponent('Find my phone!') +
    '&priority=' + encodeURIComponent(s.pushoverPriority);
  if (s.pushoverPriority === '2') {
    params += '&retry=30&expire=300';
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.pushover.net/1/messages.json');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() { console.log('Pushover POST status: ' + xhr.status + ' ' + xhr.responseText); };
  xhr.onerror = function() { console.log('Pushover POST failed'); };
  xhr.send(params);
}

function findPhone() {
  var s = getSettings();
  if (s.backend === 'pushover') {
    sendPushover(s);
  } else {
    sendNtfy(s);
  }
}

Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready');
});

Pebble.addEventListener('appmessage', function(e) {
  if (e.payload && e.payload.FIND_PHONE) {
    findPhone();
  }
});

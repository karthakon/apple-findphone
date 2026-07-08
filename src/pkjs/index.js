var Clay = require('@rebble/clay');
var clayConfig = require('./config');
var clay = new Clay(clayConfig);

function getSettings() {
  var raw = localStorage.getItem('clay-settings');
  var settings = raw ? JSON.parse(raw) : {};
  return {
    serverUrl: (settings.serverUrl || 'https://ntfy.sh').replace(/\/+$/, ''),
    topic: settings.topic || '',
    priority: settings.priority || 'urgent'
  };
}

function findPhone() {
  var s = getSettings();
  if (!s.topic) {
    console.log('No ntfy topic configured. Open app settings.');
    return;
  }
  var url = s.serverUrl + '/' + s.topic;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Title', 'Find Phone');
  xhr.setRequestHeader('Priority', s.priority);
  xhr.setRequestHeader('Tags', 'phone');
  xhr.onload = function() {
    console.log('ntfy POST status: ' + xhr.status);
  };
  xhr.onerror = function() {
    console.log('ntfy POST failed');
  };
  xhr.send('Find my phone!');
}

Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready');
});

Pebble.addEventListener('appmessage', function(e) {
  if (e.payload && e.payload.FIND_PHONE) {
    findPhone();
  }
});

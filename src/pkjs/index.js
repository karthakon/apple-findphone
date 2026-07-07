Pebble.addEventListener('ready', function() {
  console.log('PebbleKit JS ready');
});

Pebble.addEventListener('appmessage', function(e) {
  var shortcutName = e.payload[0];
  if (shortcutName) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://ntfy.sh/pebble-shortcuts-karthakon');
    xhr.setRequestHeader('Title', 'Find Phone');
    xhr.setRequestHeader('Priority', 'urgent');
    xhr.setRequestHeader('Tags', 'phone');
    xhr.setRequestHeader('Sound', 'alarm');
    xhr.send('Find my phone!');
  }
});
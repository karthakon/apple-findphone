# apple-findphone

A Pebble watchapp that pings your iPhone so you can find it when it's nearby
but out of sight. Open the app, select **Find Phone**, and your phone raises a
notification with a tone.

Built for the Pebble Time 2 (obelix/emery) and works on other Pebble models.

## How it works

1. Menu selection on the watch → `AppMessage` → PebbleKit JS (running inside the
   Pebble app on your iPhone).
2. PKJS sends an HTTP POST to an [ntfy.sh](https://ntfy.sh) topic.
3. The [ntfy](https://ntfy.sh) iOS app, subscribed to that topic, raises a
   notification and plays a tone.

## Requirements

- A Pebble watch on compatible firmware.
- The Pebble app on your iPhone.
- The [ntfy](https://ntfy.sh) iOS app.

## Setup

1. **Pick a topic name.** Choose something unguessable, e.g.
   `findphone-<random>`. Anyone who knows the topic can send you notifications.
2. **Set the topic in the code.** Open `src/pkjs/index.js` and change the ntfy
   URL to your topic:
```js
   xhr.open('POST', 'https://ntfy.sh/YOUR-TOPIC-HERE');
```
3. **Subscribe in the ntfy iOS app.** Open ntfy → **+** → enter the same topic
   name → Subscribe.
4. **Install the watchapp** and select **Find Phone** to test. Your phone should
   notify.

## Notification details

The PKJS POST currently sets:

- `Title: Find Phone`
- `Priority: urgent`
- `Tags: phone`
- body: `Find my phone!`

## Building

Written in C. Built with CloudPebble (original) or the local Pebble SDK.

## License

TODO: choose a license.

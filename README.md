# apple-findphone

A Pebble watchapp that pings your iPhone so you can find it when it's nearby
but out of sight. Open the app, select **Find Phone**, and your phone raises a
notification with a tone.

Built for the Pebble Time 2 (obelix/emery) and works on other Pebble models.

## How it works

1. Menu selection on the watch → `AppMessage` → PebbleKit JS (running inside the
   Pebble app on your iPhone).
2. PKJS reads your saved server/topic settings and sends an HTTP POST to your
   [ntfy](https://ntfy.sh) topic.
3. The ntfy app on your iPhone, subscribed to that topic, raises a notification
   and plays a tone.

## Requirements

- A Pebble watch on compatible firmware.
- The Pebble app on your iPhone.
- The [ntfy](https://ntfy.sh) iOS app.

By default the app uses the public `https://ntfy.sh` server, so no server of
your own is needed to get started. You can point it at a self-hosted ntfy
instance in the settings screen if you prefer.

## Setup

1. **Pick a topic name.** Choose something unguessable, e.g.
   `findphone-yourname-8x3k`. On the public server, anyone who knows your topic
   can send you notifications, so make it hard to guess.
2. **Install the watchapp.**
3. **Open the settings screen.** In the Pebble iOS app, open this app's
   settings. Enter:
   - **Server URL** — leave as `https://ntfy.sh`, or enter your self-hosted
     server.
   - **Topic** — the topic you chose in step 1.
   - **Priority** — Urgent is recommended (see Custom sounds below).
   Tap **Save Settings**.
4. **Subscribe in the ntfy iOS app.** Open ntfy → **+** → enter the same topic
   (and server URL, if self-hosted) → Subscribe.
5. **Test.** Open the watchapp, select **Find Phone**. Your phone should notify.

## Custom notification sounds

iOS ntfy does **not** honor a `Sound` HTTP header — it is ignored. Your options:

- **Priority-based sounds (built-in).** ntfy maps notification priority to
  different iOS sounds; `urgent`/`max` is the most attention-grabbing. This app
  exposes Priority in settings. No extra setup, works on the public server.
- **Custom sounds via self-hosted ntfy.** A self-hosted ntfy server can be
  configured with custom notification sounds that the iOS app will play. Point
  the app's Server URL setting at your instance.
- **ntfy Pro.** The hosted paid tier also supports custom sounds without
  self-hosting.

## Building

Written in C with a PebbleKit JS component and a [Clay](https://github.com/pebble/clay)
settings screen. Build with the Pebble SDK or CloudPebble.

## License

Apache License 2.0. See [LICENSE](LICENSE).

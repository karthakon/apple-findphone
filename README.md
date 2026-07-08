# apple-findphone

A Pebble watchapp that pings your iPhone so you can find it when it's nearby
but out of sight. Open the app, select **Find Phone**, and your phone raises a
notification with a tone.

Built for the Pebble Time 2 (obelix/emery) and works on other Pebble models.

## How it works

1. Menu selection on the watch → `AppMessage` → PebbleKit JS (running inside the
   Pebble app on your iPhone).
2. PKJS reads your saved settings and sends an HTTP POST to your chosen backend.
3. The matching app on your iPhone raises a notification and plays a tone.

## Backends

Pick a backend in the app's settings screen.

- **ntfy** (default) — free, open source, self-hostable. Uses the public
  `https://ntfy.sh` by default; point it at your own instance in settings.
- **Pushover** — a paid, hosted service. Its main advantage on iOS is
  **Critical Alerts**, which bypass the silent switch and Do Not Disturb (see
  below).

## Requirements

- A Pebble watch on compatible firmware.
- The Pebble app on your iPhone.
- The app for your chosen backend: [ntfy](https://ntfy.sh) or
  [Pushover](https://pushover.net).

## Setup — ntfy

1. **Pick a topic name.** Choose something unguessable, e.g.
   `findphone-yourname-8x3k`. On the public server, anyone who knows your topic
   can send you notifications.
2. **Install the watchapp.**
3. **Settings screen** (in the Pebble iOS app): set **Backend** to `ntfy`,
   **Server URL** (default `https://ntfy.sh`), **Topic**, **Priority**. Save.
4. **Subscribe in the ntfy iOS app** to the same topic (and server, if
   self-hosted).
5. **Test:** open the watchapp → **Find Phone**.

## Setup — Pushover

1. **Create a Pushover account** and an Application to get an **API Token**.
   Your **User Key** is on your dashboard.
2. **Install the Pushover iOS app** and log in.
3. **Settings screen** (in the Pebble iOS app): set **Backend** to `pushover`,
   then enter **API Token**, **User Key**, a **Sound**, and **Priority**. Save.
4. **Test:** open the watchapp → **Find Phone**.

## The iOS silent switch

By default, none of these notifications play a sound when the hardware ring/silent
switch is set to silent — that's an iOS limitation, not an app bug. Bypassing it
requires **Critical Alerts**, an app-level Apple entitlement.

- **ntfy:** does not currently trigger Critical Alerts on iOS. Priority does not
  bypass the silent switch. (The entitlement is granted but not yet wired up
  upstream, so this may change.)
- **Pushover:** supports Critical Alerts. Enable **Critical Alerts for
  high-priority** in the Pushover iOS app settings (approve the iOS dialog),
  then use **High** or **Emergency** priority here. These bypass the silent
  switch and Do Not Disturb.

Emergency priority (Pushover) also requires acknowledgement and repeats; this app
sends `retry=30` and `expire=300` automatically for that level.

## Notification sounds

- **ntfy:** priority maps to different built-in iOS sounds. Custom sounds require
  a self-hosted ntfy server (configured server-side) or ntfy Pro.
- **Pushover:** choose from its built-in sounds via the **Sound** setting
  (e.g. `pushover`, `siren`, `spacealarm`, `none`).

## Building

Written in C with a PebbleKit JS component and a
[Clay](https://github.com/pebble/clay) settings screen (via `@rebble/clay` for
gabbro support). Build with the Pebble SDK or CloudPebble.

## License

Apache License 2.0. See [LICENSE](LICENSE).

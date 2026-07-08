module.exports = [
  {
    "type": "heading",
    "defaultValue": "Find Phone Settings"
  },
  {
    "type": "text",
    "defaultValue": "Choose a backend, then fill in that section below. Your phone app must be subscribed / configured to match."
  },
  {
    "type": "section",
    "items": [
      {
        "type": "select",
        "messageKey": "backend",
        "label": "Backend",
        "defaultValue": "ntfy",
        "options": [
          { "label": "ntfy", "value": "ntfy" },
          { "label": "Pushover", "value": "pushover" }
        ]
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "ntfy"
      },
      {
        "type": "input",
        "messageKey": "serverUrl",
        "label": "Server URL",
        "defaultValue": "https://ntfy.sh",
        "attributes": {
          "placeholder": "https://ntfy.sh",
          "type": "url"
        }
      },
      {
        "type": "input",
        "messageKey": "topic",
        "label": "Topic",
        "defaultValue": "",
        "attributes": {
          "placeholder": "findphone-yourname"
        }
      }
    ]
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "Pushover"
      },
      {
        "type": "text",
        "defaultValue": "For silent-switch bypass, enable Critical Alerts in the Pushover iOS app settings and use High priority. The alert sound is chosen in the Pushover app."
      },
      {
        "type": "input",
        "messageKey": "pushoverToken",
        "label": "API Token",
        "defaultValue": "",
        "attributes": {
          "placeholder": "app api token"
        }
      },
      {
        "type": "input",
        "messageKey": "pushoverUser",
        "label": "User Key",
        "defaultValue": "",
        "attributes": {
          "placeholder": "user key"
        }
      },
      {
        "type": "select",
        "messageKey": "pushoverPriority",
        "label": "Priority",
        "defaultValue": "1",
        "options": [
          { "label": "Emergency", "value": "2" },
          { "label": "High", "value": "1" },
          { "label": "Normal", "value": "0" }
        ]
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];

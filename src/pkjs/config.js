module.exports = [
  {
    "type": "heading",
    "defaultValue": "Find Phone Settings"
  },
  {
    "type": "text",
    "defaultValue": "Configure your ntfy server and topic. The ntfy app on your phone must be subscribed to the same topic."
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "defaultValue": "ntfy Server"
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
      },
      {
        "type": "select",
        "messageKey": "priority",
        "label": "Priority",
        "defaultValue": "urgent",
        "options": [
          { "label": "Max", "value": "max" },
          { "label": "Urgent", "value": "urgent" },
          { "label": "High", "value": "high" },
          { "label": "Default", "value": "default" }
        ]
      }
    ]
  },
  {
    "type": "submit",
    "defaultValue": "Save Settings"
  }
];

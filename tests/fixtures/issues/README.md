Sentry integrations that have subscribed to issue webhooks can receive information about an issue being created and changing state.

## Sentry-Hook-Resource Header

`'Sentry-Hook-Resource': 'issue'`

## Attributes

### action

- type: string
- description: can be `created`, `resolved`, `assigned`, `archived`, or `unresolved`

### data['issue']

- type: object
- description: the issue

### data['issue']['url']

- type: string
- description: the api url for the issue

### data['issue']['web_url']

- type: string
- description: the web url for the issue

### data['issue']['project_url']

- type: string
- description: the api url to the project the issue is a part of

## Payload

Payload includes additional information about the issue. Some important fields to pay attention to are:

### status
Some issue webhooks are triggered on status change of an issue. An issue status can be `resolved`, `unresolved`, or `ignored` (archived).

### substatus
A status can mean multiple things, so substatus gives more details about the status. For example, an issue status can change to `unresolved` because it is now `escalating` or because a resolved issue is `regressed`. Possible substatuses are: `archived_until_escalating`, `archived_until_condition_met`, `archived_forever`, `escalating`, `ongoing`, `regressed` and `new`.

### statusDetails
`statusDetails` includes more detailed information about `resolved` and `archived` status changes on an issue. These details can include:
* `inRelease`: The release that the resolution is in (for example, `latest`)
* `inNextRelease`: `True` if the resolution will be in the next release
* `inCommit`: Includes information about the resolution commit (such as `repository` and `commit`)
* `ignoreCount`: Maximum number of occurences in for an archived issue before it gets escalated
* `ignoreWindow`: Used with `ignoreCount` indicating the number of minutes that `ignoreCount` occurences will be ignored
* `ignoreUserCount`: Maximun number of users who are affected by an archived issue before it gets escalated
* `ignoreUserWindow`: Used with `ignoreUserCount` indicating the number of minutes that `ignoreUserCount` affected users will be ignored
* `ignoreDuration`: The duration (in minutes) that an archived issue should be ignored before it gets escalated. Increase in the number of users affected or the number of occurences will not escalate before this duration has passed unless there is a spike. To learn more about how this works, see [Escalating Issues Algorithm](https://docs.sentry.io/product/issues/states-triage/escalating-issues/).

```json
{
  "action": "created",
  "actor": {
    "id": "sentry",
    "name": "Sentry",
    "type": "application"
  },
  "data": {
    "issue": {
      "annotations": [],
      "assignedTo": null,
      "count": "1",
      "culprit": "?(runner)",
      "firstSeen": "2019-08-19T20:58:37.391000Z",
      "hasSeen": false,
      "id": "1170820242",
      "isBookmarked": false,
      "isPublic": false,
      "isSubscribed": false,
      "lastSeen": "2019-08-19T20:58:37.391000Z",
      "level": "error",
      "logger": null,
      "metadata": {
        "filename": "/runner",
        "type": "ReferenceError",
        "value": "blooopy is not defined"
      },
      "numComments": 0,
      "permalink": null,
      "platform": "javascript",
      "project": {
        "id": "1",
        "name": "front-end",
        "platform": "",
        "slug": "front-end"
      },
      "shareId": null,
      "shortId": "FRONT-END-9",
      "status": "unresolved",
      "statusDetails": {},
      "subscriptionDetails": null,
      "substatus": "escalating",
      "title": "ReferenceError: blooopy is not defined",
      "type": "error",
      "userCount": 1
    }
  },
  "installation": {
    "uuid": "a8e5d37a-696c-4c54-adb5-b3f28d64c7de"
  }
}
```

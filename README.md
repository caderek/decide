# Decide

## Todo

```javascript
{
  uuid,
  title,
  description,
  tags,
}
```

## Event

```javascript
{
  type,
  payload,
  timestamp,
}
```

### Bootstraping the app

#### Events interpreter

Will interprate all events from store

`interprete(event): action`

`handler(state, action): newState`

### state

```javascript
{
  todos: {
    uuid,
    timestamp,
    title,
    description,
    tags,
    creatorId,
    lastTimestamp,
  },
  priorities: {
    todoId,
    userId,
    lastTimestamp,
  },
  comments: {
    uuid,
    lastTimestamp,
    content,
  },
  notifications: {
    uuid,
    type,
    payload,
  }
  users: {
    uuid,
    name,
  },
  auth: {
    userId,
    token,
  }
}
```

* Snapshot will be added later.
* Better authentication will be added later.
* Average will be calculated inside frontend components.
* State will by syncronized between client and server??

#### Events adding

module: events

`addEvent(event): promise -> status`

`bootstrapApp(storePath, initialState, availableActions): state`

### Acions

State diff betwen client and server??
(separate entities for frontend specific details)

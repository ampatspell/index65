# index65

Ember.js & Firebase.

Reimplementation of [CouchDB-based index65](https://bitbucket.org/ampatspell/index65/src/default/
).

## Schema

```
/users/{uid}
  email: string
  displayName: string
  created_at: date
  roles: Array<String>

/sources/{source}
  name: string

  /collections/{collection}
    name: string

    /groups/{group}
      identifier: number

        /images/{image}
          identifier: number
```

```
/images/{source}/{collection}/{group}/{image}
  * original
  * 1024x1024 (jpeg)
  * 200x200 (jpeg)
```

## Setup

* https://console.cloud.google.com/iam-admin/iam
* <app-id>@appspot.gserviceaccount.com → Edit
* Add "Service Account Token Creator" role

## TODO

* Cache-Control, ... headers for images

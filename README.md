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

## Batch upload

* select source and collection
* choose files:

```
valdis-1-1.jpg
valdis-1-2.jpg
```

* parse group and image numbers

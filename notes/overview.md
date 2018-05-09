* user (users/{uid})
* source (sources/{source})
* collection (sources/{source}/collections/{collection})
* group (sources/{source}/collections/{collection}/groups/{group})

``` javascript
let state = app.lookup('service:state');
```

``` javascript
let user = state.user;
user.isAdmin
user.email
```

``` javascript
let sources = state.sources; // model
sources.docs // [ doc, doc ]
```

``` javascript
let collections = source.collections(); // model
collections.docs // [ doc, doc ]
```

``` javascript
let collection = state.collection(doc); // model

```
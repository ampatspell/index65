# index65

Ember.js & Firebase.

Reimplementation of [CouchDB-based index65](https://bitbucket.org/ampatspell/index65/src/default/
).

![](https://raw.githubusercontent.com/ampatspell/index65/master/docs/screenshot-2.png)

![](https://raw.githubusercontent.com/ampatspell/index65/master/docs/screenshot-1.png)

## Installation

### Firebase

* Create a firebase project
* Enable Storage
* Enable Firestore in Database section
* Authentication → Sign-in Method → Enable Email/Password
* Project Settings → Users and Permissions → Advanced permission settings
  * Click edit on `<app-id>@appspot.gserviceaccount.com`
  * Add another role
  * Find "Service account token creator"
  * Save

### Configuration

* Copy `config-example.js` as `config.js`
* Go to Firebase console and select Project Overview → "Add Firebase to your webapp", copy config.
* Paste it in your `config.js` the same way it is done in `config-example.js`
* Delete `messagingSenderId`

### Firebase & Ember

Install app dependencies

```
$ npm install
```

Install firebase functions dependencies

```
$ cd firebase/functions
$ npm install
```

Select your firebase project

```
$ firebase use --add
```

Build ember app and deploy it along with firebase functions, security rules.

```
npm run deploy
```

> Sometimes Firebase Coud Functions deployment fails on the first attempt when APIs are not yet enabled:

> ⚠  functions: missing necessary APIs. Enabling now...

> Just try again

### Sign-up

* Open `https://<app-id>.firebaseapp.com/session/sign-up`
* Email, password, sign-up

By default none of the signed up users are allowed to access anything in the app.

### Make yourself an admin

* Open Firebase Console → Database → users → uid
* Add "admin" in roles array
* Go back to the index65, you should be an admin now.

And you're done.

## Content

TODO

## Notes

### Schema

```
/users/{uid}
  email: string
  displayName: string
  createdAt: date
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

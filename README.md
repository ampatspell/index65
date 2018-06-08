# index65

Scanned negatives publishing app.

> [Ember.js](https://emberjs.com/) & [Firebase](https://firebase.google.com/) using [ember-cli-zuglet](https://github.com/ampatspell/ember-cli-zuglet). A reimplementation of my [CouchDB-based index65](https://bitbucket.org/ampatspell/index65/src/default/).

> [Demo site](https://index65-dev.firebaseapp.com) Use `zeeba@gmail.com` / `hello-world` to sign-in (read-only member)

![](https://raw.githubusercontent.com/ampatspell/index65/master/docs/screenshot-2.png)

![](https://raw.githubusercontent.com/ampatspell/index65/master/docs/screenshot-1.png)

## Installation

### Firebase

* Create a firebase project
* Enable Storage
* Enable Firestore in Database section
* Authentication → Sign-in Method → Enable Email/Password

### Configuration

* Copy `config-example.js` as `config.js`
* Go to Firebase console and select Project Overview → "Add Firebase to your webapp", copy config.
* Paste it in your `config.js` `production` object, the same way it is done in `config-example.js`
* Delete `messagingSenderId`

### Firebase & Ember

Install [Node.js](https://nodejs.org/en/) (LTS or Latest, doesn't matter, both works just fine).

Install app dependencies:

```
$ npm install
```

Install firebase functions dependencies:

```
$ cd firebase/functions
$ npm install
```

Install firebase cli:

```
$ npm install -g firebase-tools
```

Select your firebase project:

```
$ firebase use --add
```

Build ember app and deploy it along with firebase functions, security rules:

```
npm run deploy
```

### Sign-up

* Open `https://<app-id>.firebaseapp.com/session/sign-up`
* Email, password, sign-up

By default none of the signed up users are allowed to access anything in the app.

### Make yourself an admin

* Open Firebase Console → Database → users → uid
* Add "admin" in roles array
* Go back to the index65, you should be an admin now.

And you're done.

### Connect domain (optional)

* In Firebase Console select Hosting
* Connect Domain
* Follow the steps

### Add billing (optional)

* In Firebase console bottom left there is "Spark" and "Upgrade"
* Click
* Select "Blaze", Purchase

To set daily spending limit:

* Open Google AppEngine Settings: `https://console.cloud.google.com/appengine/settings`
* Select your Firebase project
* Under application settings, click "Edit"
* Set daily spending (0 or more)

## Content

* login as admin
* add source
* add collection
* upload pictures

Pictures has the following expected file name format:

```
prefix-<group_id>-<image_id>.jpg

valdis-001-001.jpg
valdis-001-002.jpg
valdis-001-003.jpg
...
valdis-130-036.jpg
valdis-130-037.jpg
```

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
          storage: {
            original: {
              size : {
                width: number
                height: number
              }
              url: string
            },
            200x200: {
              size: {
                width: number,
                height: number
              },
              url: string
            }
            1024x1024: {
              size: {
                width: number,
                height: number
              },
              url: string
            }
          }
```

```
/images/{source}/{collection}/{group}/{image}
  * original
  * 1024 (jpeg)
  * 200 (jpeg)
```

## TODO

* Group description, year, picture
* Allow selected members to edit selected sources
* Allow members to edit their `displayName`
* Delete group with images
* Delete collection including groups
* Delete source including all nested docs

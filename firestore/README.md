# Schema

* source (valdis, ilze, ...)
* groups (negatives, diapositives, ...)
* collections (1 negative roll, 1 diapositive box)
* image

`sources/valdis/groups/negatives/collections/100/images/10`

``` javascript
// sources/valdis
// source
{
  name: 'Valdis',
  editors: [ 'indra' ]
}
```

``` javascript
// source/valdis/groups/negatives
// group
{
  name: 'Negatives',
  type: '35mm-film'
}
```

``` javascript
// sources/valdis/groups/negatives/collections/100
// collection
{
  identifier: 100
}
```

``` javascript
// sources/valdis/groups/negatives/collections/100/images/10
// image
{
  identifier: 10,
  urls: {
    'original': 'http://..',
    'x1024': 'http://..'
  }
}
```

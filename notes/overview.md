* nested route models has parent models as props

``` javascript
// sources/source/collections/collection/index
export default Model.extend({

  sources: null,
  source: null,
  collections: null,
  collection: null,

});
```

* mixin overrides model hook, forwards params and stuff to model. OR route does all the init

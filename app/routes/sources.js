import Route from '@ember/routing/route';
import Secured from './-secured';
import Model, { load } from 'models/mixins/route';

export default Route.extend(Secured, Model, {

  require: 'member',

  model: load({
    didCreate(route) {
      this.sources = this.store.collection('sources').orderBy('name').query({ type: 'array' });
      this.observe(this.sources, true);
    }
  })

});

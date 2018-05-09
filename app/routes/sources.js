import Route from '@ember/routing/route';
import Secured from 'index65/mixins/route/secured';

export default Route.extend(Secured, {

  require: 'member',

  model() {
    return this.store.collection('sources');
  }

});

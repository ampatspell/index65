import Route from '@ember/routing/route';
import Secured from 'index65/mixins/route/secured';
import Model from 'index65/mixins/route/model';

export default Route.extend(Secured, Model, {

  require: 'member',

  model() {
    return this.load('route/sources');
  }

});

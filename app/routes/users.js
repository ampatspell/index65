import Route from '@ember/routing/route';
import Secured from './-secured';
import Model, { load } from 'models/mixins/route';
import Breadcrumb from 'index65/routes/-breadcrumb';

export default Route.extend(Secured, Breadcrumb, Model, {

  require: 'admin',

  model: load({
    type: 'users'
  })

});

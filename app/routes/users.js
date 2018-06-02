import Route from '@ember/routing/route';
import Secured from './-secured';
import Breadcrumb from 'index65/routes/-breadcrumb';
import { inline } from 'ember-cli-zuglet/experimental/route';

export default Route.extend(Secured, Breadcrumb, {

  require: 'admin',

  model: inline({

    type: 'users'

  })

});

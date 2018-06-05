import Route from '@ember/routing/route';
import Secured from './-secured';
import Breadcrumb from 'index65/routes/-breadcrumb';
import model from 'ember-cli-zuglet/experimental/model/route';

export default Route.extend(Secured, Breadcrumb, {

  require: 'admin',

  model: model({

    type: 'users'

  })

});

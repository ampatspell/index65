import Route from '@ember/routing/route';
import Secured from '../-secured';

export default Route.extend(Secured, {

  require: 'logged-in'

});

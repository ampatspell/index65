import Route from '@ember/routing/route';
import SecuredMixin from '../mixins/route/secured';

export default Route.extend(SecuredMixin, {

  require: 'member',
  loginRouteName: 'session.new',

  requireMapping: {
    'login':     'session.new',
    'denied':    'session.denied',
    'logged-in': 'session'
  },

});

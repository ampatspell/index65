import Mixin from '@ember/object/mixin';
import SecuredBase from 'requirements/mixin';

export default Mixin.create(SecuredBase, {

  require: 'member',
  loginRouteName: 'session.new',

  requireMapping: {
    'login':     'session.new',
    'denied':    'session.denied',
    'logged-in': 'session'
  }

});
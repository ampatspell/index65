import Mixin from '@ember/object/mixin';
import Secured from './-secured';

export default Mixin.create(Secured, {

  require: 'admin'

});

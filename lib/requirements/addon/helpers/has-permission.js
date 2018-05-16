import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default Helper.extend({

  requirements: service(),

  compute(params) {
    let [ name, model ] = params;
    let result = this.requirements.validate(name, model);
    if(result) {
      assert(`requirement ${name} can't be async`, !result.then);
    }
    return result === null;
  }

});

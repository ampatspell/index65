import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export default Service.extend({

  create(name, props) {
    let fullName = `model:${name}`;
    let factory = getOwner(this).factoryFor(fullName);
    assert(`${fullName} is not registered`, !!factory);
    return factory.create(props);
  }

});

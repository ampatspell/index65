import Component from '@ember/component';

export default Component.extend({

  actions: {
    group(doc) {
      console.log(doc+'');
    }
  }

});

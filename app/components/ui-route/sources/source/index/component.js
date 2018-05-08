import Component from '@ember/component';

export default Component.extend({

  actions: {
    collection(doc) {
      console.log(doc+'');
    }
  }

});

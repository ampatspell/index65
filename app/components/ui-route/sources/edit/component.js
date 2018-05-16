import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  model: model({
    name: 'source/edit',
    props() {
      let doc = this.source;
      return { doc };
    }
  }),

  actions: {
    async save() {
      let id = await this.model.save();
      this.router.transitionTo('sources.source', id);
    }
  }

});

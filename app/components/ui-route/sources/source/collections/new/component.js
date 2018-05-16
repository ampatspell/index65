import Component from '@ember/component';
import { model } from 'index65/util/model';

export default Component.extend({

  model: model({
    name: 'collection/new',
    props() {
      let { source } = this;
      return { source };
    }
  }),

  actions: {
    async save() {
      let id = await this.model.save();
      this.router.transitionTo('sources.source.collections.collection', id);
    }
  }

});

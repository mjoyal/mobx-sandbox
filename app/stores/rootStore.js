import { types } from "mobx-state-tree";

import UserStore from './userStore.js';

const RootStore = types
  .model({
    name: types.string
  })
  .props({
    userStore: types.optional(UserStore, {})
  })
  .actions((self) => {
    return {
      afterCreate() {
        console.log('store created!')
      }
    };
  });

  export default RootStore; 

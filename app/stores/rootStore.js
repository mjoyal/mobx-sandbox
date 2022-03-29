import { types } from "mobx-state-tree";

const RootStore = types
  .model({
    name: types.string
  })
  .props({
  })
  .actions((self) => {
    return {
      afterCreate() {
        console.log('store created!')
      }
    };
  });

  export default RootStore; 

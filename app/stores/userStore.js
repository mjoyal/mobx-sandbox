import { types } from "mobx-state-tree";
import createGroup from '../api/index.js'

const UserModel = types.model('UserModel', {
    id: types.identifier, 
    name: types.string,
    email: types.string,
});

const UserStore = types.model('UserStore', {
    users: types.array(UserModel),
})
    .actions((self) => {
    return {
      afterCreate() {
         self.users.replace(createGroup(100));
      }
    };
  });

  export default UserStore; 
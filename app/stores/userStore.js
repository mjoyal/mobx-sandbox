import { types, applySnapshot, flow } from "mobx-state-tree";
import createGroup from '../api/index.js'

const UserModel = types.model('UserModel', {
    id: types.identifier, 
    name: types.string,
    email: types.string,
});

const UserStore = types.model('UserStore', {
    users: types.array(UserModel),
    currentUser: types.maybe(types.reference(UserModel)),
})
    .actions((self) => {
    return {

      afterCreate: flow(function* () {

        console.log('waiting....')
        const users =  yield createGroup(100000);
        
        self.users.replace(users);
        self.currentUser = self.randomUser;


        console.log('currentUser -->', self.currentUser.name)
        console.log('found user --->', self.findCurrentUser.name);
      }),

      reset () {
        applySnapshot(self, {});
      },
    };
  }).views((self) => {

    return {

      get findCurrentUser() {
        return self.users.find((user) => {
          return user.id === self.currentUser.id;
        })
      },

      get randomUser () {
        const randomIndex = Math.floor(Math.random() * 100);
        return self.users[randomIndex];
      }, 

    }
  });

  export default UserStore; 
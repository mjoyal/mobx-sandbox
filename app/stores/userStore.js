import { types, applySnapshot, flow } from "mobx-state-tree";
import { start } from "repl";
import createUser from '../api/index.js'

const UserModel = types.model('UserModel', {
    id: types.identifier, 
    name: types.string,
    email: types.string,
});

const UserStore = types.model('UserStore', {
    usersArray: types.array(UserModel),
    usersMap: types.map(UserModel),
    currentUser: types.maybe(types.reference(UserModel)),
})
    .actions((self) => {
    return {

      afterCreate: flow(function* () {
        self.reset();
        console.log('waiting....')
        
        self.addUsersToUsersArray(10);
        self.currentUser = self.randomUser;

        console.log('currentUser -->', self.currentUser.name)
        console.log('found user --->', self.findCurrentUserInArray.name);

      }),

      addUsersToUsersArray(amountOfUsers) {
        const startTime = new Date();

        for(let i = 0; i < amountOfUsers; i++) {
            const user = createUser();
            self.usersArray.push(user); 
        }

        const endTime = new Date ();

        const timeString = `${(endTime - startTime) / 1000} seconds`

        console.log(`time to add ${amountOfUsers} to array -->`, timeString);
        
      },

      reset () {
        applySnapshot(self, {});
      },
    };
  }).views((self) => {

    return {

      get findCurrentUserInArray() {
        const startTime = new Date();

        const foundUser = self.usersArray.find((user) => {
          return user.id === self.currentUser.id;
        })

        const endTime = new Date();
        const timeString = `${(endTime - startTime) / 1000} seconds`

        console.log(`time to find user in array with ${self.usersArray.length} items`, timeString);
        
        return foundUser;
      },

      get randomUser () {
        const randomIndex = Math.floor(Math.random() * self.usersArray.length);
        return self.usersArray[randomIndex];
      }, 

    }
  });

  export default UserStore; 
import { types, applySnapshot, flow } from "mobx-state-tree";
import createUser from '../api/index.js'

const UserArrayModel = types.model('UserModel', {
    id: types.identifier, 
    name: types.string,
    email: types.string,
});

const UserArrayStore = types.model('UserStore', {
    users: types.array(UserArrayModel),
    currentUser: types.maybe(types.reference(UserArrayModel)),
})
    .actions((self) => {
    return {

      afterCreate: flow(function* () {
        self.reset();
        
        const testAmount = 5000; 
        const reps = 1; 

        const averageTime = self.calculateAverage(self.addUsers, reps, testAmount);

        console.log('------------------------RESULTS------------------------------------')
        console.log(`Average time for adding ${testAmount} items to ARRAY:`, averageTime);

         self.currentUser = self.randomUser;

         console.log(self.users.push(self.currentUser));

        // console.log('currentUser -->', self.currentUser.name)
        // console.log('found user --->', self.findCurrentUser.name);

      }),

      calculateAverage (action, reps, testAmount) {
        let totalTime = 0; 
        for (let i = 0; i < reps; i++) {
          totalTime += action(testAmount);
        }

        return totalTime / reps;

      },

      addUsers (amountOfUsers) {
        const users = new Array(amountOfUsers).fill(null).map(createUser);

        const startTime = Date.now();

        let count = 0; 
        users.forEach((user) => {
       
          self.users.push(user);

          if(count % 1000 === 0) {
            console.log(`added ${count} users so far`)
          }
          count ++; 
        })

        const endTime = Date.now();
        
        const timeToRun = (endTime - startTime) / 1000; 

        console.log(`time to add ${amountOfUsers} users into array:`, timeToRun)
        return timeToRun;
      },

      addUser() {

      },

      reset () {
        applySnapshot(self, {});
      },
    };
  }).views((self) => {

    return {

      getFindUser() {
  
        const foundUser = self.usersArray.find((user) => {
          return user.id === self.currentUser.id;
        })

        return !!foundUser;
      },

      get randomUser () {
        const randomIndex = Math.floor(Math.random() * self.users.length);
        return self.users[randomIndex];
      }, 

    }
  });

  export default UserArrayStore; 
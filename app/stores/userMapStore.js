import { types, applySnapshot, flow } from "mobx-state-tree";
import createUser from '../api/index.js'

const UserMapModel = types.model('UserModel', {
    id: types.identifier, 
    name: types.string,
    email: types.string,
});

const UserMapStore = types.model('UserStore', {
    users: types.map(UserMapModel),
    currentUser: types.maybe(types.reference(UserMapModel)),
})
    .actions((self) => {
    return {

      afterCreate: flow(function* () {
        self.reset();
        
        const testAmount = 50000; 
        const reps = 10; 

        const averageTime = self.calculateAverage(self.addUsers, reps, testAmount);

        console.log(`Average time for adding ${testAmount} items to MAP:`, averageTime);

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


      users.forEach((user) => {
        self.users.put(user);
      })

      const endTime = Date.now();
        
      return (endTime - startTime) / 1000; 

      }, 

      reset () {
        applySnapshot(self, {});
      },
    };
  }).views((self) => {

    return {

      get randomUser () {
        const randomIndex = Math.floor(Math.random() * self.users.length);
        return self.users[randomIndex];
      }, 

    }
  });

  export default UserMapStore; 
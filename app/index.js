import RootStore from './stores/rootStore.js'

const store = RootStore.create({
    name: 'sandbox'
});

console.log(store.userStore.users.length);

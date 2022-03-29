import { faker } from '@faker-js/faker'; 
import { resolve } from 'path';
import { start } from 'repl';
import { v4 as createUUID } from 'uuid';

const createUser = () => {
    return {
        id: createUUID(),
        name: faker.name.findName(), 
        email: faker.internet.email(),
    };
};


const createGroup = (amountOfUsers) => {
    let users = [];

    for(let i = 0; i < amountOfUsers; i++) {
        users.push(createUser()); 
    }

    return new Promise((res, rej) => {
        res(users);

        rej({});
    });
}

export default createGroup; 
import { faker } from '@faker-js/faker'; 

import { v4 as createUUID } from 'uuid';

const createUser = () => {
    return {
        id: createUUID(),
        name: faker.name.findName(), 
        email: faker.internet.email(),
    };
};

export default createUser; 



/*

 return new Promise((res, rej) => {
        res(users);

        rej({});
    });

*/ 
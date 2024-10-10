const User = require('../models/User');

const users = [
    {
        email: 'admin@abv.bg',
        username: 'admin',
        password: 'Admin123',
        role: 'admin',
    },
    {
        email: 'peter@abv.bg',
        username: 'peter',
        password: 'Peter123',
        role: 'user',
    },
];

async function seedUsersData() {
    try {
        const existingUsers = await User.find({});

        if (existingUsers.length === 0) {
            await Promise.all(users.map(user => User.create(user)));
            console.log('Users data seeded successfully!');
        }
    } catch (error) {
        console.log('Error seeding users data:', error);
    }
}

module.exports = seedUsersData;
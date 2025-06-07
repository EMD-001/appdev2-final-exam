require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const User = require('./models/User');   // Adjust path if needed
const Event = require('./models/Event'); // Adjust path if needed

const saltRounds = 10;
const defaultPassword = 'secret123';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create fake users
    let users = [];

    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        // Add other required user fields here if your schema has more
      });

      users.push(user);
    }

    await User.insertMany(users);
    console.log('Users seeded');

    // Create fake events linked to random users
    let events = [];

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const event = new Event({
        title: faker.lorem.words(3),
        location: faker.address.city(),
        date: faker.date.future(),
        description: faker.lorem.sentence(),
        userId: randomUser._id,
      });

      events.push(event);
    }

    await Event.insertMany(events);
    console.log('Events seeded');

    // Close connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
}

seedDatabase();

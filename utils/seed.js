const connection = require('../config/connection');
const { Thought, User } = require('../models');
const userData = require('./userData');

const mongoose = require('mongoose');

async function seedDatabase() {
    try {
        await connection;

        // Clear existing data (optional, use with caution)
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert users and their thoughts
        await User.insertMany(userData);

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error inserting seed data:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();

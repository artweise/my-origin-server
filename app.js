import mongoose from 'mongoose';
import express from 'express';
import { config } from 'dotenv';
import fs from 'fs/promises';
import { middlewareConfig } from './config/index.js';
import { errorHandler } from './error-handling/errorHandler.js';
import { treeHandler } from './handlers/tree.handler.js';
import indexRoutes from './routes/index.routes.js';
import personRoutes from './routes/person.routes.js';
import treeRoutes from './routes/tree.routes.js';

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
config();

// ℹ️ --- DB ---
// Connects to the database
// package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose

// Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myorigin-app-server';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });

// ℹ️ Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const app = express();
const PORT = process.env.PORT || 5005;
const INITIALIZATION_FILE_PATH = './tree_initialized.txt';

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// (logger, body-parser etc)
middlewareConfig(app);

// ℹ️ --- ROUTES ---
app.use('/api', indexRoutes);
app.use('/api', personRoutes);
app.use('/api', treeRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
errorHandler(app);

// Check if the initialization flag file exists
const isTreeInitialized = async () => {
  try {
    await fs.access(INITIALIZATION_FILE_PATH);
    return true;
  } catch (error) {
    return false;
  }
};

// Write the initialization flag to the file
const writeInitializationFlag = async () => {
  await fs.writeFile(INITIALIZATION_FILE_PATH, 'initialized');
};

// Initialize the family tree only once at the beginning
const initializeFamilyTreeOnce = async () => {
  const initialized = await isTreeInitialized();
  if (!initialized) {
    try {
      await treeHandler.initializeFamilyTree();
      await writeInitializationFlag();
      console.log('Family tree initialized successfully.');
    } catch (error) {
      console.error('Error initializing family tree:', error);
      process.exit(1); // Exit the application if initialization fails
    }
  }
};

// Start the server after initializing the family tree
app.listen(PORT, async () => {
  try {
    await initializeFamilyTreeOnce();
    console.log(`Server listening on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the application if server fails to start
  }
});

export default app;

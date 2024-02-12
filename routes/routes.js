import express from 'express';
import { loadStates, getStatesByPopulation } from '../controllers/controller.js';
import State from '../models/State.js'; // Import the State model

const router = express.Router();

// New '/' route to render the main page with all states
router.get('/', loadStates);

// Adjusted to handle POST request for dynamic population filtering
router.post('/api/states', getStatesByPopulation);

export default router;

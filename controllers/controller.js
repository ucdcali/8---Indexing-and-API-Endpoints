import State from '../models/State.js';

export const getStatesByPopulation = async (req, res) => {
  const { minPopulation, maxPopulation } = req.body;
  const states = await State.find({
    population: { $gte: minPopulation, $lte: maxPopulation }
  }).sort({population: -1});
  
  res.json(states); // Send back JSON response
};

export const loadStates = async (req, res) => {
  const states = await State.find();

  // Render 'index.ejs' with the states data
  res.render('index', { states });
};

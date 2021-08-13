const Meeting = require('../models/Meeting.model');
const Schedule = require('../models/Schedule.model');
const Todo = require('../models/Todo.model');

const indexGet = async (req, res, next) => {
    
  try {

    const schedule = await Schedule.find().populate(
      
      {
        path:"todo",
        populate: { path:"Todo" }
      }).populate(
        {
          path:"meeting",
          populate: { path:"meetings" }
        }
      )

  
    const scheduleContain = schedule[0];

    return res.render("./schedule/schedule", { scheduleContain, isAuthenticated: req.isAuthenticated(), user: req.user });

  } catch (error) {

    return next(error);
  }
};


const createPost = async (req, res, next) => {

  try{
        const {todo, meeting} = req.body;

        const newSchedule = new Schedule({todo, meeting});

        const createEvent = await newSchedule.save();

        console.log(createEvent);

        return res.status(200).json(createEvent);

    } catch(error) {
      
      return next(error);
    }
};



const addPost = async (req, res, next) => {

  try {

    const id = req.body.id || '610fff234a01001a2c374150';
    
    const todos = await Todo.find();
    const meetings = await Meeting.find();

    const scheduleUpdate = { todo: todos, meeting: meetings };
    const scheduleContain = await Schedule.findByIdAndUpdate(

      id,
      scheduleUpdate,
      { new: true }
    );

    return res.status(200).render("./schedule/schedule", { scheduleContain });

  } catch (err) {

      return next(err);
    
  }
}

module.exports = { indexGet, createPost, addPost }
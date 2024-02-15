import Activities from '../models/activities.model.js';
import { Sequelize } from "sequelize";
import db from "../config/Database.js";


export const getActivities = async (req, res, next) => {
  try {
      const [results, metadata] = await db.query('SELECT l1.*, l2.*, l3.* FROM activities l1 LEFT JOIN project l2 ON l1.project_id = l2.id LEFT JOIN area l3 ON l1.area_id = l3.id  ORDER BY l1.id DESC');
      res.json(results);
  } catch (error) {
      console.error(error);
  }
}

export const getActivitiesById = async(req, res) =>{
  try {
      const response = await Activities.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterActivities = async (req, res, next) => {
  try {
    await Activities.create(req.body);
    res.status(201).json({msg: "Activities Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteActivitiesById = async (req, res, next) => {
  const activitiesId = req.params.id;

  try {
    // Find the project by ID
    const activities = await Activities.findByPk(activitiesId);

    // Check if the project exists
    if (!activities) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete the project
    await activities.destroy();

    res.json({ message: 'Activitites deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateActivitiesById = async(req, res) =>{
  try {
      await Activitites.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Activitites Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
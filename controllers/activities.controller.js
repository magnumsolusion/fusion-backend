import Activities from '../models/activities.model.js';

import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import mysql from "mysql2";
import multer from 'multer';
import fs from 'fs';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.originalname); // Define the file naming strategy
  }
});

const upload = multer({ storage: storage });

export const RegisterActivities = async (req, res, next) => {
  try {
 

    upload.fields([
      { name: 'wide_image', maxCount: 1 },
      { name: 'focus_image', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'File upload error' });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

  
        const image1 = req.files['wide_image'][0];
        const image2 = req.files['focus_image'][0];
  
   

      res.status(201).json({ msg: 'Activity Created' });
      // await newActivity.update({
      //   wide_image: image1.filename, // Assuming you want to store the filename in the database
      //   focus_image: image2.filename
      // });
    
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const RegisterActivitiesData = async (req, res, next) => {
  try {
    await Activities.create(req.body);
    res.status(201).json({ msg: "Activities Created" });
  } catch (error) {
    console.log(error.message);
  }
};


export const getActivities = async (req, res, next) => {
  try {
    const query = `
    SELECT l1.*, l1.id AS acid, l2.project_name AS propertyname, l2.*, l4.*, l4.project_name AS projectname FROM activities l1 LEFT JOIN project l2 ON l1.project_id = l2.id  LEFT JOIN projectdetail l4 ON l1.project_detail_id=l4.id  ORDER BY l1.id DESC
    `;

    // Use Sequelize to execute the SQL query
    const results = await db.query(query, {
      type: db.QueryTypes.SELECT,
    });

    // Send the query results as a JSON response
    res.json(results);

  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    next(error);
  }
};


export const getActivitiesById = async(req, res, next) =>{
  try {
    const id = req.params.id; // Retrieve the id from the request parameters
    
    const [results, metadata] = await db.query('SELECT l1.*, l1.id AS acid, l2.project_name AS propertyname, l2.*, l4.*, l4.project_name AS projectname FROM activities l1 LEFT JOIN project l2 ON l1.project_id = l2.id  LEFT JOIN projectdetail l4 ON l1.project_detail_id=l4.id where l1.id = '+id+' ORDER BY l1.id DESC LIMIT 1',
    
  
    );
    
    res.json(results);
  } catch (error) {
    console.error(error);
 
  }
}


  


export const deleteActivitiesById = async (req, res, next) => {
  const activitiesId = req.params.id;

  try {
    // Find the project by ID
    const activities = await Activities.findByPk(activitiesId);

    // Check if the activity exists
    if (!activities) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Get the filenames of associated images
    const wideImageFilename = activities.wide_image;
    const focusImageFilename = activities.focus_image;

    // Delete the images (assuming they are stored in an 'uploads' directory)
    if (wideImageFilename) {
      fs.unlink(`uploads/${wideImageFilename}`, (err) => {
        if (err) {
          console.error('Error deleting wide image:', err);
        }
      });
    }

    if (focusImageFilename) {
      fs.unlink(`uploads/${focusImageFilename}`, (err) => {
        if (err) {
          console.error('Error deleting focus image:', err);
        }
      });
    }

    // Delete the activity record
    await activities.destroy();

    res.json({ message: 'Activity and associated images deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};






export const updateActivitiesById = async(req, res) =>{
  try {
      await Activities.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Activitites Updated"});
  } catch (error) {
      console.log(error.message);
  }
}




export const getActivitiesByReport = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const project_detail_id = req.params.project_detail_id;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    // Ensure that date values are properly formatted as strings and wrapped in single quotes
    const formattedStartDate = `'${startDate}'`;
    const formattedEndDate = `'${endDate}'`;

    const query = `
      SELECT l1.*, l1.id AS acid, l2.project_name AS propertyname, l2.*, l4.*, l4.project_name AS projectname
      FROM activities l1
      LEFT JOIN project l2 ON l1.project_id = l2.id
     
      LEFT JOIN projectdetail l4 ON l1.project_detail_id = l4.id
      WHERE l1.project_id = ${project_id}
      AND l1.project_detail_id = ${project_detail_id}
      AND l1.date_picked >= ${formattedStartDate}
      AND l1.date_picked <= ${formattedEndDate}
      ORDER BY l1.id DESC
     
    `;

    const [results, metadata] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    // Handle the error response, e.g., send an error response to the client.
    res.status(500).json({ error: 'An error occurred while retrieving activities' });
  }
};



// export const getActivitiesByReport = async (req, res, next) => {
//   try {
//     const { project_id, project_detail_id, startDate, endDate } = req.query;

//     // Create a where condition to search for the date range or exact date match
//     const whereCondition = {
//       project_id: project_id,
//       project_detail_id: project_detail_id,
//       [Sequelize.Op.or]: [
//         {
//           date_picked: startDate,
//         },
//         {
//           date_picked: {
//             [Sequelize.Op.and]: {
//               [Sequelize.Op.gte]: startDate,
//               [Sequelize.Op.lte]: endDate,
//             },
//           },
//         },
//       ],
//     };

//     const results = await Activities.findAll({
//       where: whereCondition,
//       order: [['date_picked', 'ASC']],
//     });

//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred while generating the report.');
//   }
// };




import Roles from '../models/roles.model.js';
import Division from '../models/roles.model.js';
import Rolesaction from '../models/rolesaction.model.js'
//import Units from '../models/division.model.js';
import db from "../config/Database.js";


export const getRoles= async (req, res, next) => {

    try {

        const units = await Roles.findAll({

          
            order: [['roles_id', 'DESC']]

        });
      
        res.json(units);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getRolesById = async(req, res) =>{
  try {
      const response = await Roles.findOne({
          where:{
              roles_id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}

export const getRolesActionByRoleId = async(req, res) =>{
    try {
        // const response = await Rolesaction.findOne({
        //     where:{
        //         role_id: req.params.id,

        //     }
        // });

        const query = `select b.menu_route,a.view,a.update,a.delete,a.create from rolesaction a left join menu b on a.menu_id = b.menu_id where a.role_id=${req.params.id}`;
           
               // Use Sequelize to execute the SQL query
               const results = await db.query(query, {
                 type: db.QueryTypes.SELECT,
               });
           
               // Send the query results as a JSON response
               res.json(results);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
  }





export const RegisterRoles = async (req, res, next) => {
  try {
    await Roles.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteRolesById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Division.findOne({
        where:{
            roles_id: req.params.id
        }
    });
    //const Record = await Division.findByPk(recordId);

    // Check if the project exists
    if (!Record) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Delete the project
    await Record.destroy();

    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateRolesById = async(req, res) =>{
  try {
      await Division.update(req.body,{
          where:{
              roles_id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}

// export const getRolesAction= async (req, res, next) => {

//     try {

//         const query = `
//         SELECT ps.*, p.product_name, u.units_name, p.product_code FROM product_stock ps 
//         LEFT JOIN product p ON ps.product_id = p.id 
//         LEFT JOIN units u ON ps.unit_id = u.id 
//         ORDER BY ps.id`;
   
//        // Use Sequelize to execute the SQL query
//        const results = await db.query(query, {
//          type: db.QueryTypes.SELECT,
//        });
   
//        // Send the query results as a JSON response
//        res.json(results);
        
//     } catch (error) {

//         console.error(error);
        
//     }

// }
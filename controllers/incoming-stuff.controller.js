import IncomingStuff from '../models/incoming-stuff.model.js';
import db from "../config/Database.js";

// export const getProductStock= async (req, res, next) => {

//     try {

//         const productstock = await ProductStock.findAll({
//           where: {
//             product_id: req.params.id,
//           },
          
//             order: [['id', 'DESC']]

//         });
      
//         res.json(productstock);
        
//     } catch (error) {

//         console.error(error);
        
//     }

// }

export const getIncomingStuff = async (req, res, next) => {
  try {

  
    const query = `
     SELECT ins.*, p.product_name, ps.* FROM incoming_stuff ins 
     LEFT JOIN product p ON ins.product_id = p.id
     LEFT JOIN product_stock ps ON ins.product_stock_id = ps.id
     ORDER BY ins.id
    
   
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

export const getIncomingStuffById = async(req, res) =>{
  try {
      const response = await IncomingStuff.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}


export const RegisterIncomingStuff = async (req, res, next) => {
  try {

    const newProductStock = await IncomingStuff.create(req.body);


    const newProductStocktId = newProductStock.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", productstockId: newProductStocktId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};



// Create a new controller function to delete a project by ID
export const deleteIncomingStuffById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await IncomingStuff.findByPk(recordId);

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

export const updateIncomingStuffById = async(req, res) =>{
  try {
      await IncomingStuff.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
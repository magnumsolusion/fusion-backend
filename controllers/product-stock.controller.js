import ProductStock from '../models/product-stock.model.js';
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

export const getProductStockAll = async (req, res, next) => {
  try {


    const query = `
     SELECT ps.*, p.product_name, u.units_name, p.product_code FROM product_stock ps 
     LEFT JOIN product p ON ps.product_id = p.id 
     LEFT JOIN units u ON ps.unit_id = u.id 
     ORDER BY ps.id
   
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

export const getProductStock = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT ps.*, p.product_name, u.units_name FROM product_stock ps 
     LEFT JOIN product p ON ps.product_id = p.id 
     LEFT JOIN units u ON ps.unit_id = u.id 
     WHERE ps.product_id = ${productStockId} 
   
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

export const getProductStockById = async(req, res) =>{
  try {
      const response = await ProductStock.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}


export const RegisterProductStock = async (req, res, next) => {
  try {

    const newProductStock = await ProductStock.create(req.body);


    const newProductStocktId = newProductStock.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", productstockId: newProductStocktId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};



// Create a new controller function to delete a project by ID
export const deleteProductStockById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await ProductStock.findByPk(recordId);

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

export const updateProductStockById = async(req, res) =>{
  try {
      await ProductStock.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
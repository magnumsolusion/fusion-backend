import Product from '../models/product.model.js';
import db from "../config/Database.js";


// export const getProduct= async (req, res, next) => {

//     try {

//         const product = await Product.findAll({

          
//             order: [['id', 'DESC']]

//         });
      
//         res.json(product);
        
//     } catch (error) {

//         console.error(error);
        
//     }

// }


export const getProduct = async (req, res, next) => {
  try {
    const query = `
    SELECT l1.*, l2.product_category_name, l3.vendor_name FROM product l1 LEFT JOIN product_category l2 ON l2.id=l1.category_id LEFT JOIN vendor l3 ON l3.id=l1.vendor_id ORDER BY l3.id
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


export const getProductById = async(req, res) =>{
  try {
      const response = await Product.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}


export const RegisterProduct = async (req, res, next) => {
  try {

    const newProduct = await Product.create(req.body);


    const newProductId = newProduct.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", productId: newProductId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};



// Create a new controller function to delete a project by ID
export const deleteProductById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Product.findByPk(recordId);

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

export const updateProductById = async(req, res) =>{
  try {
      await Product.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
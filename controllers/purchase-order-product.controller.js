import PurchaseOrderProduct from '../models/purchase-order-product.model.js';
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

export const getPurchaseOrderProductAll = async (req, res, next) => {
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

export const getPurchaseOrderProduct = async (req, res, next) => {
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

export const getPurchaseOrderProductEdit = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.purchase_number, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM purchase_order_product pop 
     LEFT JOIN purchase_order po ON pop.purchase_order_id = po.id
     LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
     LEFT JOIN product pr ON ps.product_id = pr.id 
     WHERE pop.purchase_order_id = ${productStockId} 
   
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



export const getPurchaseOrderProductById = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.purchase_number, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM purchase_order_product pop 
     LEFT JOIN purchase_order po ON pop.purchase_order_id = po.id
     LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
     LEFT JOIN product pr ON ps.product_id = pr.id 
     WHERE pop.id = ${productStockId} 
   
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



// export const RegisterPurchaseOrderProduct = async (req, res, next) => {
//   try {
//     const jsonDataArray = req.body.data;



//     console.log('Data saved:', jsonDataArray);

//     res.status(201).json({ msg: 'Data Created', savedData: jsonDataArray});
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: 'Internal Server Error' });
//   }
// };


// Import your Database module or use your preferred database library (e.g., Mongoose, Sequelize, etc.)


export const RegisterPurchaseOrderProduct = async (req, res, next) => {
  try {
    const jsonDataArraySource = req.body.data; // get from react
    const jsonDataArray = JSON.parse(jsonDataArraySource); //convert 

    const savedData = [];
    console.log(jsonDataArray.length)

    for (let i = 0; i < jsonDataArray.length; i++) {
      const {  product, quantity, productstockId, userID, productPrice, purchaseDate } = jsonDataArray[i];

   
      const newPurchaseOrderProduct = new PurchaseOrderProduct({
        purchase_order_id: productstockId,
        product_stock_id: product.id,
        total_price: productPrice, 
        quantity: quantity,
        user_created:userID,
        purchase_date: purchaseDate,
      });

      const savedProduct = await newPurchaseOrderProduct.save();

      savedData.push({ product: savedProduct, quantity });
    }

    console.log('Data saved:', savedData);

    res.status(201).json({ msg: 'Data Created', savedData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};


export const RegisterPurchaseOrderProductEdit = async (req, res, next) => {
  try {
    await PurchaseOrderProduct.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
};



// Create a new controller function to delete a project by ID
export const deletePurchaseOrderProductById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await PurchaseOrderProduct.findByPk(recordId);

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

export const updatePurchaseOrderProductById = async(req, res) =>{
  try {
      await PurchaseOrderProduct.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}


export const getPurchaseOrderProductByIdSum = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
    SELECT 
      SUM(ps.start_price * pop.quantity) AS totalStartPriceTimesQuantity, 
      pop.*, 
      pop.id AS popid, 
      po.purchase_number, 
      ps.product_id,  
      pr.product_name, 
      pr.product_code, 
      ps.start_price
    FROM purchase_order_product pop 
    LEFT JOIN purchase_order po ON pop.purchase_order_id = po.id
    LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
    LEFT JOIN product pr ON ps.product_id = pr.id 
    WHERE pop.purchase_order_id = ${productStockId}
  `;
  


    const results = await db.query(query, {
      type: db.QueryTypes.SELECT,
    }); 


    res.json(results);

  } catch (error) {
    console.error(error);
    next(error);
  }
};
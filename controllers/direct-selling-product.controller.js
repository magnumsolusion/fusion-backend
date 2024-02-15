
import db from "../config/Database.js";
import DirectSellingProduct from '../models/direct-selling-product.model.js';



export const getDirectSellingProductAll = async (req, res, next) => {
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

export const getDirectSellingProduct = async (req, res, next) => {
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

export const getDirectSellingProductEdit = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.selling_code, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM direct_selling_product pop 
     LEFT JOIN direct_selling po ON pop.direct_selling_id = po.id
     LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
     LEFT JOIN product pr ON ps.product_id = pr.id 
     WHERE pop.direct_selling_id = ${productStockId} 
   
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



export const getDirectSellingProductById = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.selling_code, ps.product_id,  pr.product_name, pr.product_code, ps.last_buy_price
     FROM direct_selling_product pop 
     LEFT JOIN direct_selling po ON pop.direct_selling_id = po.id
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




export const RegisterDirectSellingProduct = async (req, res, next) => {
  try {
    const jsonDataArraySource = req.body.data;
    const jsonDataArray = JSON.parse(jsonDataArraySource);

    const savedData = [];

    for (let i = 0; i < jsonDataArray.length; i++) {
      const { product, quantity, productstockId, userID, productPrice, purchaseDate } = jsonDataArray[i];

      const newPurchaseOrderProduct = new DirectSellingProduct({
        direct_selling_id: productstockId,
        product_stock_id: product.id,
        total_price: productPrice,
        quantity: quantity,
        user_created: userID,
        purchase_date: purchaseDate,
      });

      // Save the product to the database
      const savedProduct = await newPurchaseOrderProduct.save();

      // Store the generated id in savedData array
      savedData.push({ product: savedProduct, quantity, newProductStocktId: savedProduct.id });
    }

    console.log('Data saved:', savedData);

    res.status(201).json({ msg: 'Data Created', savedData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};



export const RegisterDirectSellingProductEdit = async (req, res, next) => {
  try {
    await DirectSellingProduct.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
};



// Create a new controller function to delete a project by ID
export const deleteDirectSellingProductById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await DirectSellingProduct.findByPk(recordId);

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

export const updateDirectSellingProductById = async(req, res) =>{
  try {
      await DirectSellingProduct.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}


export const getDirectSellingProductByIdSum = async (req, res, next) => {
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
    FROM direct_buying_product pop 
    LEFT JOIN direct_buying po ON pop.direct_buying_id = po.id
    LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
    LEFT JOIN product pr ON ps.product_id = pr.id 
    WHERE pop.direct_buying_id = ${productStockId}
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
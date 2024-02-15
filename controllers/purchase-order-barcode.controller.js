import PurchaseOrderBarcode from '../models/purchase-order-barcode.model.js';
import db from "../config/Database.js";


export const getPurchaseOrderBarcodeAll = async (req, res, next) => {
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


export const getPurchaseOrderBarcodeAll2 = async (req, res, next) => {
  try {


    const query = `
     SELECT * FROM purchase_order_barcode WHERE reference_id = 0 ORDER BY id DESC
   
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
export const getPurchaseOrderBarcodeAll2Edit = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT * FROM purchase_order_barcode  WHERE reference_id_product = ${productStockId}
   
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


export const getPurchaseOrderBarcode = async (req, res, next) => {
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

export const getPurchaseOrderBarcodeEdit = async (req, res, next) => {
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





export const getPurchaseOrderBarcodeById = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT  pop.*, pop.id AS popid, po.purchase_number, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM purchase_order_barcode pop 
     LEFT JOIN purchase_order po ON pop.purchase_order_id = po.id
     LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
     LEFT JOIN product pr ON ps.product_id = pr.id 
   
     WHERE pop.purchase_order_product_id = ${productStockId} 
   
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
export const getPurchaseOrderBarcodeBuyingById = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT  db.*, pop.*  
     FROM purchase_order_barcode pop 
     LEFT JOIN direct_buying_product db ON db.id = pop.purchase_order_product_id
   
     WHERE purchase_order_product_id = ${productStockId} 
   
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


export const RegisterPurchaseOrderBarcode = async (req, res, next) => {
  try {
    const jsonDataArraySource = req.body.data; // get from react
    const jsonDataArray = JSON.parse(jsonDataArraySource); //convert 

    const savedData = [];
    console.log(jsonDataArray.length)

    for (let i = 0; i < jsonDataArray.length; i++) {
      const {  product, quantity, productstockId, userID } = jsonDataArray[i];

   
      const newPurchaseOrderProduct = new PurchaseOrderBarcode({
        purchase_order_id: productstockId,
        product_stock_id: product.id,
        total_price: product.price, 
        quantity: quantity,
        user_created:userID,
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


export const RegisterPurchaseOrderBarcodeEdit = async (req, res, next) => {
  try {
    await PurchaseOrderBarcode.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
};





export const RegisterPurchaseOrderBarcodeMaster = async (req, res, next) => {
  try {
    const { barcodeData } = req.body;

    for (const barcode of barcodeData) {
      const { serial_number, product_stock_id,   purchase_order_master_receiving_id, purchase_order_product_id,  purchase_order_id, status, in_code, out_code  } = barcode;

  
      await PurchaseOrderBarcode.create({
        serial_number,
        purchase_order_master_receiving_id,
        purchase_order_product_id,
        purchase_order_id,
        product_stock_id,
        status,
        in_code,
        out_code,



    

    
      });
    }

    res.status(200).json({ message: 'Barcode updated successfully.' });
  } catch (error) {
    console.error('Error updating data details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Create a new controller function to delete a project by ID
export const deletePurchaseOrderBarcodeById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await PurchaseOrderBarcode.findByPk(recordId);

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

export const updatePurchaseOrderBarcodeById = async(req, res) =>{
  try {
      await PurchaseOrderBarcode.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}


export const getPurchaseOrderBarcodeByIdSum = async (req, res, next) => {
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
    FROM purchase_order_receiving pop 
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
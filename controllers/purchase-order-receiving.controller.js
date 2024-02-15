import PurchaseOrderReceiving from '../models/purchase-order-receiving.model.js';
import db from "../config/Database.js";
import PurchaseOrderProduct from '../models/purchase-order-product.model.js';



export const getPurchaseOrderReceivingAll = async (req, res, next) => {
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

export const getPurchaseOrderReceiving = async (req, res, next) => {
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

export const getPurchaseOrderReceivingEdit = async (req, res, next) => {
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

export const getPurchaseOrderReceivingEdit2 = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.purchase_number, po.status_receiving, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM purchase_order_receiving pop 
     LEFT JOIN purchase_order po ON pop.purchase_order_id = po.id
     LEFT JOIN product_stock ps ON pop.product_stock_id = ps.id 
     LEFT JOIN product pr ON ps.product_id = pr.id 
     WHERE pop.purchase_order_master_receiving_id = ${productStockId} 
   
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



export const getPurchaseOrderReceivingById = async (req, res, next) => {
  try {

    const productStockId = req.params.id;
    const query = `
     SELECT pop.*, pop.id AS popid, po.purchase_number, ps.product_id,  pr.product_name, pr.product_code, ps.start_price
     FROM purchase_order_receiving pop 
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



export const RegisterPurchaseOrderReceiving = async (req, res, next) => {
  try {
    const jsonDataArraySource = req.body.data; // get from react
    const jsonDataArray = JSON.parse(jsonDataArraySource); //convert 

    const savedData = [];
    console.log(jsonDataArray.length)

    for (let i = 0; i < jsonDataArray.length; i++) {
      const {  product, quantity, productstockId, userID } = jsonDataArray[i];

   
      const newPurchaseOrderProduct = new PurchaseOrderReceiving({
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


export const RegisterPurchaseOrderReceivingEdit = async (req, res, next) => {
  try {
    await PurchaseOrderReceiving.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
};





export const RegisterPurchaseOrderReceivingMaster = async (req, res, next) => {
  try {
    const { productList } = req.body;

    for (const product of productList) {
      const { product_stock_id, quantity, total_price,  stuff_receiving,  purchase_order_id, stuff_residual,   user_created,  purchase_order_product_id, purchase_order_master_receiving_id  } = product;

  
      await PurchaseOrderReceiving.create({
        product_stock_id,
        quantity,
        total_price,
        stuff_receiving,
        purchase_order_id,
        stuff_residual,
        user_created,
        purchase_order_product_id,
        purchase_order_master_receiving_id,
    

    
      });
    }

    res.status(200).json({ message: 'Products updated successfully.' });
  } catch (error) {
    console.error('Error updating data details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Create a new controller function to delete a project by ID
export const deletePurchaseOrderReceivingById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await PurchaseOrderReceiving.findByPk(recordId);

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

// export const updatePurchaseOrderReceivingById = async(req, res) =>{
//   try {
//       await PurchaseOrderReceiving.update(req.body,{
//           where:{
//               id: req.params.id
//           }
//       });
//       res.status(200).json({msg: "Data Updated"});
//   } catch (error) {
//       console.log(error.message);
//   }
// }

export const updatePurchaseOrderReceivingById = async (req, res) => {
  try {
    // Update purchase order master receiving details
    await PurchaseOrderReceiving.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Get the associated product details
    const productList = await PurchaseOrderProduct.findAll({
      where: {
       id: req.params.id,
      },
    });

    // Update product details
    const updateProductPromises = productList.map(async (product) => {
      const productId = product.id;
      const residualQty = product.quantity - req.body.stuff_receiving[productId] || 0;

      const productFormData = {
        stuff_receiving: req.body.stuff_receiving[productId],
        stuff_residual: residualQty,
        user_updated: req.body.user_updated,
      };

      await PurchaseOrderProduct.update(productFormData, {
        where: {
          id: productId,
        },
      });
    });

    // Wait for all product updates to complete
    await Promise.all(updateProductPromises);

    res.status(200).json({ msg: 'Data Updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






export const getPurchaseOrderReceivingByIdSum = async (req, res, next) => {
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
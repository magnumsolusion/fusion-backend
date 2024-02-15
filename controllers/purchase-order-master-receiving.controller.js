import PurchaseOrderMasterReceiving from '../models/purchase-order-master-receiving.model.js';
import db from "../config/Database.js";



export const getPurchaseOrderMasterReceiving= async (req, res, next) => {
  try {


    const query = `
    SELECT pom.*, po.purchase_number, po.status_receiving
    FROM purchase_order_master_receiving pom
    LEFT JOIN purchase_order po ON po.id = pom.purchase_order_id
    ORDER BY pom.id;
    
   
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

// export const getPurchaseOrderById = async(req, res) =>{
//   try {
//       const response = await PurchaseOrder.findOne({
//           where:{
//               id: req.params.id
//           }
//       });
//       res.status(200).json(response);
//   } catch (error) {
//       console.log(error.message);
//   }
// }





export const getPurchaseOrderMasterReceivingById= async (req, res, next) => {
  try {

    const idPurchaseOrder = req.params.id;

    const query = `
     SELECT po.*, po.id AS poid, v.id AS vid, t.id AS tid, v.vendor_name, t.termpay_name, t.days 
     FROM purchase_order_master_receiving po 
     LEFT JOIN vendor v ON po.vendor_id = v.id  
     LEFT JOIN term_pay t ON po.terms_pay_id = t.id
     WHERE po.id =  ${idPurchaseOrder}
   
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

export const getPurchaseOrderMasterReceivingStatusById= async (req, res, next) => {
  try {

    const idPurchaseOrder = req.params.id;

    const query = `
     SELECT p.purchase_number,p.status_receiving, po.*, po.id AS poid, v.id AS vid, t.id AS tid, v.vendor_name, t.termpay_name, t.days 
     FROM purchase_order_master_receiving po 
     LEFT JOIN vendor v ON po.vendor_id = v.id  
     LEFT JOIN term_pay t ON po.terms_pay_id = t.id
     LEFT JOIN purchase_order p ON po.purchase_order_id = p.id
     WHERE po.id =  ${idPurchaseOrder} 
   
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



export const RegisterPurchaseOrderMasterReceiving = async (req, res, next) => {
  try {

    const newProductStock = await PurchaseOrderMasterReceiving.create(req.body);


    const newProductStocktId = newProductStock.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", purchaseOrderMasterReceivingId: newProductStocktId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};


// Create a new controller function to delete a project by ID
export const deletePurchaseOrderMasterReceivingById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await PurchaseOrderMasterReceiving.findByPk(recordId);

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

export const updatePurchaseOrderMasterReceivingById = async(req, res) =>{
  try {
      await PurchaseOrderMasterReceiving.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
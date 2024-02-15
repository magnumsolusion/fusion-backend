import DirectSelling from '../models/direct-selling.model.js';
import db from "../config/Database.js";



export const getDirectSelling= async (req, res, next) => {
  try {


    const query = `
     SELECT po.*, v.customer_name FROM direct_selling po 
     LEFT JOIN customer v ON po.customer_id = v.id  
     ORDER BY po.id 
   
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

export const getDirectSellingLastId= async (req, res, next) => {
  try {

    const subquery = `
    SELECT MAX(id) AS last_id 
    FROM direct_selling
`;

    const query = `
        SELECT po.*, v.customer_name 
        FROM direct_selling po 
        LEFT JOIN customer v ON po.customer_id = v.id  
        WHERE po.id = (${subquery});
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




export const getDirectSellingById= async (req, res, next) => {
  try {

    const idPurchaseOrder = req.params.id;

    const query = `
     SELECT po.*, po.id AS poid, v.id AS vid, t.id AS tid, v.customer_name, t.termpay_name, t.days 
     FROM direct_selling po 
     LEFT JOIN customer v ON po.customer_id = v.id  
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

export const getDirectSellingStatusById= async (req, res, next) => {
  try {

    const idPurchaseOrder = req.params.id;

    const query = `
     SELECT po.*, po.id AS poid, v.id AS vid, t.id AS tid, v.customer_name, t.termpay_name, t.days 
     FROM direct_selling po 
     LEFT JOIN customer v ON po.customer_id = v.id  
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



export const RegisterDirectSelling= async (req, res, next) => {
  try {

    const newProductStock = await DirectSelling.create(req.body);


    const newProductStocktId = newProductStock.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", productstockId: newProductStocktId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};


// Create a new controller function to delete a project by ID
export const deleteDirectSellingById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await DirectSelling.findByPk(recordId);

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

export const updateDirectSellingById = async(req, res) =>{
  try {
      await DirectSelling.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
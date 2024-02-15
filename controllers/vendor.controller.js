import Vendor from '../models/vendor.model.js';
import db from "../config/Database.js";

export const getVendor = async (req, res, next) => {

    try {
      const filter = req.query.filterModel;
      var query = `select * from vendor where 1=1 `;
      
      //Filter
      if(filter != null){
        //quick filter
         if(req.query.filterModel.quickFilterValues != null && req.query.filterModel.quickFilterValues != ''){
            query += ` and  vendor_name like '%${req.query.filterModel.quickFilterValues[0]}%' or address like '%${req.query.filterModel.quickFilterValues[0]}%' or contact like '%${req.query.filterModel.quickFilterValues[0]}%' or email like '%${req.query.filterModel.quickFilterValues[0]}%' or notes like '%${req.query.filterModel.quickFilterValues[0]}%' or phone like '%${req.query.filterModel.quickFilterValues[0]}%'`;
         }

         //header filter
         if(req.query.filterModel.items != null){
          if(req.query.filterModel.items[0].field!= "rowNumber"){
            var search = req.query.filterModel.items[0].value;
            if(search === undefined){
              search = '';
            }
            switch(req.query.filterModel.items[0].operator) {
              case "contains":
                query += ` and ${req.query.filterModel.items[0].field} like '%${search}%' `;
                break;
              case "equals":
                query += ` and ${req.query.filterModel.items[0].field} = '${search}' `;
                break;
             case "startsWith":
              query += ` and ${req.query.filterModel.items[0].field} like '${search}%' `;
                break;  
             case "endsWith":
              query += ` and ${req.query.filterModel.items[0].field} like '%${search}' `;
                break; 
              default:
                // code block
            }
           
          }
         }
       }
        
       //Sorting
       if(req.query.sortModel != null && req.query.sortModel != ''){
         if(req.query.sortModel[0].field != null && req.query.sortModel[0].field != ''){
          query += ` order by ${req.query.sortModel[0].field} ${req.query.sortModel[0].sort}`;
         }
       }
       

      //Paging
      query += ` limit ${req.query.pageSize} OFFSET ${req.query.pageSize * req.query.page}`;

      const results = await db.query(query, {
        type: db.QueryTypes.SELECT,
      });
  

        // const vendor = await Vendor.findAll({

          
        //     order: [['id', 'DESC']]

        // }) 
        //console.log(results)
        res.json(results);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getVendorCount= async (req, res, next) => {

  try {
    const filter = req.query.filterModel;
    var query = `select count(*) as count from vendor where 1=1 `;

    
    if(filter != null){
      if(req.query.filterModel.quickFilterValues != null  && req.query.filterModel.quickFilterValues != ''){
        query += ` and  vendor_name like '%${req.query.filterModel.quickFilterValues[0]}%' or address like '%${req.query.filterModel.quickFilterValues[0]}%' or contact like '%${req.query.filterModel.quickFilterValues[0]}%' or email like '%${req.query.filterModel.quickFilterValues[0]}%' or notes like '%${req.query.filterModel.quickFilterValues[0]}%' or phone like '%${req.query.filterModel.quickFilterValues[0]}%'`;
      }

      if(req.query.filterModel.items != null){
        if(req.query.filterModel.items[0].field!= "rowNumber"){
          var search = req.query.filterModel.items[0].value;
          if(search === undefined){
            search = '';
          }
          switch(req.query.filterModel.items[0].operator) {
            case "contains":
              query += ` and ${req.query.filterModel.items[0].field} like '%${search}%' `;
              break;
            case "equals":
              query += ` and ${req.query.filterModel.items[0].field} = '${search}' `;
              break;
           case "startsWith":
            query += ` and ${req.query.filterModel.items[0].field} like '${search}%' `;
              break;  
           case "endsWith":
            query += ` and ${req.query.filterModel.items[0].field} like '%${search}' `;
              break; 
            default:
              // code block
          }
         
        }
       }

      
    }
    
    const results = await db.query(query, {
      type: db.QueryTypes.SELECT,
    });
 
      res.json(results);
      
  } catch (error) {

      console.error(error);
      
  }

}

export const getVendorById = async(req, res) =>{
  try {
      const response = await Vendor.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterVendor = async (req, res, next) => {
  try {
    await Vendor.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteVendorById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Vendor.findByPk(recordId);

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

export const updateVendorById = async(req, res) =>{
  try {
      await Vendor.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
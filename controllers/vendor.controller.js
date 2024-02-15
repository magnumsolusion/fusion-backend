import Vendor from '../models/vendor.model.js';


export const getVendor= async (req, res, next) => {

    try {

        const vendor = await Vendor.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(vendor);
        
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
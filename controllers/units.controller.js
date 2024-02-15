import Units from '../models/units.model.js';


export const getUnits= async (req, res, next) => {

    try {

        const units = await Units.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(units);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getUnitsById = async(req, res) =>{
  try {
      const response = await Units.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterUnits = async (req, res, next) => {
  try {
    await Units.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteUnitsById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Units.findByPk(recordId);

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

export const updateUnitsById = async(req, res) =>{
  try {
      await Units.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
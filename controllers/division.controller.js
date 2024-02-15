import Division from '../models/division.model.js';
import Units from '../models/division.model.js';


export const getDivision= async (req, res, next) => {

    try {

        const units = await Division.findAll({

          
            order: [['division_id', 'DESC']]

        });
      
        res.json(units);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getDivisionById = async(req, res) =>{
  try {
      const response = await Division.findOne({
          where:{
              division_id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterDivision = async (req, res, next) => {
  try {
    await Division.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteDivisionById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Division.findOne({
        where:{
            division_id: req.params.id
        }
    });
    //const Record = await Division.findByPk(recordId);

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

export const updateDivisionById = async(req, res) =>{
  try {
      await Division.update(req.body,{
          where:{
              division_id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
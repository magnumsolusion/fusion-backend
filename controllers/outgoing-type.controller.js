import OutgoingType from '../models/outgoing-type.model.js';


export const getOutgoingType = async (req, res, next) => {

    try {

        const outgoingtype = await OutgoingType.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(outgoingtype);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getOutgoingTypeById = async(req, res) =>{
  try {
      const response = await OutgoingType.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterOutgoingType = async (req, res, next) => {
  try {
    await OutgoingType.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteOutgoingTypeById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await OutgoingType.findByPk(recordId);

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

export const updateOutgoingTypeById = async(req, res) =>{
  try {
      await OutgoingType.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
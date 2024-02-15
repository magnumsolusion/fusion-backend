import TermPay from '../models/term-pay.model.js';


export const getTermPay= async (req, res, next) => {

    try {

        const termpay = await TermPay.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(termpay);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getTermPayById = async(req, res) =>{
  try {
      const response = await TermPay.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterTermPay = async (req, res, next) => {
  try {
    await TermPay.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteTermPayById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await TermPay.findByPk(recordId);

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

export const updateTermPayById = async(req, res) =>{
  try {
      await TermPay.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
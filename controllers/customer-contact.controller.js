import CustomerContact from '../models/customer-contact.model.js';


// export const getCustomerContact= async (req, res, next) => {

//     try {

//         const customercontact = await CustomerContact.findAll({

          
//             order: [['id', 'DESC']]

//         });
      
//         res.json(customercontact);
        
//     } catch (error) {

//         console.error(error);
        
//     }

// }
// Assuming you have the necessary imports and Sequelize configured

export const getCustomerContact = async (req, res) => {
  try {

    const response = await CustomerContact.findAll({
      where: {
        customer_id: req.params.id,
      },
      order: [['id', 'DESC']], 
    });

    if (!response) {
      return res.status(404).json({ message: 'Customer contact not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching customer contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





export const getCustomerContactById = async(req, res) =>{
  try {
      const response = await CustomerContact.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterCustomerContact = async (req, res, next) => {
  try {
    await CustomerContact.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteCustomerContactById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await CustomerContact.findByPk(recordId);

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

export const updateCustomerContactById = async(req, res) =>{
  try {
      await CustomerContact.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
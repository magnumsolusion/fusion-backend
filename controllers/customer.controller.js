import Customer from '../models/customer.model.js';


export const getCustomer= async (req, res, next) => {

    try {

        const customer = await Customer.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(customer);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getCustomerById = async(req, res) =>{
  try {
      const response = await Customer.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}


export const RegisterCustomer = async (req, res, next) => {
  try {

    const newCustomer = await Customer.create(req.body);


    const newCustomerId = newCustomer.id;  // for get new Record id after add

    res.status(201).json({ msg: "Data Created", customerId: newCustomerId }); // show new Id
  } catch (error) {

    console.log(error.message);

  }
};



// export const RegisterCustomer = async (req, res, next) => {
//   try {
//     await Customer.create(req.body);
//     res.status(201).json({msg: "Data Created"});
// } catch (error) {
//     console.log(error.message);
// }
//   };


// Create a new controller function to delete a project by ID
export const deleteCustomerById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Customer.findByPk(recordId);

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

export const updateCustomerById = async(req, res) =>{
  try {
      await Customer.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
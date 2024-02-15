import ProductCategory from '../models/product-category.model.js';
import Vendor from '../models/product-category.model.js';


export const getProductCategory= async (req, res, next) => {

    try {

        const productcategory = await ProductCategory.findAll({

          
            order: [['id', 'DESC']]

        });
      
        res.json(productcategory);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getProductCategoryById = async(req, res) =>{
  try {
      const response = await ProductCategory.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterProductCategory = async (req, res, next) => {
  try {
    await ProductCategory.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteProductCategoryById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await ProductCategory.findByPk(recordId);

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

export const updateProductCategoryById = async(req, res) =>{
  try {
      await ProductCategory.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
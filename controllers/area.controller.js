import Area from '../models/area.model.js';


export const getArea = async (req, res, next) => {

    try {

        const area = await Area.findAll({

            atrributes:['id', 'area_name']

        });
      
        res.json(area);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getAreaById = async(req, res) =>{
  try {
      const response = await Area.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterArea = async (req, res, next) => {
  try {
    await Area.create(req.body);
    res.status(201).json({msg: "Area Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteAreaById = async (req, res, next) => {
  const areaId = req.params.id;

  try {
    // Find the project by ID
    const area = await Area.findByPk(areaId);

    // Check if the project exists
    if (!area) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete the project
    await area.destroy();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAreaById = async(req, res) =>{
  try {
      await Area.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Area Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
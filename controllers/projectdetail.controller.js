import Projectdetail from '../models/projectdetail.model.js';


export const getProjectDetail = async (req, res, next) => {

    try {

        const projectdetail = await Projectdetail.findAll({

      

        });
      
        res.json(projectdetail);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getProjectDetailById = async(req, res) =>{
  try {
      const response = await Projectdetail.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterProjectDetail = async (req, res, next) => {
  try {
    const { project_name, no_po } = req.body;

    // Check if both project_name and no_po are provided in the request
    if (!project_name || !no_po) {
      return res.status(400).json({ message: 'Both project_name and no_po are required' });
    }

    // Check if a project with the same project_name and no_po already exists in the database
    const existingProject = await Projectdetail.findOne({
      where: {
        project_name: project_name,
        no_po: no_po,
      },
    });

    if (existingProject) {
      return res.status(400).json({ message: 'Project details already exist' });
    }

    // Create a new project detail entry with project_name and no_po
    await Projectdetail.create({
      project_name: project_name,
      no_po: no_po,
    });

    return res.json({ message: 'Project details registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new controller function to delete a project by ID
export const deleteProjectDetailById = async (req, res, next) => {
  const projectdetailId = req.params.id;

  try {
    // Find the project by ID
    const projectdetail = await Projectdetail.findByPk(projectdetailId);

    // Check if the project exists
    if (!projectdetail) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete the project
    await projectdetail.destroy();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProjectDetailById = async(req, res) =>{
  try {
      await Projectdetail.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Project Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
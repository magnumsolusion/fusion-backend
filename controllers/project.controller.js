import Project from '../models/project.model.js';


export const getProject = async (req, res, next) => {

    try {

        const project = await Project.findAll({

            atrributes:['id', 'project_name', 'address', 'contact_name', 'contact_number', 'input_by']

        });
      
        res.json(project);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getProjectById = async(req, res) =>{
  try {
      const response = await Project.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterProject = async (req, res, next) => {
    const { project_name, address, contact_name, contact_number, input_by } = req.body;

  
    try {
     // Check if a user with the same email already exists in the database
     const existingUser = await Project.findOne({
      where: {
        project_name: project_name,
      },
    });

    if (existingUser) {
      // If a user with the same email exists, return an error response
      return res.status(400).json({ message: 'Project name already in use' });
    }
   
  
    
  
      await Project.create({
        project_name: project_name,
        address: address,
        contact_name: contact_name,
        contact_number: contact_number,
        input_by: input_by,
      });
  
      res.json({ message: 'Registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// Create a new controller function to delete a project by ID
export const deleteProjectById = async (req, res, next) => {
  const projectId = req.params.id;

  try {
    // Find the project by ID
    const project = await Project.findByPk(projectId);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete the project
    await project.destroy();

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProjectById = async(req, res) =>{
  try {
      await Project.update(req.body,{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Project Updated"});
  } catch (error) {
      console.log(error.message);
  }
}
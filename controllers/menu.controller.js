import Menu from '../models/menu.model.js';
import Rolesaction from '../models/rolesaction.model.js';
import Division from '../models/roles.model.js';
import db from "../config/Database.js";
import Users from '../models/user.model.js';
import Roles from '../models/roles.model.js';
 
export const getMenu= async (req, res, next) => {

    try {

        const units = await Menu.findAll({

           
            order: [['menu_id', 'DESC']]

        });
      
        res.json(units);
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getMenuById = async(req, res) =>{
  try {
      const response = await Menu.findOne({
          where:{
              menu_id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}





export const RegisterMenu = async (req, res, next) => {
  try {
    await Menu.create(req.body);
    res.status(201).json({msg: "Data Created"});
} catch (error) {
    console.log(error.message);
}
  };


// Create a new controller function to delete a project by ID
export const deleteMenuById = async (req, res, next) => {
  const recordId = req.params.id;

  try {
    // Find the project by ID
    const Record = await Menu.findOne({
        where:{
            menu_id: req.params.id
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

export const updateMenuById = async(req, res) =>{
  try {
      await Menu.update(req.body,{
          where:{
              menu_id: req.params.id
          }
      });
      res.status(200).json({msg: "Data Updated"});
  } catch (error) {
      console.log(error.message);
  }
}

export const getParentMenu= async (req, res, next) => {

    try {
        const user = await Users.findOne({
            where:{
                id: req.params.id
            }
        });

        const roles = await Roles.findOne({
            where:{
                roles_id: user.roles_id
            }
        });
        var operator = '1=1';
        if(roles.roles_name != "SuperAdmin"){
            operator = ` b.role_id=${user.roles_id} and b.view=1 `;
        }
        if (user) {
            var query = `select distinct c.menu_id,c.menu_name,c.menu_route,c.parent_menu_id,c.menu_id from menu c join (
                select a.menu_id,a.menu_name,a.menu_route,a.parent_menu_id from menu a join rolesaction b on a.menu_id=b.menu_id where  ${operator}) d ON
                c.menu_id = d.parent_menu_id order by c.menu_id desc`;
 
            const results = await db.query(query, {
                type: db.QueryTypes.SELECT,
            });
            res.json(results);
            // const units = await Menu.findAll({

            //     where:{
            //          parent_menu_id : 0,
            //          role_id : user.roles_id
            //     },
            //      order: [['menu_id', 'DESC']]
     
            //  });
        }else{
            return res.status(404).json({ message: 'Data not found' });
        }
       
      
        
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getChildMenu= async (req, res, next) => {

    try {
        const user = await Users.findOne({
            where:{
                id: req.params.id2,
            }
        });

        const roles = await Roles.findOne({
            where:{
                roles_id: user.roles_id
            }
        });

        var operator = '1=1';
        if(roles.roles_name.toLocaleLowerCase() != "SuperAdmin".toLocaleLowerCase()) {  
            operator = ` b.role_id=${user.roles_id} and b.view=1 `;
        }

        if(user){
            var query = `select a.menu_id,a.menu_name,a.menu_route,a.parent_menu_id,b.view,b.delete,b.create,b.update  from menu a join rolesaction b on a.menu_id=b.menu_id where ${operator} and a.parent_menu_id=${req.params.id}  order by a.menu_id desc`;
 
            const results = await db.query(query, {
                type: db.QueryTypes.SELECT,
            });

            res.json(results);
            // const units = await Menu.findAll({

            //     where:{
            //         parent_menu_id : req.params.id,
            //         role_id:user.roles_id
            //     },
            //     order: [['menu_id', 'DESC']]
    
            // });
          
        }else{
            return res.status(404).json({ message: 'Data not found' });
        }
        
      
        
    } catch (error) {

        console.error(error);
        
    }

}

export const getMenuByRoleId = async (req, res, next) => {
    try{
        const param = req.params.id;
        const param2 = req.params.id2;
        var query = `select b.id,a.menu_id,a.menu_name,a.parent_menu_id,b.view,b.delete,b.update,b.create from (SELECT g.menu_id,g.menu_name,g.parent_menu_id FROM menu g left join menu h on g.parent_menu_id = h.menu_id) a 
            left join (select id,view,v.delete,v.update,v.create,v.menu_id from rolesaction v  where v.role_id=${param} 
            ) b on a.menu_id=b.menu_id order by a.menu_id`;
 
         
       // Use Sequelize to execute the SQL query
       const results = await db.query(query, {
         type: db.QueryTypes.SELECT,
       });
   
       // Send the query results as a JSON response
       res.json(results);
    }catch (error) {
        console.error(error);
    }
}

export const updateRolesActionId = async(req, res) =>{
    try {
        if(req.params.id == 0){
            await Rolesaction.create(req.body);
            res.status(201).json({msg: "Data Created"});
        }
        await Rolesaction.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Updated"});
    } catch (error) {
        console.log(error.message);
    }
  }
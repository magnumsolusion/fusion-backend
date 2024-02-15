import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Roles = db.define('roles', {

roles_id: {

    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
        
}, 
roles_name: {

    type:DataTypes.STRING
    
},
  

},{

  freezeTableName: true

});

export default Roles;
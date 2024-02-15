import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Rolesaction = db.define('rolesaction', {

role_id: {

    type:DataTypes.INTEGER
    
},menu_id: {

    type:DataTypes.INTEGER
    
},
view: {

    type:DataTypes.INTEGER
    
},  
delete: {

    type:DataTypes.INTEGER
    
},
update: {

    type:DataTypes.INTEGER
    
},
create: {

    type:DataTypes.INTEGER
    
},
},{

  freezeTableName: true

});

export default Rolesaction;
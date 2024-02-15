import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Menu = db.define('menu', {

menu_id: {

    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey: true
    
} ,
menu_name: {

    type:DataTypes.STRING
    
},  
menu_route: {

    type:DataTypes.STRING,
    allowNull:true
    
},parent_menu_id: {

    type:DataTypes.INTEGER,
    allowNull:true
} ,
is_deleted:{
    type:DataTypes.INTEGER,
},
},{

  freezeTableName: true

});

export default Menu;
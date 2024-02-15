import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Usersroles = db.define('userroles', {
user_id:{
   
        type:DataTypes.INTEGER
   
   
} ,
role_id:{
   
     type:DataTypes.INTEGER

} 

},{

  freezeTableName: true

});

export default Usersroles;
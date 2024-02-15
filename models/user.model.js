import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users', {

name:{
   
     type:DataTypes.STRING


},
email: {

    type:DataTypes.STRING
    
},

password: {

    type:DataTypes.STRING
    
},

refresh_token: {

    type:DataTypes.TEXT
    
},
division_id: {

    type:DataTypes.INTEGER
    
},
roles_id: {

    type:DataTypes.INTEGER
    
},



},{

  freezeTableName: true

});

export default Users;
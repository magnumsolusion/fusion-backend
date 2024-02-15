import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Units = db.define('units', {

units_name:{
   
     type:DataTypes.STRING


},

user_created:{
   
  type:DataTypes.STRING


},
user_updated:{
   
  type:DataTypes.STRING


},


},{

  freezeTableName: true

});

export default Units;
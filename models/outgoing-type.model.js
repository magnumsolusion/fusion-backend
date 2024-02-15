import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const OutgoingType = db.define('outgoing_type', {

outgoing_type_name:{
   
     type:DataTypes.STRING


},

user_created:{
   
  type:DataTypes.INTEGER


},
user_updated:{
   
  type:DataTypes.INTEGER


},


},{

  freezeTableName: true

});

export default OutgoingType;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Customer = db.define('customer', {

customer_name:{
   
     type:DataTypes.STRING


},

address:{
   
  type:DataTypes.STRING


},

phone:{
   
  type:DataTypes.STRING


},
email:{
   
  type:DataTypes.STRING


},







},{

  freezeTableName: true

});

export default Customer;
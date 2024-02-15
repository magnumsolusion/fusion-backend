import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const CustomerContact = db.define('customer_contact', {

  customer_id:{
   
    type:DataTypes.INTEGER
  
  
  },
customer_contact_name:{
   
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

export default CustomerContact;
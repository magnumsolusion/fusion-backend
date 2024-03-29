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
contact:{
   
  type:DataTypes.STRING


},
notes:{
   
  type:DataTypes.STRING


},
allow_to_vendor:{
   
  type:DataTypes.STRING,
  defaultValue: '2'


},
user_created:{
   
  type:DataTypes.STRING


},
user_updated:{
   
  type:DataTypes.STRING


},
enable:{
   
  type:DataTypes.STRING,
  defaultValue: '1'

},

},{

  freezeTableName: true

});

export default Customer;
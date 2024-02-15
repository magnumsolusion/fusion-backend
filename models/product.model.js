import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product', {

product_name:{
   
     type:DataTypes.STRING


},
product_code:{
   
  type:DataTypes.STRING


},
serial_number:{
   
  type:DataTypes.STRING


},
type:{
   
  type:DataTypes.STRING


},
category_id:{
   
  type:DataTypes.INTEGER


},
vendor_id:{
   
  type:DataTypes.INTEGER


},
descriptions:{
   
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

export default Product;
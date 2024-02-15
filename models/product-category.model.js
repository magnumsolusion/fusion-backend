import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const ProductCategory = db.define('product_category', {

product_category_name:{
   
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


export default ProductCategory;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const CategoryBarang = db.define('categorybarang', {

category_name:{
   
     type:DataTypes.STRING


},




},{

  freezeTableName: true

});

export default CategoryBarang;
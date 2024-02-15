import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Detail = db.define('detail', {


company_name:{
   
    type:DataTypes.STRING


},

phone_number:{
   
  type:DataTypes.STRING


}, 

address:{
   
  type:DataTypes.STRING


},
tax:{
   
  type:DataTypes.FLOAT


},
user_updated:{
   
  type:DataTypes.STRING


},


},{

  freezeTableName: true

});

export default Detail;
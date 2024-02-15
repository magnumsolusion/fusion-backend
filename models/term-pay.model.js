import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const TermPay = db.define('term_pay', {

termpay_name:{
   
     type:DataTypes.STRING


},
days:{
   
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

export default TermPay;
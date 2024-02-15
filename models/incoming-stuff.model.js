import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const IncomingStuff = db.define('incoming_stuff', {



product_id:{
   
     type:DataTypes.INTEGER


},
product_stock_id:{
   
  type:DataTypes.INTEGER


},
purchase_date:{
   
  type:DataTypes.DATEONLY


},

qty:{
   
  type:DataTypes.INTEGER


},



purchase_price:{
   
  type:DataTypes.INTEGER


},


qty:{
   
  type:DataTypes.INTEGER,
  defaultValue: 1


},

shipping_cost:{
   
  type:DataTypes.INTEGER


},

discount:{
   
  type:DataTypes.INTEGER


},
ppn:{
   
  type:DataTypes.INTEGER


},
total:{
   
  type:DataTypes.INTEGER


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

export default IncomingStuff;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PurchaseOrderMasterReceiving= db.define('purchase_order_master_receiving', {

purchase_order_id:{
   
    type:DataTypes.STRING


},
vendor_id:{
  
  type:DataTypes.STRING
 
 
 },
 terms_pay_id:{
   
  type:DataTypes.STRING
 
 
 },
purchase_date:{
  
 type:DataTypes.DATEONLY


},

note:{
  
 type:DataTypes.STRING


},
total:{
  
 type:DataTypes.FLOAT


},
discount_percentage:{
  
 type:DataTypes.FLOAT


},
discount_nominal:{
  
 type:DataTypes.FLOAT


},
tax:{
  
 type:DataTypes.FLOAT


},
grand_total:{
  
 type:DataTypes.FLOAT


},
shipping_cost:{
  
  type:DataTypes.FLOAT,
  defaultValue:'0'
 
 
 },
date_receiving:{
  
 type:DataTypes.DATEONLY
 


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

export default PurchaseOrderMasterReceiving;
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const DirectBuying = db.define('direct_buying', {
  
buying_code:{
   
    type:DataTypes.STRING


},

purchase_number:{
   
     type:DataTypes.STRING


},
purchase_date:{
   
  type:DataTypes.DATEONLY


},
vendor_id:{
   
  type:DataTypes.INTEGER


},
terms_pay_id:{
   
  type:DataTypes.INTEGER


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
date_receiving:{
   
  type:DataTypes.DATEONLY
  


},
stuff_residual:{
   
  type:DataTypes.INTEGER,



},
shipping_cost:{
   
  type:DataTypes.FLOAT,
  defaultValue: '0'


},
status_receiving:{
   
  type:DataTypes.STRING,
  defaultValue: 'DIRECT'


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

export default DirectBuying;
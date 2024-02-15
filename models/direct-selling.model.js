import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const DirectSelling = db.define('direct_selling', {

selling_code:{
   
     type:DataTypes.STRING


},
selling_date:{
   
  type:DataTypes.DATEONLY


},
customer_id:{
   
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

shipping_cost:{
   
  type:DataTypes.FLOAT,
  defaultValue: '0'


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

export default DirectSelling;
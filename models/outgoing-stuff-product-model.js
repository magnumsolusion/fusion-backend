import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const OutgoingStuffProduct= db.define('outgoing_stuff_product', {

outgoing_stuff_id:{
   
     type:DataTypes.INTEGER


},
product_stock_id:{
   
  type:DataTypes.INTEGER


},

quantity:{

  type:DataTypes.INTEGER,
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

export default OutgoingStuffProduct;
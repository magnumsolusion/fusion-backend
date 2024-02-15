import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PurchaseOrderProduct = db.define('purchase_order_product', {

purchase_order_id:{
   
     type:DataTypes.INTEGER


},
product_stock_id:{
   
  type:DataTypes.INTEGER


},
purchase_date: {

  type:DataTypes.DATEONLY


},
quantity:{

  type:DataTypes.INTEGER,
  defaultValue: '0'

},
last_quantity:{

  type:DataTypes.INTEGER,
  defaultValue: '0'

},
total_price:{

  type:DataTypes.FLOAT

},
stuff_receiving:{

  type:DataTypes.INTEGER,
  defaultValue: '0'

},
stuff_residual:{
   
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

export default PurchaseOrderProduct;
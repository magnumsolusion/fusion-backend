import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const ProductStock = db.define('product_stock', {


product_id:{
   
  type:DataTypes.INTEGER


},
unit_id:{
   
  type:DataTypes.INTEGER


},
start_stock:{
   
  type:DataTypes.INTEGER,
  defaultValue: '0'


},
end_stock:{
   
  type:DataTypes.INTEGER,
  defaultValue: '0'


},
max_stock:{
   
  type:DataTypes.INTEGER,
  defaultValue: '0'


},
min_stock:{
   
  type:DataTypes.INTEGER,
  defaultValue: '0'


},
start_price:{
   
  type:DataTypes.FLOAT,
  defaultValue: '0'


},
last_buy_date:{
   
  type:DataTypes.DATEONLY


},

last_buy_price:{
   
  type:DataTypes.STRING


},
enable:{
   
  type:DataTypes.STRING,
  defaultValue: '1'

},
allow_buy:{
   
  type:DataTypes.STRING,
  defaultValue: '1'

},
allow_sell:{
   
  type:DataTypes.STRING,
  defaultValue: '1'

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

export default ProductStock;
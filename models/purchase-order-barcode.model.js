import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const PurchaseOrderBarcode= db.define('purchase_order_barcode', {

  purchase_order_master_receiving_id:{
   
    type:DataTypes.INTEGER


},

purchase_order_id:{
   
     type:DataTypes.INTEGER


},
product_stock_id:{
   
  type:DataTypes.INTEGER


},
purchase_order_product_id:{
   
  type:DataTypes.INTEGER,



},
serial_number:{

  type:DataTypes.STRING

},
reference_id_product:{

  type:DataTypes.INTEGER,
  defaultValue:'0'

},
reference_id:{

  type:DataTypes.INTEGER,
  defaultValue:'0'

},
reference_status:{

  type:DataTypes.STRING

},
status:{

  type:DataTypes.STRING

},
in_code:{

  type:DataTypes.STRING

},
out_code:{

  type:DataTypes.STRING

},
// quantity:{

//   type:DataTypes.INTEGER

// },
// total_price:{

//   type:DataTypes.FLOAT

// },
// stuff_receiving:{

//   type:DataTypes.INTEGER

// },
// stuff_residual:{

//   type:DataTypes.INTEGER

// },

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

export default PurchaseOrderBarcode;
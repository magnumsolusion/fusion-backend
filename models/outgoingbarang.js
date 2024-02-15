import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const OutgoingBarang = db.define('outgoingbarang', {



id_incomingbarang:{
   
     type:DataTypes.INTEGER


},
id_customer:{
   
  type:DataTypes.STRING


},

id_category_barang:{
   
  type:DataTypes.INTEGER


},



harga_jual:{
   
  type:DataTypes.INTEGER


},
outgoing_date:{
   
  type:DataTypes.DATE


},

qty:{
   
  type:DataTypes.INTEGER,
  defaultValue: 1


},







},{

  freezeTableName: true

});

export default OutgoingBarang;
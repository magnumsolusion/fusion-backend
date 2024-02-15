import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const OutgoingStuff = db.define('outgoing_stuff', {

outgoing_code:{
   
     type:DataTypes.STRING


},
loan_date:{
   
  type:DataTypes.DATEONLY


},
return_date:{
   
  type:DataTypes.DATEONLY


},
receive_date:{
   
  type:DataTypes.DATEONLY


},
loan_type_id:{
   
  type:DataTypes.INTEGER


},

note:{
   
  type:DataTypes.STRING


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

export default OutgoingStuff;
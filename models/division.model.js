import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Division = db.define('division', {

division_id: {

    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
        
}, 
division_name: {

    type:DataTypes.STRING
    
}
  

},{

  freezeTableName: true

});

export default Division;
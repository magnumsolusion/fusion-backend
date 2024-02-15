import { Sequelize } from "sequelize";
const db = new Sequelize('magnum_stock_db', 'root', '', {

host: 'localhost',
dialect : 'mysql'

});

export default db;
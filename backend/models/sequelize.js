// models/sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bookingApp', 'root', 'Shohan2019331042#', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;

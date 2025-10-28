// src/scripts/run-seeders.js
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './src/config/db.js'; // si seeders.js está en la raíz


const seeder = new Umzug({
  migrations: { glob: 'src/seeders/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeDataSeed' }),
  logger: console,
});

await seeder.up(); // ejecuta todos los seeders

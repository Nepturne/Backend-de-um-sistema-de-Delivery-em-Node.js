import Sequelize from 'sequelize';

import User from '../app/models/User';
import Ativador from '../app/models/Ativador';
import Pedidos from '../app/models/Pedidos';
import CaixaUnes from '../app/models/CaixaUnes';
import Entradas from '../app/models/Entradas';
import EntradasAvulsas from '../app/models/EntradasAvulsas';
import Saidas from '../app/models/Saidas';

import databaseConfig from '../config/database';

const models = [User, Ativador, Pedidos, CaixaUnes, Entradas,EntradasAvulsas, Saidas];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    User.associate(this.connection.models);
    Pedidos.associate(this.connection.models);
    Entradas.associatefor(this.connection.models);
    EntradasAvulsas.associatefor(this.connection.models);
    Saidas.associatefor(this.connection.models);
  }
}

export default new Database();

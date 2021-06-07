import Sequelize from 'sequelize';


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

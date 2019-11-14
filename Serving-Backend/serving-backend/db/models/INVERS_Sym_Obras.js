/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INVERS_Sym_Obras', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Obra: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Constructor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Provincia: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Municipio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ValorInversion: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    OSDE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Programa: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Tipo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Inversionista: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'INVERS_Sym_Obras'
  });
};

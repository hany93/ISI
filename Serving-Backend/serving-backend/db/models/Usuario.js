/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Usuario', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		usuario: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contrasenna: {
			type: DataTypes.STRING,
			allowNull: true
		},
		rol: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'Usuario'
	});
};

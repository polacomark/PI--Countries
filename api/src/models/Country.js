const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: 3,
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---'
    },

    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continents: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---'
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '---'
    },

    subregion: {
      type: DataTypes.STRING,
      defaultValue: '---'
    },

    area: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },

    population: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },

  {
    timestamps: false,
  }
  );
};

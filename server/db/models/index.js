const Sequelize = require('sequelize');
const connection = require('./../connection.js') ;


const User = connection.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}

)

module.exports = {
    User,
};

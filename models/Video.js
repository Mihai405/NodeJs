const express = require('../sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Video = sequelize.define("activity", {
    description : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [5, 45]
        }
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [5, 45]
        }
    },     
    url : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [5, 45]
        }
    },
});

module.exports = Video;
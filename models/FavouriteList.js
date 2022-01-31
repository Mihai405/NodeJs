const express = require('../sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const FavouriteVideo = sequelize.define("favourite_video", {
    description : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [3, 45]
        }
    },    
    CreationTime : {
        type : DataTypes.DATE,
        allowNull : false
    }
});

module.exports = FavouriteVideo;
const jwt = require('jsonwebtoken');
const jwtKey = require('../config').keys.jwt;
//const mongoose = require('mongoose');

exports.sign = async (body) => {
    return new Promise((res, rej) => {
        jwt.sign(body, jwtKey, (err, token) => {
            if (err) {
                console.error(err);
                rej(err);
            }
            res(token);
        });
    });
};
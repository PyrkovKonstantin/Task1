const mongoose = require('mongoose');
const {User} = require('../schema');
const bcrypt = require('bcryptjs');
const jwt = require('../lib/jwt')
const { conflict, notFound } = require('boom');

exports.registr = async(login, email, password) => {
    const user = User.findOne({email});
    if(user) throw conflict ('User has already exsist');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    await User({ login, email, password: hash}).save();
    return { message: 'ok' };
};

exports.login = async(email, password) => {
    const user = User.findOne({email});
    if(!user) throw notFound ('User not found!');
    const passwordResult = bcrypt.compareSync(password, user.password);
    if (!passwordResult) throw conflict('Password not pass!');
    const token = await jwt.sign({
         _id: user._id,
         email: user.email,
    });
    return {token};
};

exports.resetPassword = async (_id ) => {
    const user = User.findById(_id);
    if (!user) throw notFound('User not found!');
    const defoltPassword = '0000';
    const salt = bcrypt.genSaltSync(10);
    const defoltPasswordhash = bcrypt.hashSync(defoltPassword, salt);
    await Admin.updateOne({ _id }, { $set: { password: defoltPasswordhash}});
    return { message: 'ok' };
};

exports.getUsers = async () => {
    const users = await User.find({}, { password: 0 });
    return { users };
};
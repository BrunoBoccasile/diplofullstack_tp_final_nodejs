import User from "../models/user.model.js";

export function createUser(data) {
    return User.create(data);
}

export function findUserById(userId) {
    return User.findById(userId);
}


export function findUserByEmail(email) {
    return User.findOne({ email });
}


export function findAllUsers() {
    return User.find();
}


export function deleteUserById(userId) {
    return User.findByIdAndDelete(userId);
}

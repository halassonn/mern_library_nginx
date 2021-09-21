/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   UserModel.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 13:03:39 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 13:03:40 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
      nik: {
        type: String,
        required: true,
        unique:true
      },
      nama: {
        type: String,
        required: true,
      },
      kode_kantor: {
        type: String,
        required: true,
      },
      nama_kantor: {
        type: String,
        required: true,
      },
      register_date: {
        type: Date,
        default: Date.now,
      },
      createdBy: { type: String, default: "System" },
      updatedBy: { type: String, default: "" },
    },
    { timestamps: true, versionKey: false }
  );
  
  UserSchema.pre("save", async function (next) {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(this.password, salt);
      this.password = hashpassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
      return await bcrypt.compare(newPassword, this.password);
    } catch (eror) {
      throw new Error(error);
    }
  };
  
  //create a model
  const User = mongoose.model("users", UserSchema);
  module.exports = User;
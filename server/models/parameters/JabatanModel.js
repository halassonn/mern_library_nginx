/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   JabatanModel.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 10:22:53 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 10:22:53 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ParameterJabatanSchema = new Schema(
  {
    kode: {
      type: String,
      required: true,
      maxlength: 8,
    },
    desc: {
      type: String,
      required: true,
    },
    kode_tingkat_jabatan:{
      type: String,
      required: true,
    },
    leader:{
      type:Boolean,
      default:false
    },
    createdBy: { type: String, default: "System" },
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const Jabatan = mongoose.model("p_jabatans", ParameterJabatanSchema);
module.exports = Jabatan;

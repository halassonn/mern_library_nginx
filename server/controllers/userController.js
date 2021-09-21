/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userController.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 13:03:35 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 15:03:49 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const User = require("../models/UserModel");
const Karyawan = require("../models/KaryawanModel");
const DataKantor = require("../models/parameters/DatakantorModel");
const AsyncManager = require("../utils/asyncManager");
const redis_client = require("../database/redisconnect");
const JWT = require("jsonwebtoken");

const { setLogs } = require("./logcontroller");

access_token = ({ id, iss, level, avatar, username }) => {
    const token = JWT.sign(
        { sub: id, iss, level, avatar, username },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
        }
    );
    return token;
};
refresh_token = ({ id, iss }) => {
    const refresh = JWT.sign(
        { sub: id, iss },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
        }
    );

    redis_client.get(id.toString(), (err, data) => {
        console.log(err);
        if (err) throw err;
        redis_client.set(id.toString(), JSON.stringify(refresh));
    });

    return refresh;
};

module.exports = {
    Login: async (req, res) => {
        try {
            const { user } = req;
            console.log(user);
            // const datauserdetail = await Karyawan.findOne({ nik: user.nik });
            const accessToken = access_token({
                id: user._id,
                iss: "gandaGroup",
            });
            const refreshToken = refresh_token({
                id: user._id,
                iss: "gandaGroup",
            });

            return res.status(200).json({
                accessToken,
                refreshToken,
                level: user.level,
                username: user.username,
            });
        } catch (error) {
            console.log(error);
        }
    },
    Logout: async (req, res) => {
        try {
            const token = req.token;
            const user = req.user;
            redis_client.del(user._id.toString());
            // return redis a Blacklist Accesstoken
            redis_client.set("BL_" + user._id, token);
            return res.status(200).json({ status: "true", msg: "success" });
        } catch (error) {
            console.log(error);
        }
    },
};

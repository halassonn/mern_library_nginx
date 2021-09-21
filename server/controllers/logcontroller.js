/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logcontroller.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 13:02:11 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 13:05:03 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { LogApp } = require("../models/LogModel");
const AsyncManager = require("../utils/asyncManager");

module.exports = {
    getLogs: AsyncManager(async (req, res, next) => {
        let cachedData;
        let cacheTime;
        if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
            // BTW - set a cache header so browsers work WITH you.
            // WOW awesome stuff I learned at least 2 new things today @CodingGarden - what is you opinion on using manual cache instead of 'Cache-Control' ie res set('Cache-Control', 'public, max-age=300, s-maxage=600')
            return res.json(cachedData);
        }
        await LogApp.find({})
            .then((data) => {
                // console.log("data: ", data);
                cachedData = data;
                cacheTime = Date.now();
                data.cacheTime = cacheTime;

                return res.status(200).json({
                    success: true,
                    msg: null,
                    id: "logapps",
                    data: data,
                });
            })
            .catch((err) => {
                console.log("errrr: ", err);
                next(err);
            });
    }),
    setLogs: AsyncManager(
        async ({ user, kantor, action, method, status_code, ket }) => {
            // console.log(user,kantor)

            const newLogs = new LogApp({
                user,
                kantor,
                action,
                method,
                status_code,
                ket: ket,
            });
            //  console.log(newLogs)
            try {
                await newLogs
                    .save()
                    .then(() => {
                        console.log("save log... ", action);
                        console.log("===save log=== : ", ket);
                    })
                    .catch((error) => {
                        console.error(
                            `error log persediaan at ${action}`,
                            error
                        );
                    });
            } catch (e) {
                console.error(e);
            }
        }
    ),
};

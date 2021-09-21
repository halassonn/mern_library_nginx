/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   redisconnect.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 13:15:21 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 14:58:27 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const redis = require("redis");

const redis_client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST
);

redis_client.on("connect", function () {
    console.log(
        "=======================redis connect on  ****************************:  ",
        process.env.REDIS_HOST
    );
});

module.exports = redis_client;

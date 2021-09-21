/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 15:07:31 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 15:07:32 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { Login, Logout } = require("../controllers/userController");
const router = require("express-promise-router")();

const {
    loginpassport,
    passportaccesstoken,
    veryfyRefreshTokenonRedis,
    verifyAccessToken,
    verify_X_API_KEY,
} = require("../middleware/authMiddleware");

router.route("/login").post([verify_X_API_KEY, loginpassport], Login);
router.route("/logout").post([verify_X_API_KEY,passportaccesstoken], Logout);

module.exports = router;

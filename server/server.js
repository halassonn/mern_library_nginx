/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   server.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: halasson <halasson@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/09/21 09:51:30 by halasson          #+#    #+#             */
/*   Updated: 2021/09/21 11:01:39 by halasson         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const ErrorsMiddleware = require("./middleware/errorMiddleware");
const LibraryError = require("./utils/libraryError");
const karyawanRoutes = require("./routes/karyawanRoutes");
const Feeding = require("./Feed");

process.on("uncaughtException", (error) => {
    console.log(error);
    console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);

    process.exit(1);
});

//Initialize the app
const app = express();

connectToDB().then(() => {
    Feeding();
});

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    res.json({
        Hi: "welcome to junggle bro",
    });
});

app.use("/api/v1/", karyawanRoutes);

// Error middleware
app.all("*", (req, res, next) => {
    next(
        new LibraryError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});
app.use(ErrorsMiddleware);

// Make the sever listen on the declared PORT variable
const server = app.listen(
    PORT,
    console.log(
        `Server running in  ${process.env.NODE_ENV} mode on port ${PORT} http://localhost:${PORT}/test`
    )
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log(error);
    console.log("Unhandled Rejection..... 💣 🔥 stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        // exit code 1 means that there is an issue that caused the program to exit
        process.exit(1);
    });
});

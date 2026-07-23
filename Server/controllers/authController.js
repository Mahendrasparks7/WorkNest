const fs = require("fs");
const path = require("path");


// ========================================
// PATH TO db.json
// ========================================

const dbPath = path.join(
    __dirname,
    "../data/db.json"
);


// ========================================
// SIGNUP
// ========================================

const signup = (req, res) => {

    try {

        // Get data from frontend
        const {
            name,
            email,
            password
        } = req.body;


        // ========================================
        // VALIDATE INPUT
        // ========================================

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Name, email and password are required."

            });

        }


        // ========================================
        // READ db.json
        // ========================================

        const data = fs.readFileSync(
            dbPath,
            "utf-8"
        );


        const db = JSON.parse(data);


        // ========================================
        // CHECK IF USER ALREADY EXISTS
        // ========================================

        const existingUser = db.users.find(

            (user) =>
                user.email.toLowerCase() ===
                email.toLowerCase()

        );


        if (existingUser) {

            return res.status(409).json({

                message:
                    "An account with this email already exists."

            });

        }


        // ========================================
        // CREATE NEW USER
        // ========================================

        const newUser = {

            id:
                Date.now().toString(),

            name:
                name,

            email:
                email,

            password:
                password,

            createdAt:
                new Date().toISOString()

        };


        // ========================================
        // ADD USER TO db.json
        // ========================================

        db.users.push(
            newUser
        );


        // ========================================
        // SAVE UPDATED db.json
        // ========================================

        fs.writeFileSync(

            dbPath,

            JSON.stringify(
                db,
                null,
                2
            )

        );


        // ========================================
        // SEND SUCCESS RESPONSE
        // ========================================

        return res.status(201).json({

            message:
                "Account created successfully.",

            user: {

                id:
                    newUser.id,

                name:
                    newUser.name,

                email:
                    newUser.email

            }

        });


    } catch (error) {

        console.error(
            "Signup Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// LOGIN
// ========================================

const login = (req, res) => {

    try {

        // Get data from frontend
        const {
            email,
            password
        } = req.body;


        // ========================================
        // VALIDATE INPUT
        // ========================================

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Email and password are required."

            });

        }


        // ========================================
        // READ db.json
        // ========================================

        const data = fs.readFileSync(

            dbPath,

            "utf-8"

        );


        const db = JSON.parse(data);


        // ========================================
        // FIND USER
        // ========================================

        const user = db.users.find(

            (user) =>

                user.email.toLowerCase() ===
                email.toLowerCase()

        );


        // ========================================
        // USER NOT FOUND
        // ========================================

        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        // ========================================
        // CHECK PASSWORD
        // ========================================

        if (
            user.password !==
            password
        ) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        // ========================================
        // LOGIN SUCCESS
        // ========================================

        return res.status(200).json({

            message:
                "Login successful.",

            user: {

                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email

            }

        });


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// EXPORT FUNCTIONS
// ========================================

module.exports = {

    signup,

    login

};
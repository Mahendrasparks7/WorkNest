const fs = require("fs");
const path = require("path");


// ========================================
// DATABASE PATH
// ========================================

const dbPath = path.join(
    __dirname,
    "../data/db.json"
);


// ========================================
// CREATE WORKSPACE
// ========================================

const createWorkspace = (req, res) => {

    try {

        const {
            name,
            description,
            ownerId
        } = req.body;


        // ========================================
        // VALIDATION
        // ========================================

        if (
            !name ||
            !name.trim()
        ) {

            return res.status(400).json({

                message:
                    "Workspace name is required."

            });

        }


        if (!ownerId) {

            return res.status(400).json({

                message:
                    "Owner ID is required."

            });

        }


        // ========================================
        // READ DATABASE
        // ========================================

        const data =
            fs.readFileSync(

                dbPath,

                "utf-8"

            );


        const db =
            JSON.parse(data);


        // ========================================
        // CHECK USER
        // ========================================

        const user =
            db.users.find(

                (user) =>

                    user.id ===
                    ownerId

            );


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found."

            });

        }


        // ========================================
        // CREATE WORKSPACE
        // ========================================

        const workspace = {

            id:
                Date.now().toString(),

            name:
                name.trim(),

            description:
                description
                    ? description.trim()
                    : "",

            ownerId:
                ownerId,

            createdAt:
                new Date().toISOString()

        };


        // ========================================
        // ADD WORKSPACE
        // ========================================

        db.workspaces.push(

            workspace

        );


        // ========================================
        // SAVE DATABASE
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
        // RESPONSE
        // ========================================

        return res.status(201).json({

            message:
                "Workspace created successfully.",

            workspace:
                workspace

        });


    } catch (error) {

        console.error(

            "Create Workspace Error:",

            error

        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// GET USER WORKSPACES
// ========================================

const getUserWorkspaces = (req, res) => {

    try {

        const {
            ownerId
        } = req.params;


        // ========================================
        // READ DATABASE
        // ========================================

        const data =
            fs.readFileSync(

                dbPath,

                "utf-8"

            );


        const db =
            JSON.parse(data);


        // ========================================
        // FIND WORKSPACES
        // ========================================

        const workspaces =

            db.workspaces.filter(

                (workspace) =>

                    workspace.ownerId ===
                    ownerId

            );


        // ========================================
        // RESPONSE
        // ========================================

        return res.status(200).json({

            workspaces:
                workspaces

        });


    } catch (error) {

        console.error(

            "Get Workspace Error:",

            error

        );


        return res.status(500).json({

            message:
                "Internal server error."

        });

    }

};


// ========================================
// EXPORT
// ========================================

module.exports = {

    createWorkspace,

    getUserWorkspaces

};
const express = require("express");
const cors = require("cors");


// ========================================
// IMPORT ROUTES
// ========================================

// Authentication routes
const taskRoutes =
    require("./Server/routes/task.js");
const authRoutes =
    require("./Server/routes/auth.js");


// Workspace routes
const workspaceRoutes =
    require("./Server/routes/workspace.js");


// ========================================
// CREATE EXPRESS APPLICATION
// ========================================

const app =
    express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
    cors()
);

app.use(
    express.json()
);
app.use(
    "/api/tasks",
    taskRoutes
);


// ========================================
// TEST ROUTE
// ========================================

app.get(
    "/",
    (req, res) => {

        res.json({

            message:
                "WorkNest Server is running!"

        });

    }
);


// ========================================
// AUTHENTICATION ROUTES
// ========================================

app.use(
    "/api/auth",
    authRoutes
);


// ========================================
// WORKSPACE ROUTES
// ========================================

app.use(
    "/api/workspaces",
    workspaceRoutes
);


// ========================================
// START SERVER
// ========================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    () => {

        console.log(

            `WorkNest Server running on port ${PORT}`

        );

    }
);
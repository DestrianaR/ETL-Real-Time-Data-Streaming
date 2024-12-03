// Switch to the 'admin' database
db = db.getSiblingDB("admin");

// Create the root user with global access
db.createUser({
    user: "root",
    pwd: "example",
    roles: [
        {
            role: "root",
            db: "admin"
        }
    ]
});

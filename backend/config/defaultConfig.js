const defaultPermissions = {
    "dashboard": {
        "view": true,
        "create": true,
        "delete": true,
        "update": true
    },
    "users": {
        "view": false,
        "create": false,
        "delete": false,
        "update": false
    },
    "projects": {
        "view": false,
        "create": false,
        "delete": false,
        "update": false
    },
    "support": {
        "view": true,
        "create": true,
        "delete": true,
        "update": true
    },
    "roles": {
        "view": false,
        "create": false,
        "delete": false,
        "update": false
    },
    "leads": {
        "view": false,
        "create": false,
        "delete": false,
        "update": false
    }
};


module.exports = defaultPermissions;
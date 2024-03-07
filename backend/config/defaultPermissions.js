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
    },
    "notification": {
        "view": true,
        "create": false,
        "delete": false,
        "update": false
    },
    "tasks":{
        "view": false,
        "create": false,
        "delete": false,
        "update": false
    },
    "tickets":{
        "view": true,
        "create": true,
        "delete": true,
        "update": true
    }
};


module.exports = defaultPermissions;
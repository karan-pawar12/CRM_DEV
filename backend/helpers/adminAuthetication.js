const JWT = require('jsonwebtoken');

const SECRET = "cb4da6f3-8f45-4b99-95f7-0235cf541f6e";

module.exports = {
    signAccessToken: (obj) => {
        return new Promise((resolve, reject) => {
            const { _id, firstName, lastName, email, phone, role, managers, createdBy, updatedBy } = obj;

            const payload = { _id, firstName, lastName, email, phone, role, managers, createdBy, updatedBy };
            const secret = SECRET;

            JWT.sign(payload, secret, (err, token) => {
                if (err) reject(err)
                resolve(token);
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        try {

            const token = req.headers.authorization.split(" ")[1];
            //const token = req.body.token;    


            if (!token)
                return res.status(401).end('Unauthorized');

            const secret = SECRET;


            JWT.verify(token, secret, (err, payload) => {
                if (err) {
                    console.log(err.message);
                    return res.status(401).end('Unauthorized');
                }

                req.payload = payload;
                if (req.payload.role[0] === "admin") {
                    next();
                }
                else {
                    return res.status(401).end('Unauthorized');
                }

            });



        } catch (err) {
            console.log(err);
            res.status(401).end('Unauthorized');
        }
    }
}
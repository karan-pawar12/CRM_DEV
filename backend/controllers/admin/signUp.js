const User = require('../../schema/user');

module.exports = async function(req,res,next){
    try{
        console.log(req.body);
        const { firstName, lastName, email, phone, password } = req.body;

       
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
        });

        // Save the user data to the database
        const result = await newUser.save();

        res.json(result);
        

    }catch(e){
        console.log(e.message);
        return res.status(500).end();
    }
}
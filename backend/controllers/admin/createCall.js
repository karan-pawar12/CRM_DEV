const {getCallModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const { contactType, contactId, callOwnerId, callType, status, from, callstartTime, subject, reminder, purpose, description,createdBy=_id,updatedBy=_id } = req.body;
        const Call = await getCallModel(tenantId);
        let call = null;
        try{
            call = await new Call({contactType, contactId, callOwnerId, callType, status, from, callstartTime, subject, reminder, purpose, description,createdBy,updatedBy}).save();
            res.status(201).json(call);
        }catch(error){
            console.log(error.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
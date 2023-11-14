const {getCallModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const { contactType, contactId, callOwnerId, callType, status, from, callstartTime, subject, reminder, purpose, description,createdBy=_id,updatedBy=_id } = req.body;
        const Call = await getCallModel(tenantId);
        let call = null;
        try{
            call = await new Call({contactType, contactId, callOwnerId, callType, status, from, callstartTime, subject, reminder, purpose, description,createdBy,updatedBy}).save();
            res.json(call);
        }catch(e){
            console.log(e.message);
            return res.status(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}
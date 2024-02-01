const { getTicketModel } = require('../../db/tenantDb');
const { Parser } = require('@json2csv/plainjs');
const fs = require('fs');

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const Ticket = await getTicketModel(tenantId);

        



        const ticketData = await Ticket.find({});

        const opts = {
            fields: [
                {
                    label: 'Subject',
                    value: 'subject'
                },
                {
                    label: 'Ticket Type',
                    value: 'type'
                },
                {
                    label: 'Status',
                    value: 'status'
                },
                {
                    label: 'Priority',
                    value: 'priority'
                },
                {
                    label: 'Product',
                    value: 'product'
                },
                {
                    label: 'Description',
                    value: 'description'
                }
            ]
        }

        const parser = new Parser(opts);
        const csv = parser.parse(ticketData);
        res.type('text/csv')
        res.attachment('ticketData.csv');
        res.send(csv);







    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
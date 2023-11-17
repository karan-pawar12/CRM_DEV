const {getProductModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const { productName, productCode, vendorName, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, priceInfo, createdBy = _id, updatedBy = _id, description } = req.body;
        const Product = await getProductModel(tenantId);
        let product = null;
        try {
            product = await new Product({ productName, productCode, vendorName, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, priceInfo, createdBy, updatedBy, description });
            res.status(201).json(product);
        } catch (error) {
            console.log(error.message);
            return res.status(500).end();
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
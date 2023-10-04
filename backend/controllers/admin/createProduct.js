const Product = require('../../schema/product');

module.exports = async function (req, res, next) {
    try {
        const { _id } = req.payload;
        const { productName, productCode, vendorName, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, priceInfo, createdBy = _id, updatedBy = _id, description } = req.body;
        let product = null;
        try {
            product = await new Product({ productName, productCode, vendorName, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, priceInfo, createdBy, updatedBy, description });
            res.json(product);
        } catch (e) {
            console.log(e.message);
            return res.status(500).end();
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}
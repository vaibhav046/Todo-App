const bucketSchema = require('../bucketResponse.json');
/**
 * Billing Route include stripe billing api.
 * Contracts [Stripe Credits:'/api/stripe']
 * @param {*} app 
 */
module.exports = (app) => {
    app.get('/api/buckets', (req, res) => {
        if (bucketSchema) {
            res.send(bucketSchema).status(200);
        }
    });

    app.post('/api/buckets', (req, res) => {
        let newBucket = req.body.payload;
        bucketSchema.push(newBucket);
        res.status(200);
    });

    app.put('/api/buckets', (req, res) => {
        let { item, editBucketIndex } = req.body.updatedItem;
        let updated = false;
        bucketSchema[editBucketIndex] = item;
        if (updated)
            res.send(bucketSchema).status(200);
        else
            res.send(bucketSchema).status(400);
    });

    app.post('/api/buckets/delete', (req, res) => {
        let { bucketItemIndex } = req.body;
        if (bucketSchema && bucketSchema[bucketItemIndex]) {
            bucketSchema.splice(bucketItemIndex, 1);
            res.send(bucketSchema).status(200);
        }
        else
            res.send([]).status(400);
    });
};
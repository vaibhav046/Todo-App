const bucketSchema = require('../bucketResponse.json');
/**
 * Billing Route include stripe billing api.
 * Contracts [Stripe Credits:'/api/stripe']
 * @param {*} app 
 */
module.exports = (app) => {
    app.get('/api/todo', (req, res) => {
        if (bucketSchema) {
            res.send(bucketSchema).status(200);
        }
    });

    app.post('/api/todo', (req, res) => {
        let { bucket, listItem } = req.body;
        bucketSchema.map(x => {
            if (x.title === bucket) {
                x.TodoLists.push(listItem);
            }
        })
        res.send(bucket).status(200);
    });

    app.put('/api/todo', (req, res) => {
        let { item, updateListItemIndex, complete } = req.body.updatedItem;
        let updated = false;
        bucketSchema.map(x => {
            if (x.title === item.title) {
                if (complete) {
                    x.TodoLists[updateListItemIndex].completed = true;
                    updated = true;
                }
                else {
                    x.TodoLists[updateListItemIndex].title = item.TodoLists[updateListItemIndex].title;
                    updated = true;
                }
            }
        });
        if (updated)
            res.send(bucketSchema).status(200);
        else
            res.send([]).status(400);
    });

    app.post('/api/todo/delete', (req, res) => {
        let { bucketItemIndex, todoItemIndex } = req.body;

        console.log(bucketItemIndex, todoItemIndex);
        // let bucketIndex = bucketSchema.filter((x, index) => { if (x === item) return index });
        if (bucketSchema && bucketSchema[bucketItemIndex] && bucketSchema[bucketItemIndex].TodoLists && bucketSchema[bucketItemIndex].TodoLists[todoItemIndex]) {
            bucketSchema[bucketItemIndex].TodoLists.splice(todoItemIndex, 1);
            res.send(bucketSchema).status(200);
        }
        else
            res.send([]).status(400);
    });
};
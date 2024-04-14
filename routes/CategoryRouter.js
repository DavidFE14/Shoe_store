const express = require('express');
const router = express.Router();
const Cart = require('../models/Category');
const Category = require('../models/Category');

// get all category
router.get('/', (req, res) => {
    const list = Category.find().exec();
    list.then((items) => {
        return res.status(200).send(items.map(category => {
            return {
                cat_id: category.id,
                catname: category.catname
            };
        }));
    })
        .catch(err => {
            return res.status(500).send(err);
        });
})
// add category
router.post('/', (req, res) => {
    const category = new Category(req.body);
    category.save()
        .then((item) => {
            return res.status(200).send({
                cat_id: item.id,
                catname: item.catname
            });
        })
        .catch(err => {
            return res.status(500).send(err);
        });

})
// delete category
router.delete('/:cat_id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.cat_id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
});
// edit category
router.put('/:cat_id', (req, res) => {
    Category.findByIdAndUpdate(req.params.cat_id, req.body, { new: true }).then((category) => {
        if (!category) {
            return res.status(404).send({
                message: 'category not found'
            });
        }
        return res.status(200).send(category);
    }).catch((err) => {
        return res.status(500).send({
            message: 'Error updating category'
        });
    });
});
module.exports = router;
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  try {
    const categoryInfo = await Category.FindAll({
      include: [{model : Product}]
    })
    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    // find one category by its `id` value
    const categoryInfo = await Category.findByPk(req.params.id, {
       // be sure to include its associated Products
      include: [{model : Product}]
    })
    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  const categoryInfo = await Category.craete(req.body);
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;

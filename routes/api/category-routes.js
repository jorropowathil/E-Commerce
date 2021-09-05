const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async(req, res) => {
  try {
    const categoryInfo = await Category.FindAll({
      include: [{model : Product}]
    })
    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async(req, res) => {
  try {
      // create a new category
    const categoryInfo = await Category.craete(req.body);
    res.status(200).json(categoryInfo);
  } catch (error) {
    res.status(500).json(categoryInfo);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryInfo = await Category.update(req.body, {
      where: {
        id: req.params.id
        },
      }); 
      if (!categoryInfo.id) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryInfo);
  } 
  catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy(req.body, {
      where: {
        id: req.params.id
        },
      }); 
      if (!categoryInfo.id) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryInfo);
  } 
  catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;

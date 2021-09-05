const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get ('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      attributes: ['id', 'product_name', 'price', 'stock'],
      model: Product,
    }
    }).then((tagInfo) => {
        res.json(tagInfo)
    })
});

router.get  ('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne ({
    where: {
      id: req.params.id,
    },
    include : {
      model: Product,
       // be sure to include its associated Product data
      attributes: ['id', 'product_name', 'price', 'stock'],
    }
    .then((tagInfo) => {
      res.json(tagInfo);
    })
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
      tag_name: req.body.tag_name
  })
  .then((newTag) => {
      res.join(newTag)
  })
  .catch((err) => {
      res.json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  })
  .then((tagUpdated) => {
    res.join(tagUpdated)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    tag_name: req.body.tag_name
  })
  .then((tagDeleted) => {
    res.join(tagDeleted)
  })
  .catch((err) => {
    res.json(err)
  })
});

module.exports = router;


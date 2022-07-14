const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    Tag.findAll({
      include: [
        {
          model: Product,
          as: 'tag_id',
          attributes: ['id'],
        },
      ],
    })
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });


})
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: 'tag_id',
        attributes: ['id'],
      },
    ],
  })
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  //* expects {"tag_name":"example"}

  Tag.create(req.body)
    .then((dbData) => {
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(req.body, { where: { id: req.params.id } })
    .then((dbData) => {
      if(!dbData){
        return(res.status(404).json({message:"No matching Id"}))
      }
      res.json({message:"Update complete"});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: req.params.iod })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json({ message: 'Record deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

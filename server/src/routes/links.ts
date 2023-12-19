import { Router, Request, Response } from 'express';
import LinksModel, { ILink } from '../database/models/LinksModel';
import { body, validationResult } from 'express-validator';

const router = Router();

const LinkValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('path').notEmpty().withMessage('Path is required'),
];

/**
 * @swagger
 * /links/:
 *   post:
 *     summary: Put in new Link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: link name
 *               path:
 *                 type: string
 *                 description: link path
 *     responses:
 *       201:
 *         description: Created
*/
router.post('/', LinkValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log("Create new element called with data:")
    console.log(req.body)
    
    const link: ILink = {
        name: req.body.name,
        path: req.body.path
    };

    try{
      await LinksModel.insertMany(link);
      console.log("data has been")
    }
    catch(error){
      console.log(error)
      res.status(500).json({error: 'Internal Server Error'})
    }
    res.status(201).json(link);
});

/**
 * @swagger
 * /links/:
 *   get:
 *     summary: Get all Links
 *     description: Get all previous created Links
 *     responses:
 *       200:
 *         description: list of Links
 */
router.get('/', async(req: Request, res: Response) => {
    console.log("get all called")
    const links = await LinksModel.find()
    const mappedLinks: ILink[] = links.map(l => l.toJSON())
    res.json(mappedLinks);
});

/**
 * @swagger
 * /links/{name}:
 *   get:
 *     summary: Get specific Link
 *     description: Get a specific Link by id
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Link name to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: list of Links
 */
router.get('/:name', async(req: Request, res: Response) => {
    console.log('Get with name called: ' + req.params.name)
    const links = await LinksModel.find({name: req.params.name})
    const receivedLinks = links.map(l => l.toJSON())

    if (receivedLinks.length === 0) {
        res.status(404).send('Link not found');
    } else {
        res.json(receivedLinks);
    }
});

/**
 * @swagger
 * /links/{name}:
 *   put:
 *     summary: Update Link
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of link to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: new name of link
 *               path:
 *                 type: string
 *                 description: Path of link
 *     responses:
 *       201:
 *         description: Updated
*/
router.put('/:name', LinkValidationRules, async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Update called for name " + req.params.name)
    const result = await LinksModel.updateMany({name:req.params.name}, {$set: {name: req.body.name, path: req.body.path}})

    const links = await LinksModel.find({name: req.body.name})
    const receivedLinks = links.map(l => l.toJSON())
    res.json(receivedLinks);
    
  });

/**
 * @swagger
 * /links/{name}:
 *   delete:
 *     summary: Delete specific Link
 *     description: Delete a specific Link by id
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Numeric ID of the Link to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: list of Links
 */
  router.delete('/:name', async(req: Request, res: Response) => {
    console.log("Delete called for name " + req.params.name)
    const result = await LinksModel.deleteMany({name: req.params.name})

    res.status(204).send();
  });
export default router;
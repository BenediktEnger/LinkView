"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
let Links = [];
const LinkValidationRules = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('amount').notEmpty().withMessage('Amount is required'),
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
 *               amount:
 *                 type: number
 *                 description: link amount
 *     responses:
 *       201:
 *         description: Created
*/
router.post('/', LinkValidationRules, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const Link = {
        id: Links.length + 1,
        name: req.body.name,
        path: req.body.path
    };
    Links.push(Link);
    res.status(201).json(Link);
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
router.get('/', (req, res) => {
    res.json(Links);
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
router.get('/:name', (req, res) => {
    const Link = Links.find((t) => t.name === req.params.name);
    if (!Link) {
        res.status(404).send('Link not found');
    }
    else {
        res.json(Link);
    }
});
/**
 * @swagger
 * /links/{id}:
 *   put:
 *     summary: Update Link
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of link to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: stromg
 *                 description: Name of link
 *               amount:
 *                 type: integer
 *                 description: Amount of link
 *     responses:
 *       201:
 *         description: Updated
*/
router.put('/:id', LinkValidationRules, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const index = Links.findIndex((t) => t.id === parseInt(req.params.id));
    if (index == -1) {
        res.status(404).send('Link not found');
    }
    else {
        Links[index].name = req.body.name || Links[index].name;
        Links[index].path = req.body.amount || Links[index].path;
        res.json(Links[index]);
    }
});
/**
 * @swagger
 * /links/{id}:
 *   delete:
 *     summary: Delete specific Link
 *     description: Delete a specific Link by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the Link to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: list of Links
 */
router.delete('/:id', (req, res) => {
    const index = Links.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Link not found');
    }
    else {
        Links.splice(index, 1);
        res.status(204).send();
    }
});
exports.default = router;

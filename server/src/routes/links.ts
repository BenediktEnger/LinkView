import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ILink } from "../models/ILink";
import { dataAccessLayer } from "../models/Mongoose/MongooseDataAccess";
import LinkSchema from "../models/Mongoose/LinkSchema";

const router = Router();
const modelName = "Links";
const LinkValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("link").notEmpty().withMessage("link is required"),
  body("imageSource").notEmpty().withMessage("imageSource is required"),
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
 *               link:
 *                 type: string
 *                 description: link link
 *               imageSource:
 *                 type: string
 *                 description: link link
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", LinkValidationRules, async (req: Request, res: Response) => {
  console.log("Create new element called with data:");
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const link: ILink[] = [
    {
      name: req.body.name,
      link: req.body.link,
      imageSource: req.body.imageSource,
    },
  ];

  try {
    const model = dataAccessLayer.getModel(modelName, LinkSchema);
    await dataAccessLayer.insertMany(model, link);
    console.log("data has been written");
    res.status(201).json(link);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
router.get("/", async (req: Request, res: Response) => {
  console.log("get all called");
  const model = dataAccessLayer.getModel<ILink>(modelName, LinkSchema);
  const links = await dataAccessLayer.find(model, {});
  if (links !== null) {
    res.json(links);
  } else res.status(404).json({ error: "No Links found" });
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
router.get("/:name", async (req: Request, res: Response) => {
  console.log("Get with name called: " + req.params.name);
  const model = dataAccessLayer.getModel<ILink>(modelName, LinkSchema);
  const links = await dataAccessLayer.find(model, { name: req.params.name });
  if (links) {
    const receivedLinks = links.map((l) => l);

    if (receivedLinks.length === 0) {
      res.status(404).send("Link not found");
    } else {
      res.json(receivedLinks);
    }
  }
  res.status(404);
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
 *               link:
 *                 type: string
 *                 description: link of link
 *               imageSource:
 *                 type: string
 *                 description: source of image
 *     responses:
 *       201:
 *         description: Updated
 */
router.put(
  "/:name",
  LinkValidationRules,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Update called for name " + req.params.name);

    const model = dataAccessLayer.getModel<ILink>(modelName, LinkSchema);
    const foundLink = await dataAccessLayer.find(model, {
      name: req.params.name,
    });
    if (foundLink !== null && foundLink!.length !== 0) {
      await dataAccessLayer.updateMany(
        model,
        { name: req.params.name },
        {
          $set: {
            name: req.body.name,
            link: req.body.link,
            imageSource: req.body.imageSource,
          },
        }
      );
      const links = await dataAccessLayer.find(model, { name: req.body.name });
      res.json(links);
    } else res.status(404).json({ error: "link to update not found" });
  }
);

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
router.delete("/:name", async (req: Request, res: Response) => {
  console.log("Delete called for name " + req.params.name);
  const model = dataAccessLayer.getModel<ILink>(modelName, LinkSchema);
  const result = await dataAccessLayer.deleteMany(model, {
    name: req.params.name,
  });
  console.log(result);
  res.json(result);
});

export { router };

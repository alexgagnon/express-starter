import { Router } from 'express';
// import FilesController from './FileController.js';
const router = Router();

// const filesController = new FilesController();

/**
 *  @openapi
 *  /:
 *    get:
 *      summary: Download file
 *      description: Download a file from the file system
 *      parameters:
 *        -
 *      responses:
 *
 *        200:
 *          description: A simple message
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *
 */
// router.get('/', filesController.getAll);
// router.get('/:id', filesController.get);

// router.post('/', filesController.create);
// router.post('/bulk', filesController.createAll);

// router.put('/:id', filesController.replace);
// router.put('/bulk', filesController.replaceAll);

// router.patch('/:id', filesController.update);
// router.patch('/bulk', filesController.updateAll);

// router.delete('/:id', filesController.remove);
// router.delete('/bulk', filesController.removeAll);

export default router;

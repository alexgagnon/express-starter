import type { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { File } from './FileModel.js';

const files: File[] = [
  { path: '/hello', lastModifiedDate: new Date(), createdDate: new Date() }
];

export default class FilesController {
  getAll(_: Request, res: Response) {
    return res.json(files);
  }

  get() {
    return 'blah';
  }

  create(req: Request, res: Response) {
    try {
      const file = File.parse(req.body);
      files.push(file);
      return res.json(file);
    } catch (err) {
      req.log.error(`Could not parse: ${req.body}`);
      createHttpError(400, 'Does not match schema');
    }
  }
}

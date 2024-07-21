import type { Request, Response } from 'express';
import { User, UserEntry } from './UserModel.js';
import { v4 as uuidv4 } from 'uuid';
import { ZodError, ZodIssue } from 'zod';
// import type { File as F } from './FilesDTO.js';

const users: Record<string, User> = {
  'e203a681-481e-4a03-b132-d2ec11607b86': {
    firstName: 'Alex',
    lastName: 'Gagnon',
    roles: ['admin'],
    id: 'e203a681-481e-4a03-b132-d2ec11607b86',
    createdAt: new Date(),
    modifiedAt: new Date()
  }
};

export default class FilesController {
  getAll(_: Request, res: Response) {
    return res.json(Object.values(users));
  }

  get(req: Request, res: Response) {
    const user = users[req.params.id];
    return user ? res.json(user) : res.sendStatus(404);
  }

  createAll(req: Request, res: Response) {
    const newUsers = req.body as UserEntry[];
    const responseBody: Array<{ error: ZodIssue[] } | User> = [];
    newUsers.forEach((u) => {
      try {
        const user = {
          ...UserEntry.parse(u),
          id: uuidv4(),
          createdAt: new Date(),
          modifiedAt: new Date()
        };
        responseBody.push(user);
      } catch (err) {
        if (err instanceof ZodError) {
          responseBody.push({ error: err.issues });
        }
      }
    });
    return res.status(202).json(newUsers);
  }

  create(req: Request, res: Response) {
    const user = req.body as UserEntry;
    try {
      const newUser = {
        ...UserEntry.parse(user),
        id: uuidv4(),
        createdAt: new Date(),
        modifiedAt: new Date()
      };
      users[newUser.id] = newUser;
      return res.json(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json(err.issues);
      }
    }
  }

  replaceAll(req: Request, res: Response) {
    const newUsers = req.body as User[];
    const responseBody: Array<{ error: ZodIssue[] } | User> = [];
    newUsers.forEach((u) => {
      try {
        const user = {
          ...User.parse(u),
          createdAt: new Date(),
          modifiedAt: new Date()
        };
        responseBody.push(user);
      } catch (err) {
        if (err instanceof ZodError) {
          responseBody.push({ error: err.issues });
        }
      }
    });
    return res.status(202).json(newUsers);
  }

  // TODO: should replace or create if not exists
  replace(req: Request, res: Response) {
    try {
      const user = User.parse(req.body);
      if (user.id !== req.params.id) {
        return res
          .status(400)
          .json([
            { path: ['id'], message: 'id in body does not match id in path' }
          ]);
      }
      const newUser = {
        ...user,
        id: req.params.id ?? uuidv4(),
        createdAt: new Date(),
        modifiedAt: new Date()
      };
      users[req.params.id] = newUser;
      return res.json(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json(err.issues);
      }
    }
  }

  updateAll(req: Request, res: Response) {
    const newUsers = req.body as User[];
    const responseBody: Array<{ error: ZodIssue[] } | User> = [];
    newUsers.forEach((u) => {
      try {
        const user = User.parse(u);
        const oldUser = users[user.id];
        const newUser = {
          ...oldUser,
          ...user,
          modifiedAt: new Date()
        };
        User.parse(newUser);
        users[user.id] = newUser;
        responseBody.push(newUser);
      } catch (err) {
        if (err instanceof ZodError) {
          responseBody.push({ error: err.issues });
        }
      }
    });
    return res.status(202).json(newUsers);
  }

  update(req: Request, res: Response) {
    req.log.info('update user');
    if (!users[req.params.id]) {
      return res.sendStatus(404);
    }
    try {
      const user = UserEntry.parse(req.body);
      const oldUser = users[req.params.id];
      const newUser = { ...oldUser, ...user, modifiedAt: new Date() };
      req.log.info(`newUser: ${JSON.stringify(newUser, null, 2)}`);
      User.parse(newUser);
      return res.json(newUser);
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json(err.issues);
      }
    }
  }

  removeAll(_: Request, res: Response) {
    Object.keys(users).forEach((k) => delete users[k]);
    return res.sendStatus(204);
  }

  remove(req: Request, res: Response) {
    if (users[req.params.id]) {
      delete users[req.params.id];
      return res.sendStatus(204);
    }
    return res.sendStatus(404);
  }
}

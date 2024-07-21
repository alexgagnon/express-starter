import type { Request, Response } from 'express';

export function handleNotFound(req: Request, res: Response) {
  req.log.warn(`404 Not Found: ${req.url}`);
  if (req.headers.accept?.includes('text/html')) {
    res.sendFile('404.html', { root: 'public' });
  } else if (req.headers.accept?.includes('application/json')) {
    res.json({ error: 'Not Found' });
  } else {
    res.type('text').send('Not Found');
  }
}

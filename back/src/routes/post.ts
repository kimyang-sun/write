import * as express from 'express';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response) => {
  res.json([{ id: 1, content: 'hello' }]);
});

router.delete('/', (req: express.Request, res: express.Response) => {
  res.json([{ id: 1, content: 'hello' }]);
});

export default router;

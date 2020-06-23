import { Request, Response } from 'express';
import { saveTags, findTags } from '../../database/index';

const getTags = async (req: Request, res: Response): Promise<void> => {
  const tags = await findTags(req.params.ptuuid);
  if (tags instanceof Error) {
    res.sendStatus(500);
  } else {
    res.json({ tags });
  }
};

const postTags = async (req: Request, res: Response): Promise<void> => {
  const { tags } = req.body;
  const saved = await saveTags(tags);
  if (saved instanceof Error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
};

export { getTags, postTags };

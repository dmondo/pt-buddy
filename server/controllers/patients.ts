import { Request, Response } from 'express';
import { savePatients, findPatients } from '../../database/index';

const getPatients = async (req: Request, res: Response): Promise<void> => {
  const patients = await findPatients(req.params.ptuuid);
  if (patients instanceof Error) {
    res.sendStatus(500);
  } else {
    res.json({ patients });
  }
};

const postPatients = async (req: Request, res: Response): Promise<void> => {
  const { patients } = req.body;
  const saved = await savePatients(patients);
  if (saved instanceof Error) {
    res.sendStatus(500);
  } else {
    res.sendStatus(200);
  }
};

export { getPatients, postPatients };

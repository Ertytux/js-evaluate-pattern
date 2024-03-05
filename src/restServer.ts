import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/json', (req: Request, res: Response) => {
  const jsonData = req.body;
  res.json(jsonData);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
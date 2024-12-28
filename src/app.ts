import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './app/Middlewares/globalErrorHandler';
// import notFound from './app/Middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    
  }),
);
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('BLog Website');
});
app.use(globalErrorHandler);
// app.use(notFound);
export default app;

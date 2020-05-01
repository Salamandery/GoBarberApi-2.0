import { Router } from 'express';
import appointmentsRouter from './appointment.routes';

const Routes = Router();

Routes.use('/appointments', appointmentsRouter);

export default Routes;

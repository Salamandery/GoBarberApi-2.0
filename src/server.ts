import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// Rotas do servidor
import Routes from './routes';
// Configuração do multer
import uploadConfig from './config/upload';
// Configuração do banco de dados
import './database';
// Error customizado
import AppError from './errors/AppError';
// Instanciando servidor
const app = express();
// Configurando cors
app.use(cors());
// Configurando servidor pra ler json
app.use(express.json());
// Rota de arquivos
app.use('/files', express.static(uploadConfig.directory));
// Configurando rotas
app.use(Routes);

// Tratando errors customizado da aplicação
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// Instanciando server na porta 3333
app.listen(3333, () => {
  console.log('Rodando');
});

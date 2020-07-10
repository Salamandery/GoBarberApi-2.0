import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// Configuração do multer
import uploadConfig from '@config/upload';
// Rotas do servidor
import Routes from '@shared/infra/http/routes';
// Configuração do banco de dados
import '@shared/infra/typeorm';
// Injeção de dependencias
import '@shared/container';
// Error customizado
import AppError from '@shared/errors/AppError';
// Instanciando servidor
const app = express();
// Configurando Cors permissões de rotas
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

# 🪒 GoBarber API

<div align="center">

![GoBarber](https://img.shields.io/badge/GoBarber-API-orange?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

> **API REST para sistema de agendamento de serviços de barbearia** ✂️

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)](https://prettier.io/)

</div>

---

## 📋 **Sumário**

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏗 Arquitetura e Padrões](#-arquitetura-e-padrões)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [🚀 Instalação e Configuração](#-instalação-e-configuração)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [🔧 Configurações](#-configurações)
- [🧪 Testes](#-testes)
- [📊 Banco de Dados](#-banco-de-dados)
- [🔐 Autenticação](#-autenticação)
- [📝 Padrões de Código](#-padrões-de-código)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 🎯 **Sobre o Projeto**

<div align="center">

![GoBarber](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)

</div>

**GoBarber** é uma API REST desenvolvida em Node.js com TypeScript para gerenciamento de agendamentos de serviços de barbearia. O sistema permite que usuários (clientes e prestadores de serviço) gerenciem seus perfis e agendamentos de forma eficiente.

### ✨ **Funcionalidades Principais**
- 🔐 **Autenticação JWT** - Sistema seguro de login
- 👥 **Gestão de Usuários** - Cadastro e perfil de clientes e prestadores
- 📅 **Agendamentos** - Sistema completo de marcação de horários
- 🔄 **Upload de Arquivos** - Avatar e documentos
- 📊 **Relatórios** - Estatísticas e relatórios de agendamentos

---

## 🛠 **Tecnologias Utilizadas**

### **🖥️ Backend**
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-16+-green) | 16+ | Runtime JavaScript |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3.8+-blue) | 3.8+ | Linguagem tipada |
| ![Express](https://img.shields.io/badge/Express-4.17.1-black) | 4.17.1 | Framework web |
| ![TypeORM](https://img.shields.io/badge/TypeORM-0.2.25-red) | 0.2.25 | ORM para banco de dados |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue) | 12+ | Banco de dados |
| ![JWT](https://img.shields.io/badge/JWT-8.5.1-yellow) | 8.5.1 | Autenticação |

### **🛠️ Desenvolvimento**
| Ferramenta | Descrição |
|------------|-----------|
| ![Jest](https://img.shields.io/badge/Jest-Testing-red) | Framework de testes |
| ![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-yellow) | Linter para JavaScript/TypeScript |
| ![Prettier](https://img.shields.io/badge/Prettier-Code%20Formatting-orange) | Formatador de código |
| ![ts-node-dev](https://img.shields.io/badge/ts--node--dev-Hot%20Reload-green) | Desenvolvimento com hot reload |
| ![tsyringe](https://img.shields.io/badge/tsyringe-DI%20Container-blue) | Injeção de dependência |

---

## 🏗 **Arquitetura e Padrões**

### **🎯 Padrões Arquiteturais**
- **🏛️ Clean Architecture** - Separação clara de responsabilidades
- **🎨 Domain-Driven Design (DDD)** - Modelagem orientada ao domínio
- **⚡ SOLID Principles** - Princípios de design de software
- **🗄️ Repository Pattern** - Abstração de acesso a dados
- **💉 Dependency Injection** - Inversão de controle

### **📦 Estrutura de Módulos**
```
src/
├── 📁 modules/           # Módulos de negócio
│   ├── 👥 users/        # Gerenciamento de usuários
│   └── 📅 appointments/  # Gerenciamento de agendamentos
├── 🔧 shared/           # Código compartilhado
│   ├── 🏗️ infra/       # Infraestrutura (DB, HTTP)
│   ├── ⚠️ errors/      # Tratamento de erros
│   └── 🎯 container/   # Injeção de dependência
└── ⚙️ config/          # Configurações da aplicação
```

---

## 📁 **Estrutura do Projeto**

```
📦 GoBarberApi-2.0
├── 📁 src/
│   ├── 📁 modules/              # Módulos de negócio
│   │   ├── 👥 users/           # Módulo de usuários
│   │   └── 📅 appointments/     # Módulo de agendamentos
│   ├── 🔧 shared/              # Código compartilhado
│   │   ├── 🏗️ infra/          # Infraestrutura
│   │   ├── ⚠️ errors/         # Tratamento de erros
│   │   └── 🎯 container/      # Container DI
│   ├── ⚙️ config/             # Configurações
│   └── 📝 @types/            # Definições de tipos
├── 📊 coverage/              # Relatórios de cobertura
├── 🏗️ dist/                 # Código compilado
└── 📁 tmp/                  # Arquivos temporários
```

---

## ⚙️ **Pré-requisitos**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue?style=for-the-badge&logo=postgresql)
![Yarn](https://img.shields.io/badge/Yarn-1.22+-blue?style=for-the-badge&logo=yarn)

</div>

- **Node.js** 16+
- **PostgreSQL** 12+
- **Yarn** ou **npm**

---

## 🚀 **Instalação e Configuração**

### **1️⃣ Clone o repositório**
```bash
git clone https://github.com/Salamandery/GoBarberApi-2.0.git
cd GoBarberApi-2.0
```

### **2️⃣ Instale as dependências**
```bash
yarn install
# ou
npm install
```

### **3️⃣ Configure o banco de dados**
```bash
# Crie o banco PostgreSQL
createdb gostack

# Execute as migrações
yarn typeorm migration:run
# ou
npm run typeorm migration:run
```

### **4️⃣ Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=gostack

# JWT
JWT_SECRET=seu_jwt_secret_aqui

# App
APP_SECRET=seu_app_secret_aqui
```

### **5️⃣ Execute o projeto**
```bash
# Desenvolvimento
yarn dev:server

# Produção
yarn build
yarn start
```

---

## 📜 **Scripts Disponíveis**

| Comando | Descrição | Status |
|---------|-----------|--------|
| `yarn dev:server` | 🚀 Inicia o servidor em modo desenvolvimento | ✅ |
| `yarn build` | 🏗️ Compila o projeto TypeScript | ✅ |
| `yarn test` | 🧪 Executa os testes | ✅ |
| `yarn typeorm` | 🗄️ Executa comandos do TypeORM | ✅ |

---

## 🔧 **Configurações**

### **📝 TypeScript**
- **Target**: ES5
- **Strict mode**: ✅ Habilitado
- **Path mapping**: ✅ Configurado
- **Decorators**: ✅ Habilitados

### **🔍 ESLint**
- **Airbnb base config**: ✅
- **TypeScript support**: ✅
- **Prettier integration**: ✅

### **🧪 Jest**
- **Cobertura de testes**: ✅
- **TypeScript support**: ✅
- **Path mapping**: ✅

### **💅 Prettier**
- **Single quotes**: ✅
- **Trailing comma**: ✅
- **Arrow function parentheses**: ✅

---

## 🧪 **Testes**

### **🚀 Executar testes**
```bash
# Todos os testes
yarn test

# Testes em modo watch
yarn test --watch

# Cobertura de testes
yarn test --coverage
```

### **📊 Cobertura de Testes**
- **📁 Arquivos testados**: `src/modules/**/services/*.ts`
- **📈 Relatórios**: `coverage/`
- **📋 Formato**: LCOV e text-summary

---

## 📊 **Banco de Dados**

### **⚙️ Configuração**
- **🗄️ Tipo**: PostgreSQL
- **🌐 Host**: Configurável via variáveis de ambiente
- **🔌 Porta**: 5432 (padrão)
- **🔧 ORM**: TypeORM

### **🔄 Migrations**
```bash
# Criar nova migration
yarn typeorm migration:create -n NomeDaMigration

# Executar migrations
yarn typeorm migration:run

# Reverter migration
yarn typeorm migration:revert
```

---

## 🔐 **Autenticação**

O projeto utiliza **JWT (JSON Web Tokens)** para autenticação:

- **🔐 Algoritmo**: HS256
- **⏰ Expiração**: Configurável
- **🔄 Refresh Token**: Implementado

---

## 📝 **Padrões de Código**

### **🎯 Convenções**
- **📝 Nomenclatura**: camelCase para variáveis/funções, PascalCase para classes
- **📦 Imports**: Ordenados alfabeticamente
- **💬 Comentários**: JSDoc para funções públicas
- **⚠️ Error Handling**: Try-catch com tratamento específico

### **📋 Estrutura de Commits**
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção
```

---

## 🤝 **Contribuição**

<div align="center">

![Contribuição](https://img.shields.io/badge/Contribuição-Bem--vinda!-brightgreen?style=for-the-badge)

</div>

1. 🍴 Fork o projeto
2. 🌿 Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push para a branch (`git push origin feature/AmazingFeature`)
5. 📝 Abra um Pull Request

---

## 📄 **Licença**

<div align="center">

![MIT](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)

</div>

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor
by **Rodolfo M. F. Abreu**
<p align="center">
  <sub>Desenvolvido para o desafio GoStack 🚀</sub>
</p>

---

<p align="center">
  <img src="https://img.shields.io/badge/Feito%20com%20%E2%9D%A4%20por-Rocketseat-blueviolet" />
</p>


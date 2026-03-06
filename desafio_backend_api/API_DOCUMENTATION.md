# 📖 Documentação da API de Pedidos

Esta documentação detalha o funcionamento, os endpoints e a estrutura da API desenvolvida para o desafio de gerenciamento de pedidos.

---

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js (ESModules)
- **Framework**: Express.js
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL (Hospedado no Supabase)
- **Variáveis de Ambiente**: dotenv

---

## 🔄 Fluxo de Dados e Mapeamento

A API recebe dados com nomenclatura em **português** via body das requisições e realiza um mapeamento automático para o formato de persistência em **inglês** no banco de dados.

### Tabela de De-Para (Mapping)

| Campo Original (Body) | Campo no Banco de Dados | Tipo |
| :--- | :--- | :--- |
| `numeroPedido` | `orderId` | String (PK) |
| `valorTotal` | `value` | Float |
| `dataCriacao` | `creationDate` | DateTime |
| `items` | `items` | Relação 1:N |
| `items[].idItem` | `productId` | Integer |
| `items[].quantidadeItem` | `quantity` | Integer |
| `items[].valorItem` | `price` | Float |

---

## 🚀 Como Iniciar a Aplicação

### 1. Requisitos
- Node.js instalado (v18 ou superior)
- Conexão ativa com o banco de dados Supabase

### 2. Instalação
```bash
npm install
```

### 3. Configuração do Ambiente (.env)
Verifique se o seu arquivo `.env` contém a URL de conexão do Supabase:
```env
DATABASE_URL="postgresql://postgres:[SENHA]@[HOST]:5432/postgres?schema=project"
PORT_API=3000
```

### 4. Sincronização do Banco (Prisma)
Se as tabelas ainda não existirem no banco, execute:
```bash
npx prisma db push
```

### 5. Execução
```bash
npm run dev
```

---

## 📡 Endpoints da API

A URL base da aplicação é `http://localhost:3000`.

### 1. Criar Novo Pedido (Obrigatório)
Cria um pedido e seus respectivos itens no banco de dados.

- **URL**: `http://localhost:3000/order`
- **Método**: `POST`
- **Corpo da Requisição**:
```json
{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.529Z",
    "items": [
        {
            "idItem": "2434",
            "quantidadeItem": 1,
            "valorItem": 1000
        }
    ]
}
```
- **Resposta (201 Created)**:
Retorna o objeto mapeado conforme salvo no banco.

---

### 2. Buscar Pedido por Número (Obrigatório)
Obtém os dados completos de um pedido específico.

- **URL**: `http://localhost:3000/order/:numeroPedido`
- **Método**: `GET`
- **Exemplo**: `http://localhost:3000/order/v10089016vdb`
- **Resposta (200 OK)**:
```json
{
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [...]
}
```

---

### 3. Listar Todos os Pedidos
Lista todos os pedidos registrados no sistema, ordenados pelos mais recentes.

- **URL**: `http://localhost:3000/order/list`
- **Método**: `GET`
- **Resposta (200 OK)**: Array de objetos contendo os pedidos e seus itens.

---

### 4. Atualizar Pedido
Atualiza campos específicos de um pedido. Se o campo `items` for enviado, os itens antigos serão substituídos pelos novos.

- **URL**: `http://localhost:3000/order/:numeroPedido`
- **Método**: `PUT`
- **Exemplo**: `http://localhost:3000/order/v10089016vdb`
- **Corpo da Requisição (Opcional)**:
```json
{
    "valorTotal": 12000
}
```
- **Resposta (200 OK)**: Objeto do pedido atualizado.

---

### 5. Deletar Pedido
Remove um pedido e todos os seus itens associados (delete em cascata).

- **URL**: `http://localhost:3000/order/:numeroPedido`
- **Método**: `DELETE`
- **Exemplo**: `http://localhost:3000/order/v10089016vdb`
- **Resposta (200 OK)**:
```json
{
    "message": "Pedido \"v10089015vdb-01\" deletado com sucesso."
}
```

---

## ⚠️ Tratamento de Erros

A API retorna códigos HTTP apropriados para cada situação:

| Status Code | Significado |
| :--- | :--- |
| `200` | Sucesso na operação. |
| `201` | Recurso criado com sucesso. |
| `400` | Campos obrigatórios ausentes ou formato inválido. |
| `404` | Pedido não encontrado no sistema. |
| `409` | Pedido com o mesmo número já existe (Conflito). |
| `500` | Erro interno no processamento do servidor. |

---

## 📦 Estrutura de Arquivos da Implementação

- `src/controllers/orders.js`: Contém a lógica de mapeamento e as funções que lidam com as requisições HTTP.
- `src/repository/orders.js`: Camada de acesso ao banco de dados utilizando Prisma.
- `src/routers/orderRouter.js`: Definição das rotas específicas para os pedidos.
- `prisma/schema.prisma`: Definição dos modelos `Order` e `OrderItem`.

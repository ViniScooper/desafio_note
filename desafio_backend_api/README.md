# 📦 API de Gerenciamento de Pedidos

API REST desenvolvida em **Node.js** com **Express** e **Prisma (PostgreSQL)** para gerenciar pedidos com operações CRUD completas. Os dados são salvos no **Supabase**.

---

## 🚀 Como executar

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Certifique-se que o `.env` tem a DATABASE_URL do Supabase:**
   ```env
   DATABASE_URL="postgresql://..."
   PORT_API=3000
   ```

3. **Sincronize o banco e gere o client (opcional se já feito):**
   ```bash
   npx prisma db push
   ```

4. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`.

---

## 📡 Endpoints

### ➕ Criar Pedido
**`POST /order`**

```json
// Body (entrada)
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

```json
// Resposta 201 — salvo no banco com campos mapeados
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

### 🔍 Buscar Pedido por ID
**`GET /order/:orderId`**

```
GET http://localhost:3000/order/v10089015vdb-01
```
Resposta `200` com os dados do pedido | `404` se não encontrado.

---

### 📋 Listar Todos os Pedidos
**`GET /order/list`**

```
GET http://localhost:3000/order/list
```
Resposta `200` com array de pedidos (mais recentes primeiro).

---

### ✏️ Atualizar Pedido
**`PUT /order/:orderId`**

```json
// Body — apenas os campos que deseja atualizar
{
  "valorTotal": 15000,
  "items": [
    { "idItem": "2434", "quantidadeItem": 2, "valorItem": 1000 }
  ]
}
```
Resposta `200` com pedido atualizado | `404` se não encontrado.

---

### 🗑️ Deletar Pedido
**`DELETE /order/:orderId`**

```
DELETE http://localhost:3000/order/v10089015vdb-01
```
Resposta `200` com mensagem de sucesso | `404` se não encontrado.

---

## 🔄 Mapeamento de Campos

| Campo Recebido (body) | Campo Salvo no Banco |
|---|---|
| `numeroPedido` | `orderId` |
| `valorTotal` | `value` |
| `dataCriacao` | `creationDate` |
| `items[].idItem` | `items[].productId` (Number) |
| `items[].quantidadeItem` | `items[].quantity` |
| `items[].valorItem` | `items[].price` |

---

## ⚠️ Códigos de Resposta HTTP

| Código | Significado |
|---|---|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Dados inválidos ou ausentes |
| `404` | Recurso não encontrado |
| `409` | Pedido já existe (conflito) |
| `500` | Erro interno do servidor |

---

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/
│   ├── orders.js     # Lógica de negócio + mapeamento de campos
│   └── users.js
├── database/
│   └── index.js      # Prisma Client (PostgreSQL)
├── repository/
│   ├── orders.js     # Acesso ao DB via Prisma (CRUD)
│   └── users.js
├── routers/
│   ├── orderRouter.js # Rotas de pedidos
│   └── router.js
├── index.js           # Entry point
└── server.js          # Configuração do Express
```

---

## 🛠️ Tecnologias

- **Node.js** + **Express 5**
- **Prisma ORM**
- **PostgreSQL (Supabase)**
- **dotenv** para variáveis de ambiente
- **ESModules** (import/export)

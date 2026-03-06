# 🗄️ Estrutura do Banco de Dados (PostgreSQL)

Este documento detalha como as tabelas foram estruturadas no seu banco de dados Supabase via Prisma.

---

## 📊 Tabelas de Pedidos

A estrutura foi dividida em duas tabelas principais para manter a normalização (relação Pai e Filho).

### 1. Tabela: `Order`
Armazena as informações principais do cabeçalho do pedido.

| Coluna | Tipo Prisma | Tipo Relacional (SQL) | Descrição |
| :--- | :--- | :--- | :--- |
| `orderId` | `String` | `TEXT` | **Chave Primária**. Número único do pedido (ex: v10089016vdb). |
| `value` | `Float` | `DOUBLE PRECISION` | Valor total do pedido (mapeado de `valorTotal`). |
| `creationDate` | `DateTime` | `TIMESTAMP` | Data de criação do pedido (mapeado de `dataCriacao`). |

---

### 2. Tabela: `Items` (OrderItem)
Armazena os itens individuais vinculados a um pedido.

| Coluna | Tipo Prisma | Tipo Relacional (SQL) | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `Int` | `SERIAL` | **Chave Primária**. ID incremental automático interno. |
| `orderId` | `String` | `TEXT` | **Chave Estrangeira**. Vincula o item ao pedido (`Order`). |
| `productId` | `Int` | `INTEGER` | ID do produto (mapeado de `idItem`). |
| `quantity` | `Int` | `INTEGER` | Quantidade do item (mapeado de `quantidadeItem`). |
| `price` | `Float` | `DOUBLE PRECISION` | Preço unitário (mapeado de `valorItem`). |

---

## 🔗 Relacionamentos e Regras

1.  **Relação**: Um pedido (`Order`) pode ter vários itens (`Items`).
2.  **Chave Estrangeira**: A coluna `orderId` na tabela `Items` garante a integridade dos dados, apontando sempre para um pedido válido.
3.  **Delete em Cascata (ON DELETE CASCADE)**: Se você deletar um pedido da tabela `Order`, o banco de dados removerá automaticamente todos os itens desse pedido na tabela `Items`. Isso evita "lixo" no banco de dados.

---

## 🛠️ Como os tipos são convertidos?

| Campo JSON Recebido | Mapeamento no Código | Tipo Final no Banco |
| :--- | :--- | :--- |
| `"v10089016vdb"` | String | `TEXT` |
| `10000` | Número | `FLOAT / DOUBLE` |
| `"2023-07-19..."` | ISO Date String | `TIMESTAMP` |
| `"2434"` (idItem) | `Number(idItem)` | `INTEGER` |

---

## 📂 Visualização no Schema Prisma
Você também pode conferir essa definição técnica no arquivo:
`prisma/schema.prisma`

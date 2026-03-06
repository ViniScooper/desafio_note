# 🧪 Exemplos Práticos de Teste (CRUD)

Use os comandos abaixo no seu terminal (PowerShell) para testar a API. Certifique-se de que o servidor está rodando (`npm run dev`).

---

## 1. ➕ CRIAR PEDIDO (POST)
Cria um novo pedido com mapeamento de campos.

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/order" -Method Post -ContentType "application/json" -Body '{
    "numeroPedido": "v10089016vdb",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.529Z",
    "items": [
        {
            "idItem": "2434",
            "quantidadeItem": 1,
            "valorItem": 1000
        }
    ]
}' | ConvertTo-Json -Depth 10
```




--fazer desta forma para criar

metodo post

{
    "numeroPedido": "v10089016vdb",
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






---

## 2. 📋 LISTAR TODOS OS PEDIDOS (GET)
Retorna todos os pedidos salvos no banco.

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/order/list" -Method Get | ConvertTo-Json -Depth 10
```

---

## 3. 🔍 BUSCAR PEDIDO ESPECÍFICO (GET)
Busca os detalhes de um pedido pelo número.

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/order/v10089016vdb" -Method Get | ConvertTo-Json -Depth 10
```

---

## 4. ✏️ ATUALIZAR PEDIDO (PUT)
Altera dados de um pedido existente (ex: mudar o valor total).

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/order/v10089016vdb" -Method Put -ContentType "application/json" -Body '{
    "valorTotal": 15000
}' | ConvertTo-Json -Depth 10
```

---

## 5. 🗑️ DELETAR PEDIDO (DELETE)
Remove o pedido permanentemente do banco.

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/order/v10089016vdb" -Method Delete | ConvertTo-Json
```

---

## 🧪 TESTE DE ERRO (DUPLICATA)
Tente rodar o comando 1 (**CRIAR**) duas vezes seguidas para ver a API bloqueando números de nota duplicados (Erro 409).

```powershell
# Este comando deve retornar um erro se o pedido v10089016vdb já existir
Invoke-RestMethod -Uri "http://localhost:3000/order" -Method Post -ContentType "application/json" -Body '{"numeroPedido": "v10089016vdb", "valorTotal": 10, "dataCriacao": "2023-01-01T00:00:00Z", "items": []}'
```

import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder
} from '../controllers/orders.js';

const router = Router();

// ─── Rotas de Pedidos ─────────────────────────────────────────────────────────
// Estas rotas serão montadas sob o prefixo "/order" no server.js

// POST /order → Cria um novo pedido
router.post('/', createOrder);

// GET /order/list → Lista todos os pedidos
router.get('/list', listOrders);

// GET /order/:orderId → Busca um pedido pelo número do pedido
router.get('/:orderId', getOrderById);

// PUT /order/:orderId → Atualiza um pedido pelo número do pedido
router.put('/:orderId', updateOrder);

// DELETE /order/:orderId → Deleta um pedido pelo número do pedido
router.delete('/:orderId', deleteOrder);

export const orderRouter = router;

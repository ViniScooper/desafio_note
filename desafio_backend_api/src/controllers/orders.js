import {
  createOrderDB,
  getOrderByIdDB,
  listAllOrdersDB,
  updateOrderDB,
  deleteOrderDB
} from '../repository/orders.js';

// ─────────────────────────────────────────────────────────────────────────────
// MAPEAMENTO DE CAMPOS
// Body (entrada) → Formato do banco de dados (saída)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mapeia os itens do body para o formato do banco de dados.
 * @param {Array} items - Lista de itens do body
 * @returns {Array} - Itens mapeados
 */
const mapItems = (items = []) =>
  items.map((item) => ({
    productId: Number(item.idItem),    // idItem (string) → productId (number)
    quantity: item.quantidadeItem,     // quantidadeItem   → quantity
    price: item.valorItem              // valorItem        → price
  }));

/**
 * Mapeia o body recebido para o formato que será salvo no banco.
 * @param {Object} body - Corpo da requisição
 * @returns {Object} - Objeto mapeado para o banco
 */
const mapBodyToOrder = (body) => ({
  orderId: body.numeroPedido,                   // numeroPedido → orderId
  value: body.valorTotal,                       // valorTotal   → value
  creationDate: new Date(body.dataCriacao),     // dataCriacao  → creationDate (Date)
  items: mapItems(body.items)                   // items[]      → mapeado
});

/**
 * Mapeia campos opcionais de atualização (só campos informados).
 * Aceita tanto o formato do body (pt) quanto o formato do banco (en).
 */
const mapUpdateBody = (body) => {
  const update = {};

  if (body.valorTotal !== undefined)   update.value = body.valorTotal;
  if (body.dataCriacao !== undefined)  update.creationDate = new Date(body.dataCriacao);
  if (body.items !== undefined)        update.items = mapItems(body.items);

  // Também aceita campos já no formato do banco (usabilidade extra)
  if (body.value !== undefined)        update.value = body.value;
  if (body.creationDate !== undefined) update.creationDate = new Date(body.creationDate);

  return update;
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * POST /order
 * Cria um novo pedido no banco de dados.
 */
export const createOrder = async (req, res) => {
  const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

  // Validação dos campos obrigatórios
  if (!numeroPedido || valorTotal === undefined || !dataCriacao || !items) {
    return res.status(400).json({
      error: 'Campos obrigatórios ausentes: numeroPedido, valorTotal, dataCriacao, items'
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'O campo "items" deve ser um array não vazio.' });
  }

  try {
    const orderData = mapBodyToOrder(req.body);
    const order = await createOrderDB(orderData);
    return res.status(201).json(order);
  } catch (error) {
    if (error.code === 'DUPLICATE') {
      return res.status(409).json({ error: `Pedido "${numeroPedido}" já existe.` });
    }
    console.error('Erro ao criar pedido:', error.message);
    return res.status(500).json({ error: 'Erro interno ao criar pedido.' });
  }
};

/**
 * GET /order/list
 * Retorna todos os pedidos cadastrados.
 */
export const listOrders = async (req, res) => {
  try {
    const orders = await listAllOrdersDB();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error.message);
    return res.status(500).json({ error: 'Erro interno ao listar pedidos.' });
  }
};

/**
 * GET /order/:orderId
 * Retorna os dados de um pedido pelo orderId (numeroPedido).
 */
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await getOrderByIdDB(orderId);

    if (!order) {
      return res.status(404).json({ error: `Pedido "${orderId}" não encontrado.` });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error.message);
    return res.status(500).json({ error: 'Erro interno ao buscar pedido.' });
  }
};

/**
 * PUT /order/:orderId
 * Atualiza um pedido existente pelo orderId.
 */
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
  }

  try {
    const updateData = mapUpdateBody(req.body);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo válido para atualizar.' });
    }

    const updated = await updateOrderDB(orderId, updateData);

    if (!updated) {
      return res.status(404).json({ error: `Pedido "${orderId}" não encontrado.` });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    return res.status(500).json({ error: 'Erro interno ao atualizar pedido.' });
  }
};

/**
 * DELETE /order/:orderId
 * Remove um pedido pelo orderId.
 */
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deleted = await deleteOrderDB(orderId);

    if (!deleted) {
      return res.status(404).json({ error: `Pedido "${orderId}" não encontrado.` });
    }

    return res.status(200).json({ message: `Pedido "${orderId}" deletado com sucesso.` });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    return res.status(500).json({ error: 'Erro interno ao deletar pedido.' });
  }
};

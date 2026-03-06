import { prisma } from '../database/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// Repository de Pedidos — usa Prisma + PostgreSQL (Supabase)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cria um novo pedido no banco de dados.
 * @param {Object} orderData - Dados já mapeados { orderId, value, creationDate, items[] }
 * @returns {Object} - Pedido criado com seus itens
 */
export const createOrderDB = async (orderData) => {
  const { orderId, value, creationDate, items } = orderData;

  // Verificar duplicata
  const existing = await prisma.order.findUnique({ where: { orderId } });
  if (existing) {
    const error = new Error('Pedido com este orderId já existe.');
    error.code = 'DUPLICATE';
    throw error;
  }

  // Criar pedido e seus itens em uma única transação
  const order = await prisma.order.create({
    data: {
      orderId,
      value,
      creationDate,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: { items: true } // retorna o pedido com os itens
  });

  return order;
};

/**
 * Busca um pedido pelo orderId.
 * @param {string} orderId - Identificador único do pedido
 * @returns {Object|null} - Pedido com itens ou null
 */
export const getOrderByIdDB = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { orderId },
    include: { items: true }
  });
  return order;
};

/**
 * Retorna todos os pedidos cadastrados (mais recentes primeiro).
 * @returns {Array} - Lista de pedidos com itens
 */
export const listAllOrdersDB = async () => {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { creationDate: 'desc' }
  });
  return orders;
};

/**
 * Atualiza os dados de um pedido existente.
 * Substitui completamente os itens se forem informados.
 * @param {string} orderId - Identificador do pedido
 * @param {Object} updateData - Campos a atualizar
 * @returns {Object|null} - Pedido atualizado ou null se não encontrado
 */
export const updateOrderDB = async (orderId, updateData) => {
  // Verificar se o pedido existe
  const existing = await prisma.order.findUnique({ where: { orderId } });
  if (!existing) return null;

  const { items, ...orderFields } = updateData;

  // Usa transação para garantir consistência ao atualizar itens
  const updated = await prisma.$transaction(async (tx) => {
    // Se itens foram fornecidos, deletar os antigos e inserir os novos
    if (items && items.length > 0) {
      await tx.orderItem.deleteMany({ where: { orderId } });
      await tx.orderItem.createMany({
        data: items.map((item) => ({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      });
    }

    // Atualizar campos do pedido
    return tx.order.update({
      where: { orderId },
      data: orderFields,
      include: { items: true }
    });
  });

  return updated;
};

/**
 * Remove um pedido (e seus itens via CASCADE) pelo orderId.
 * @param {string} orderId - Identificador do pedido
 * @returns {boolean} - true se deletado, false se não encontrado
 */
export const deleteOrderDB = async (orderId) => {
  const existing = await prisma.order.findUnique({ where: { orderId } });
  if (!existing) return false;

  await prisma.order.delete({ where: { orderId } });
  return true;
};

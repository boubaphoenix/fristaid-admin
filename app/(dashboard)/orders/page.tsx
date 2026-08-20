import { adminFetchOrRedirect } from '@/lib/backendFetch';
import { OrderStatusControl } from '@/components/OrderStatusControl';

type OrdersResponse = {
  orders: {
    id: string;
    status: string;
    total_amount_xof: number;
    delivery_full_name: string;
    delivery_phone: string;
    delivery_commune: string;
    created_at: string;
    user: { email: string };
    order_items: { quantity: number; kit: { name: string } }[];
  }[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente de paiement',
  paid: 'Payée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  failed: 'Paiement échoué',
  cancelled: 'Annulée',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'var(--color-warning-orange)',
  paid: 'var(--color-trust-blue)',
  preparing: 'var(--color-trust-blue)',
  shipped: 'var(--color-trust-blue)',
  delivered: 'var(--color-success-green)',
  failed: 'var(--color-emergency-red)',
  cancelled: 'var(--color-muted-text)',
};

// Liste des commandes de kits de secours + suivi de livraison manuel
// (voir components/OrderStatusControl.tsx). 'paid'/'failed' ne sont jamais
// modifiables ici : uniquement décidés par le webhook/résolution Bictorys.
export default async function OrdersPage() {
  const data = await adminFetchOrRedirect<OrdersResponse>('/admin/orders');

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Commandes</h1>
      <p style={{ color: 'var(--color-muted-text)', maxWidth: 520 }}>
        Suivi des commandes de kits de secours et de leur livraison. Le statut de paiement (payée/échouée) est
        exclusivement décidé par Bictorys, jamais modifiable manuellement.
      </p>

      <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
        {data.orders.length === 0 ? (
          <div style={{ padding: 16, color: 'var(--color-muted-text)' }}>Aucune commande pour le moment.</div>
        ) : (
          data.orders.map((order) => (
            <div
              key={order.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                padding: '12px 16px',
                borderBottom: '1px solid var(--color-border)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  {order.order_items.map((item) => `${item.kit.name} ×${item.quantity}`).join(', ')}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-muted-text)' }}>
                  {order.user.email} — {order.delivery_full_name}, {order.delivery_commune} ({order.delivery_phone})
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-muted-text)' }}>
                  {new Date(order.created_at).toLocaleDateString('fr-FR')} — {order.total_amount_xof.toLocaleString('fr-FR')} FCFA
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    color: STATUS_COLORS[order.status] ?? 'var(--color-dark-text)',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'var(--color-light-gray)',
                  }}
                >
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
                <OrderStatusControl orderId={order.id} currentStatus={order.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

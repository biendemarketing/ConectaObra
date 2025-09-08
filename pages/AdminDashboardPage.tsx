import React, { useState, useMemo } from 'react';
import { User, Provider, Listing, Dispute, Transaction, AdminView } from '../types';
import { HardHat, LogOut, Users, List, ShieldAlert, ShieldCheck, ShieldOff, Trash2, CheckCircle, Clock, BarChart2, CreditCard, DollarSign, Slash, ArrowUp, ArrowDown } from 'lucide-react';

interface AdminDashboardPageProps {
  user: User;
  onLogout: () => void;
  providers: Provider[];
  listings: Listing[];
  disputes: Dispute[];
  transactions: Transaction[];
  onUpdateProviderStatus: (providerId: string, verified: boolean) => void;
  onUpdateProviderBlockStatus: (providerId: string, status: 'active' | 'blocked') => void;
  onDeleteListing: (listingId: string) => void;
  onResolveDispute: (disputeId: string) => void;
  onReleasePayment: (transactionId: string) => void;
  onRefundPayment: (transactionId: string) => void;
}

const AnalyticsChart: React.FC = () => {
    const data = [ { month: 'Ene', revenue: 2500 }, { month: 'Feb', revenue: 3200 }, { month: 'Mar', revenue: 4100 }, { month: 'Abr', revenue: 3800 }, { month: 'May', revenue: 5500 }, { month: 'Jun', revenue: 6200 }, ];
    const maxRevenue = Math.max(...data.map(d => d.revenue));

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-neutral mb-4">Ingresos Mensuales (Simulado)</h3>
            <div className="flex justify-around items-end h-64 border-l border-b border-gray-200 pl-4 pb-4">
                {data.map(item => (
                    <div key={item.month} className="flex flex-col items-center w-1/6">
                        <div className="w-1/2 bg-primary/20 hover:bg-primary/40 rounded-t-md" style={{ height: `${(item.revenue / maxRevenue) * 100}%` }} title={`$${item.revenue.toLocaleString()}`}></div>
                        <span className="text-xs font-medium text-gray-500 mt-2">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AdminDashboardPage: React.FC<AdminDashboardPageProps> = (props) => {
  const { user, onLogout, providers, listings, disputes, transactions, onUpdateProviderStatus, onUpdateProviderBlockStatus, onDeleteListing, onResolveDispute, onReleasePayment, onRefundPayment } = props;
  const [view, setView] = useState<AdminView>('analytics');

  const analyticsData = useMemo(() => ({
    totalRevenue: transactions.filter(t => t.status === 'Pagado').reduce((acc, t) => acc + t.amount, 0),
    totalUsers: providers.length,
    activeListings: listings.length,
    openDisputes: disputes.filter(d => d.status === 'Abierta').length
  }), [transactions, providers, listings, disputes]);

  const renderContent = () => {
    switch (view) {
      case 'analytics':
        return (
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light flex items-center"><DollarSign className="w-5 h-5 mr-2"/>Ingresos Totales</h3><p className="text-3xl font-bold text-neutral mt-2">${analyticsData.totalRevenue.toLocaleString()}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light flex items-center"><Users className="w-5 h-5 mr-2"/>Proveedores Activos</h3><p className="text-3xl font-bold text-neutral mt-2">{analyticsData.totalUsers}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light flex items-center"><List className="w-5 h-5 mr-2"/>Anuncios Activos</h3><p className="text-3xl font-bold text-neutral mt-2">{analyticsData.activeListings}</p></div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light flex items-center"><ShieldAlert className="w-5 h-5 mr-2"/>Disputas Abiertas</h3><p className="text-3xl font-bold text-neutral mt-2">{analyticsData.openDisputes}</p></div>
                </div>
                <AnalyticsChart/>
            </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Proveedor</th><th scope="col" className="px-6 py-3">Verificado</th><th scope="col" className="px-6 py-3">Estado</th><th scope="col" className="px-6 py-3 text-center">Acciones</th></tr></thead>
              <tbody>
                {providers.map(p => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center space-x-3">
                      <img src={p.avatarUrl} alt={p.name} className="w-10 h-10 rounded-full" />
                      <span className="text-gray-900">{p.name}</span>
                    </th>
                     <td className="px-6 py-4">
                      {p.verified ? <span className="flex items-center text-green-600 font-semibold"><ShieldCheck className="w-4 h-4 mr-1"/>Sí</span> : <span className="flex items-center text-orange-600 font-semibold"><ShieldAlert className="w-4 h-4 mr-1"/>No</span>}
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 text-xs font-medium rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{p.status === 'active' ? 'Activo' : 'Bloqueado'}</span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-4">
                      <button onClick={() => onUpdateProviderStatus(p.id, !p.verified)} className={`font-medium ${p.verified ? 'text-orange-600 hover:underline' : 'text-green-600 hover:underline'}`}>
                        {p.verified ? 'Desverificar' : 'Verificar'}
                      </button>
                      <button onClick={() => onUpdateProviderBlockStatus(p.id, p.status === 'active' ? 'blocked' : 'active')} className={`font-medium ${p.status === 'active' ? 'text-red-600 hover:underline' : 'text-blue-600 hover:underline'}`}>
                        {p.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'listings':
        return (
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Anuncio</th><th scope="col" className="px-6 py-3">Proveedor</th><th scope="col" className="px-6 py-3">Categoría</th><th scope="col" className="px-6 py-3 text-center">Acción</th></tr></thead>
              <tbody>
                {listings.map(l => (
                  <tr key={l.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{l.title}</th>
                    <td className="px-6 py-4">{l.provider.name}</td>
                    <td className="px-6 py-4">{l.category}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => { if(window.confirm('¿Seguro que quieres eliminar este anuncio?')) onDeleteListing(l.id) }} className="font-medium text-red-600 hover:underline"><Trash2 className="w-4 h-4 inline mr-1"/>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'disputes':
        return (
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Caso</th><th scope="col" className="px-6 py-3">Motivo</th><th scope="col" className="px-6 py-3">Fecha</th><th scope="col" className="px-6 py-3">Estado</th><th scope="col" className="px-6 py-3 text-center">Acción</th></tr></thead>
              <tbody>
                {disputes.map(d => (
                  <tr key={d.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      <p>{d.booking.listing.title}</p>
                      <p className="text-xs font-normal text-gray-500">Cliente: {d.client.name} | Prov: {d.provider.name}</p>
                    </th>
                    <td className="px-6 py-4 max-w-sm truncate">{d.reason}</td>
                    <td className="px-6 py-4">{new Date(d.reportedDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {d.status === 'Abierta' ? <span className="flex items-center text-orange-600 font-semibold"><Clock className="w-4 h-4 mr-1"/>Abierta</span> : <span className="flex items-center text-green-600 font-semibold"><CheckCircle className="w-4 h-4 mr-1"/>Resuelta</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {d.status === 'Abierta' && (
                        <button onClick={() => { if(window.confirm('¿Marcar esta disputa como resuelta?')) onResolveDispute(d.id) }} className="font-medium text-primary hover:underline">Resolver</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {disputes.length === 0 && <p className="p-6 text-center text-neutral-light">No hay disputas activas.</p>}
          </div>
        );
        case 'payments':
            return (
                <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Transacción</th><th scope="col" className="px-6 py-3">Monto</th><th scope="col" className="px-6 py-3">Fecha</th><th scope="col" className="px-6 py-3">Estado</th><th scope="col" className="px-6 py-3 text-center">Acciones</th></tr></thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><p>{t.booking.listing.title}</p><p className="text-xs font-normal text-gray-500">Prov: {t.booking.listing.provider.name}</p></th>
                                    <td className="px-6 py-4 font-semibold text-neutral">${t.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${t.status === 'Pagado' ? 'bg-green-100 text-green-800' : t.status === 'Reembolsado' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{t.status}</span></td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        {t.status === 'Pendiente de Liberación' && <>
                                            <button onClick={() => onReleasePayment(t.id)} className="font-medium text-green-600 hover:underline"><ArrowUp className="w-4 h-4 inline mr-1"/>Liberar Pago</button>
                                            <button onClick={() => onRefundPayment(t.id)} className="font-medium text-red-600 hover:underline"><ArrowDown className="w-4 h-4 inline mr-1"/>Reembolsar</button>
                                        </>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
      default:
        return null;
    }
  };

  const menuItems = [
    { id: 'analytics', label: 'Analíticas', icon: BarChart2 },
    { id: 'users', label: 'Proveedores', icon: Users },
    { id: 'listings', label: 'Anuncios', icon: List },
    { id: 'disputes', label: 'Disputas', icon: ShieldAlert },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-neutral text-white h-full flex flex-col">
        <div className="p-5 border-b border-neutral-light flex items-center space-x-2">
          <HardHat className="w-7 h-7 text-secondary" />
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-grow p-4">
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setView(item.id as AdminView)}
                  className={`flex items-center w-full text-left p-3 my-1 rounded-md transition-colors ${
                    view === item.id ? 'bg-secondary text-neutral font-semibold' : 'hover:bg-neutral-light'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-neutral-light">
          <button onClick={onLogout} className="flex items-center w-full text-left p-3 hover:bg-neutral-light rounded-md">
            <LogOut className="w-5 h-5 mr-3" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex justify-end items-center">
          <div className="flex items-center space-x-2">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-neutral">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.roles[0]}</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <h1 className="text-2xl font-bold text-neutral mb-6 capitalize">{view.replace('-', ' ')}</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
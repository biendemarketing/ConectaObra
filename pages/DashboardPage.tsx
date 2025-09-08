import React, { useState, useMemo, useRef, useEffect } from 'react';
import { User, Booking, Listing, Role, Conversation, Message, Page, Project, Notification, Provider, Dispute } from '../types';
import Calendar from '../components/Calendar';
import { LayoutDashboard, List, Calendar as CalendarIcon, MessageSquare, BarChart2, User as UserIcon, LogOut, Bell, Settings, Menu, X, HardHat, PlusCircle, Briefcase, Wallet, Eye, Save, Send, Users, ArrowLeft, ExternalLink, Edit, Trash2, ShieldAlert, Home, Search } from 'lucide-react';

type DashboardView = 'overview' | 'listings' | 'calendar' | 'messages' | 'analytics' | 'profile' | 'projects' | 'bookings' | 'payments' | 'conversation-detail';

interface DashboardProps {
    user: User;
    activeRole: Role;
    setActiveRole: (role: Role) => void;
    bookings: Booking[];
    allListings: Listing[];
    conversations: Conversation[];
    setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
    projects: Project[];
    onCreateProject: (projectName: string) => void;
    notifications: Notification[];
    setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    onViewDetails: (listing: Listing) => void;
    onLogout: () => void;
    onNavigate: (page: Page) => void;
    onCreateListing: () => void;
    onEditListing: (listing: Listing) => void;
    onDeleteListing: (listingId: string) => void;
    provider: Provider | null | undefined;
    onSetUnavailableDates: (providerId: string, dates: string[]) => void;
    onCreateDispute: (booking: Booking, reason: string) => void;
}

const RoleSwitcher: React.FC<{ user: User; activeRole: Role; setActiveRole: (role: Role) => void }> = ({ user, activeRole, setActiveRole }) => {
    const switchableRoles = user.roles.filter(r => r === 'client' || r === 'provider');
    if (switchableRoles.length < 2) return null;

    return (
        <div className="flex items-center space-x-2 rounded-lg bg-gray-200 p-1">
            {switchableRoles.map(role => (
                <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${activeRole === role ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:bg-gray-300'}`}
                >
                    {role === 'client' ? 'Cliente' : 'Proveedor'}
                </button>
            ))}
        </div>
    );
};

const DashboardSidebar: React.FC<{ 
    activeRole: Role, 
    currentView: DashboardView, 
    setView: (view: DashboardView) => void,
    onLogout: () => void,
    onNavigate: (page: Page) => void,
}> = ({ activeRole, currentView, setView, onLogout, onNavigate }) => {
  
  const providerMenuItems = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard }, { id: 'listings', label: 'Mis Anuncios', icon: List }, { id: 'calendar', label: 'Calendario', icon: CalendarIcon }, { id: 'messages', label: 'Mensajes', icon: MessageSquare }, { id: 'analytics', label: 'Ingresos', icon: BarChart2 }, { id: 'profile', label: 'Mi Perfil', icon: UserIcon },
  ];
  const clientMenuItems = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard }, { id: 'bookings', label: 'Mis Contrataciones', icon: CalendarIcon }, { id: 'projects', label: 'Mis Proyectos', icon: Briefcase }, { id: 'messages', label: 'Mensajes', icon: MessageSquare }, { id: 'payments', label: 'Pagos', icon: Wallet }, { id: 'profile', label: 'Mi Perfil', icon: UserIcon },
  ];
  const menuItems = activeRole === 'provider' ? providerMenuItems : clientMenuItems;
  
  return (
    <aside className="w-64 bg-white h-full flex flex-col border-r border-gray-200">
      <div className="p-5 border-b flex items-center space-x-2">
        <HardHat className="w-7 h-7 text-primary" />
        <h2 className="text-xl font-bold text-neutral">ConectaObra</h2>
      </div>
      <nav className="flex-grow p-4">
        <button onClick={() => onNavigate('home')} className="flex items-center w-full text-left p-3 mb-1 rounded-md bg-gray-100 text-neutral-light hover:bg-gray-200 font-semibold">
            <Home className="w-5 h-5 mr-3" />
            <span>Página Principal</span>
        </button>
        <button onClick={() => onNavigate('search')} className="flex items-center w-full text-left p-3 mb-4 rounded-md bg-gray-100 text-neutral-light hover:bg-gray-200 font-semibold">
            <Search className="w-5 h-5 mr-3" />
            <span>Marketplace</span>
        </button>
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 capitalize">{activeRole}</p>
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setView(item.id as DashboardView)}
                className={`flex items-center w-full text-left p-3 my-1 rounded-md transition-colors ${
                  currentView === item.id 
                  ? 'bg-primary/10 text-primary font-semibold' 
                  : 'text-neutral-light hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button onClick={onLogout} className="flex items-center w-full text-left p-3 text-neutral-light hover:bg-gray-100 rounded-md">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

const DashboardContent: React.FC<DashboardProps & { 
    currentView: DashboardView, 
    setView: (view: DashboardView) => void,
    selectedConversation: Conversation | null,
    setSelectedConversation: (c: Conversation | null) => void,
}> = (props) => {
  const { currentView, user, activeRole, bookings, allListings, onViewDetails, conversations, setConversations, setView, selectedConversation, setSelectedConversation, projects, onCreateProject, onCreateListing, onEditListing, onDeleteListing, provider, onSetUnavailableDates, onCreateDispute } = props;
  
  const [newProjectName, setNewProjectName] = useState('');

  const providerListings = useMemo(() => {
    return allListings.filter(listing => listing.provider.id === user.id);
  }, [allListings, user.id]);

  const userConversations = useMemo(() => {
    if (activeRole === 'client') {
      return conversations.filter(c => c.client.id === user.id);
    }
    return conversations.filter(c => c.provider.id === user.id);
  }, [conversations, user, activeRole]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !selectedConversation) return;
    const message: Message = { from: activeRole as 'client' | 'provider', text: newMessage, timestamp: new Date().toISOString() };
    setConversations(prev => prev.map(c => c.id === selectedConversation.id ? { ...c, messages: [...c.messages, message] } : c));
    setNewMessage('');
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(newProjectName.trim()){
        onCreateProject(newProjectName.trim());
        setNewProjectName('');
    }
  }
  
  const handleDelete = (listing: Listing) => {
    if(window.confirm(`¿Estás seguro de que quieres eliminar el anuncio "${listing.title}"?`)){
        onDeleteListing(listing.id);
    }
  }
  
  const handleDateToggle = (date: string) => {
    if (!provider) return;
    const newDates = provider.unavailableDates.includes(date)
      ? provider.unavailableDates.filter(d => d !== date)
      : [...provider.unavailableDates, date];
    onSetUnavailableDates(provider.id, newDates);
  };

  const handleCreateDisputeClick = (booking: Booking) => {
    const reason = prompt(`Por favor, describe el problema con la contratación de "${booking.listing.title}":`);
    if(reason && reason.trim()) {
        onCreateDispute(booking, reason.trim());
    }
  };


  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return activeRole === 'provider' ? (
          <div>
            <h2 className="text-2xl font-bold text-neutral mb-6">Resumen de Proveedor</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light">Ingresos (mes)</h3><p className="text-3xl font-bold text-neutral mt-2">$3,450</p></div>
              <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light">Anuncios Activos</h3><p className="text-3xl font-bold text-neutral mt-2">{providerListings.length}</p></div>
              <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light">Mensajes no leídos</h3><p className="text-3xl font-bold text-neutral mt-2">3</p></div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-neutral mb-6">Resumen de Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light">Contrataciones Totales</h3><p className="text-3xl font-bold text-neutral mt-2">{bookings.length}</p></div>
              <div className="bg-white p-6 rounded-lg shadow-sm border"><h3 className="text-neutral-light">Proyectos Activos</h3><p className="text-3xl font-bold text-neutral mt-2">{projects.length}</p></div>
            </div>
          </div>
        );
      case 'listings':
        return <div>
          <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-neutral">Mis Anuncios</h2><button onClick={onCreateListing} className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent transition-colors"><PlusCircle className="w-5 h-5 mr-2" />Crear Anuncio</button></div>
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Anuncio</th><th scope="col" className="px-6 py-3">Categoría</th><th scope="col" className="px-6 py-3">Precios desde</th><th scope="col" className="px-6 py-3 text-center">Acciones</th></tr></thead>
              <tbody>
                {providerListings.map(l => (<tr key={l.id} className="bg-white border-b hover:bg-gray-50"><th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"><div className="flex items-center space-x-3"><img src={l.imageUrl} alt={l.title} className="w-10 h-10 rounded-md object-cover" /><span>{l.title}</span></div></th><td className="px-6 py-4">{l.category}</td><td className="px-6 py-4">$ {Math.min(...l.packages.map(p => p.price)).toLocaleString()}</td><td className="px-6 py-4 text-center"><button onClick={() => onEditListing(l)} className="font-medium text-primary hover:underline mr-4"><Edit className="w-4 h-4 inline mr-1"/>Editar</button><button onClick={() => handleDelete(l)} className="font-medium text-red-600 hover:underline"><Trash2 className="w-4 h-4 inline mr-1"/>Eliminar</button></td></tr>))}
              </tbody>
            </table>
            {providerListings.length === 0 && <p className="p-6 text-center text-neutral-light">No tienes ningún anuncio publicado.</p>}
          </div>
        </div>;
      case 'calendar':
        return <div>
            <h2 className="text-2xl font-bold text-neutral mb-6">Calendario de Disponibilidad</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                {provider ? <Calendar unavailableDates={provider.unavailableDates} onDateClick={handleDateToggle}/> : <p>No se encontró el perfil de proveedor.</p>}
            </div>
        </div>
      case 'bookings':
        return <div>
          <h2 className="text-2xl font-bold text-neutral mb-6">Mis Contrataciones</h2>
          <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50"><tr><th scope="col" className="px-6 py-3">Servicio</th><th scope="col" className="px-6 py-3">Paquete</th><th scope="col" className="px-6 py-3">Precio</th><th scope="col" className="px-6 py-3">Fecha</th><th scope="col" className="px-6 py-3">Estado</th><th scope="col" className="px-6 py-3 text-center">Acciones</th></tr></thead>
              <tbody>
                {bookings.map(b => (<tr key={b.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{b.listing.title}</th>
                  <td className="px-6 py-4">{b.package.tier}</td>
                  <td className="px-6 py-4 font-semibold text-neutral">${b.package.price.toLocaleString()}</td>
                  <td className="px-6 py-4">{b.bookingDate}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${b.status === 'Confirmada' ? 'bg-green-100 text-green-800' : b.status === 'Completada' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{b.status}</span></td>
                  <td className="px-6 py-4 text-center space-x-2">
                     <button onClick={() => onViewDetails(b.listing)} className="font-medium text-primary hover:underline"><Eye className="w-4 h-4 inline mr-1"/>Ver</button>
                     <button onClick={() => handleCreateDisputeClick(b)} className="font-medium text-orange-600 hover:underline"><ShieldAlert className="w-4 h-4 inline mr-1"/>Reportar</button>
                  </td>
                </tr>))}
              </tbody>
            </table>
            {bookings.length === 0 && <p className="p-6 text-center text-neutral-light">Aún no has contratado ningún servicio.</p>}
          </div>
        </div>;
       case 'projects':
        return <div>
          <h2 className="text-2xl font-bold text-neutral mb-6">Mis Proyectos</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h3 className="font-semibold mb-3">Crear un nuevo proyecto</h3>
            <form onSubmit={handleCreateProjectSubmit} className="flex items-center space-x-2">
              <input type="text" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="Ej: Remodelación Baño Principal" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-primary focus:border-primary"/>
              <button type="submit" className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent transition-colors flex-shrink-0">Crear</button>
            </form>
          </div>
          <div className="space-y-6">
            {projects.map(proj => (
              <div key={proj.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-neutral mb-4">{proj.name}</h3>
                {proj.bookings.length > 0 ? (
                  <ul className="space-y-3">
                    {proj.bookings.map(b => (
                      <li key={b.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-semibold text-neutral">{b.listing.title}</p>
                          <p className="text-sm text-neutral-light">Paquete: {b.package.tier}</p>
                        </div>
                        <p className="font-semibold text-primary">${b.package.price.toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-neutral-light">Aún no hay contrataciones en este proyecto.</p>
                )}
              </div>
            ))}
            {projects.length === 0 && <p className="text-center text-neutral-light py-8">No has creado ningún proyecto todavía.</p>}
          </div>
        </div>
      case 'messages':
        return <div>
          <h2 className="text-2xl font-bold text-neutral mb-6">Mensajes</h2>
          <div className="bg-white rounded-lg shadow-sm border">
            {userConversations.length > 0 ? (
              <ul>
                {userConversations.map(c => {
                  const otherParty = activeRole === 'client' ? c.provider : c.client;
                  const lastMessage = c.messages[c.messages.length - 1];
                  return (
                    <li key={c.id} onClick={() => { setSelectedConversation(c); setView('conversation-detail'); }} className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer">
                      <img src={otherParty.avatarUrl} alt={otherParty.name} className="w-12 h-12 rounded-full mr-4"/>
                      <div className="flex-grow">
                        <p className="font-semibold text-neutral">{otherParty.name}</p>
                        <p className="text-sm text-neutral-light truncate">{lastMessage?.text}</p>
                      </div>
                      <div className="text-xs text-neutral-lighter text-right">
                        <p>{new Date(lastMessage?.timestamp).toLocaleDateString()}</p>
                        <p className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[100px]">{c.listing.title}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : <p className="p-6 text-center text-neutral-light">No tienes mensajes.</p>}
          </div>
        </div>;
    case 'conversation-detail':
      if (!selectedConversation) return null;
      const otherParty = activeRole === 'client' ? selectedConversation.provider : selectedConversation.client;
      return <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b flex items-center">
          <button onClick={() => setView('messages')} className="mr-4 text-neutral-light hover:text-neutral"><ArrowLeft/></button>
          <img src={otherParty.avatarUrl} alt={otherParty.name} className="w-10 h-10 rounded-full mr-3"/>
          <div>
            <p className="font-semibold">{otherParty.name}</p>
            <p className="text-xs text-neutral-light cursor-pointer hover:underline" onClick={() => onViewDetails(selectedConversation.listing)}>{selectedConversation.listing.title}</p>
          </div>
        </div>
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {selectedConversation.messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.from === activeRole ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.from === activeRole ? 'bg-primary text-white' : 'bg-gray-200 text-neutral'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === activeRole ? 'text-blue-200' : 'text-gray-500'} text-right`}>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center space-x-2">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Escribe tu mensaje..." className="w-full bg-gray-100 border-transparent focus:border-primary focus:ring-primary rounded-full px-4 py-2"/>
          <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors flex-shrink-0"><Send className="w-5 h-5"/></button>
        </form>
      </div>
     case 'profile':
        return <div>
          <h2 className="text-2xl font-bold text-neutral mb-6">Mi Perfil</h2>
           <div className="bg-white p-8 rounded-lg shadow-sm border">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label><input type="text" id="name" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral"/></div>
                <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label><input type="email" id="email" defaultValue={user.email} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral"/></div>
                {activeRole === 'provider' && <div className="md:col-span-2"><label htmlFor="bio" className="block text-sm font-medium text-gray-700">Descripción de tu negocio</label><textarea id="bio" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral" placeholder="Habla sobre tu experiencia, especialidades..."></textarea></div>}
             </div>
             <div className="mt-6 flex justify-end"><button onClick={() => alert('Perfil guardado (simulación).')} className="flex items-center bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent transition-colors"><Save className="w-5 h-5 mr-2" />Guardar Cambios</button></div>
          </div>
        </div>;
      default:
        return <div className="bg-white p-10 rounded-lg shadow-sm border text-center"><h2 className="text-2xl font-bold text-neutral">Contenido no disponible</h2><p className="mt-4 text-neutral-light">Esta sección estará disponible próximamente.</p></div>;
    }
  };

  return (
    <main className={`flex-1 p-6 sm:p-8 overflow-y-auto ${currentView === 'conversation-detail' ? 'h-full flex flex-col' : ''}`}>
      {renderContent()}
    </main>
  );
};

const Notifications: React.FC<{notifications: Notification[], setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>}> = ({ notifications, setNotifications }) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if(!isOpen) {
            // Mark all as read when opening
            setTimeout(() => {
                setNotifications(prev => prev.map(n => ({...n, read: true})));
            }, 2000);
        }
    }
    
    return (
        <div className="relative">
            <button onClick={handleToggle} className="text-neutral-light hover:text-neutral relative">
                <Bell/>
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">{unreadCount}</span></span>}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border z-50">
                    <div className="p-4 font-semibold border-b">Notificaciones</div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? notifications.map(n => (
                            <div key={n.id} className={`p-4 border-b hover:bg-gray-50 ${!n.read ? 'bg-primary/5' : ''}`}>
                                <p className="text-sm text-neutral">{n.message}</p>
                                <p className="text-xs text-neutral-lighter mt-1">{new Date(n.date).toLocaleString('es-ES')}</p>
                            </div>
                        )) : <p className="p-4 text-sm text-neutral-light text-center">No hay notificaciones</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

const DashboardPage: React.FC<DashboardProps> = (props) => {
  const { user, activeRole } = props;
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    // This effect ensures that if the user switches role, they don't stay on a view that doesn't exist for the new role.
    const providerOnlyViews: DashboardView[] = ['listings', 'calendar', 'analytics'];
    const clientOnlyViews: DashboardView[] = ['bookings', 'projects', 'payments'];

    if (activeRole === 'provider' && clientOnlyViews.includes(currentView)) {
        setCurrentView('overview');
    }
    if (activeRole === 'client' && providerOnlyViews.includes(currentView)) {
        setCurrentView('overview');
    }
  }, [activeRole, currentView]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden lg:block">
        <DashboardSidebar {...props} currentView={currentView} setView={setCurrentView} />
      </div>

      {isSidebarOpen && <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}><div className="absolute inset-0 bg-black opacity-50"></div></div>}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white z-50 lg:hidden`}>
          <DashboardSidebar {...props} currentView={currentView} setView={(view) => { setCurrentView(view); setIsSidebarOpen(false); }} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b p-4 flex justify-between items-center space-x-4">
              <button className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>{isSidebarOpen ? <X/> : <Menu/>}</button>
              <div className="hidden lg:block"><RoleSwitcher {...props} /></div>
              <div className="flex items-center space-x-4">
                <Notifications notifications={props.notifications} setNotifications={props.setNotifications} />
                <button className="text-neutral-light hover:text-neutral"><Settings/></button>
                <div className="flex items-center space-x-2">
                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="hidden sm:block">
                        <p className="font-semibold text-sm text-neutral">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{activeRole}</p>
                    </div>
                </div>
              </div>
          </header>
           <div className="lg:hidden p-4 border-b bg-white"><RoleSwitcher {...props} /></div>
          <DashboardContent {...props} currentView={currentView} setView={setCurrentView} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
      </div>
    </div>
  );
};

export default DashboardPage;
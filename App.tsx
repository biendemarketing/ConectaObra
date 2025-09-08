import React, { useState, useCallback, useMemo } from 'react';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import DashboardPage from './pages/DashboardPage';
import ProviderProfilePage from './pages/ProviderProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import ListingFormPage from './pages/ListingFormPage';
import ComoFuncionaPage from './pages/ComoFuncionaPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Page, Listing, User, Role, Booking, Provider, Conversation, ServicePackage, Project, Notification, Dispute, Transaction } from './types';
import { mockListings as initialListings, mockUserClient, mockUserProvider, mockBookings, mockConversations, mockProjects, mockNotifications, providers as initialProviders, mockUserAdmin, mockTransactions } from './data/mockData';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [user, setUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  const [pendingBooking, setPendingBooking] = useState<{listing: Listing, pkg: ServicePackage} | null>(null);
  const [listingToEdit, setListingToEdit] = useState<Listing | null>(null);

  const handleNavigate = useCallback(<P extends Page>(page: P) => {
    const protectedPages: Page[] = ['dashboard', 'checkout', 'listing-form', 'admin'];
    if (protectedPages.includes(page) && !user) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  }, [user]);

  const handleLogin = useCallback((role: Role) => {
    let loggedInUser: User;
    if (role === 'admin') {
        loggedInUser = mockUserAdmin;
    } else if (role === 'provider' || (role === 'client' && mockUserProvider.roles.includes('client'))) {
        loggedInUser = mockUserProvider;
    } else {
        loggedInUser = mockUserClient;
    }
    
    setUser(loggedInUser);
    setActiveRole(role);
    handleNavigate(role === 'admin' ? 'admin' : 'dashboard');
  }, [handleNavigate]);
  
  const handleLogout = useCallback(() => {
    setUser(null);
    setActiveRole(null);
    handleNavigate('home');
  }, [handleNavigate]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    handleNavigate('search');
  }, [handleNavigate]);
  
  const searchResults = useMemo(() => {
    if (!searchQuery) return listings;
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, listings]);

  const handleViewDetails = useCallback((listing: Listing) => {
    setSelectedListing(listing);
    handleNavigate('detail');
  }, [handleNavigate]);

  const handleViewProviderProfile = useCallback((provider: Provider) => {
      setSelectedProvider(provider);
      handleNavigate('provider-profile');
  }, [handleNavigate]);

  const handleInitiateBooking = useCallback((listing: Listing, pkg: ServicePackage) => {
    if (!user) {
      alert('Por favor, inicia sesión para reservar.');
      handleNavigate('login');
      return;
    }
    if (user.roles.includes('client')) {
      setActiveRole('client');
      setPendingBooking({ listing, pkg });
      handleNavigate('checkout');
    } else {
      alert('Debes tener un rol de cliente para poder contratar servicios.');
    }
  }, [user, handleNavigate]);
  
  const handleConfirmBooking = useCallback((projectId: string | null) => {
    if (!pendingBooking || !user) return;
    const { listing, pkg } = pendingBooking;

    if (bookings.some(b => b.listing.id === listing.id)) {
      alert('Ya has contratado un paquete para este servicio.');
      setCurrentPage('dashboard');
      setActiveRole('client');
      setPendingBooking(null);
      return;
    }

    const newBooking: Booking = {
      id: `b${bookings.length + 1}-${Date.now()}`,
      listing: listing,
      package: pkg,
      bookingDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'Confirmada',
      projectId: projectId || undefined,
    };
    setBookings(prev => [newBooking, ...prev]);

    if (projectId) {
        setProjects(prevProjects =>
            prevProjects.map(p =>
                p.id === projectId ? { ...p, bookings: [newBooking, ...p.bookings] } : p
            )
        );
    }
    
    const newTransaction: Transaction = {
        id: `t${transactions.length + 1}`,
        booking: newBooking,
        amount: pkg.price,
        date: new Date().toISOString(),
        status: 'Pendiente de Liberación'
    };
    setTransactions(prev => [newTransaction, ...prev]);

    const newNotification: Notification = {
      id: `n${notifications.length + 1}`,
      message: `¡Has contratado "${listing.title}"!`,
      date: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);

    alert(`¡Has contratado el paquete "${pkg.tier}" de "${listing.title}"!`);
    setPendingBooking(null);
    setCurrentPage('dashboard');
    setActiveRole('client');
  }, [user, bookings, pendingBooking, notifications.length, transactions.length]);
  
  const handleSendMessage = useCallback((provider: Provider, initialMessage: string) => {
    if (!user) {
      alert('Debes iniciar sesión para enviar un mensaje.');
      handleNavigate('login');
      return;
    }
    
    const existingConversation = conversations.find(c => c.provider.id === provider.id && c.client.id === user.id);
    
    if (existingConversation) {
      setConversations(prev => prev.map(c => 
        c.id === existingConversation.id 
        ? { ...c, messages: [...c.messages, { from: 'client', text: initialMessage, timestamp: new Date().toISOString() }] }
        : c
      ));
    } else {
      const newConversation: Conversation = {
        id: `c${conversations.length + 1}`,
        client: user,
        provider: provider,
        listing: selectedListing!,
        messages: [
          { from: 'client', text: initialMessage, timestamp: new Date().toISOString() }
        ],
      };
      setConversations(prev => [newConversation, ...prev]);
    }
    
    alert('Mensaje enviado. Serás redirigido a tu bandeja de entrada.');
    setActiveRole('client');
    handleNavigate('dashboard');
  }, [user, conversations, selectedListing, handleNavigate]);

  const handleCreateListing = useCallback(() => {
    setListingToEdit(null);
    handleNavigate('listing-form');
  }, [handleNavigate]);
  
  const handleEditListing = useCallback((listing: Listing) => {
    setListingToEdit(listing);
    handleNavigate('listing-form');
  }, [handleNavigate]);

    const handleDeleteListing = useCallback((listingId: string) => {
        setListings(prev => prev.filter(l => l.id !== listingId));
    }, []);

  const handleSaveListing = useCallback((listingData: Listing) => {
    if (listingData.id && listingToEdit) { // Editing existing
      setListings(prev => prev.map(l => l.id === listingData.id ? listingData : l));
    } else { // Creating new
      const newListing = { ...listingData, id: `l${listings.length + 1}-${Date.now()}` };
      setListings(prev => [newListing, ...prev]);
    }
    alert('Anuncio guardado con éxito.');
    handleNavigate('dashboard');
  }, [handleNavigate, listings.length, listingToEdit]);

  const handleCreateProject = useCallback((projectName: string) => {
    if (!user) return;
    const newProject: Project = {
      id: `proj${projects.length + 1}-${Date.now()}`,
      name: projectName,
      userId: user.id,
      bookings: []
    };
    setProjects(prev => [newProject, ...prev]);
  }, [user, projects.length]);

  const handleCreateDispute = useCallback((booking: Booking, reason: string) => {
        if (!user) return;
        const newDispute: Dispute = {
            id: `d${disputes.length + 1}`,
            booking,
            reason,
            status: 'Abierta',
            reportedDate: new Date().toISOString(),
            client: user,
            provider: booking.listing.provider,
        };
        setDisputes(prev => [newDispute, ...prev]);
        alert('Tu disputa ha sido creada y será revisada por un administrador.');
    }, [user, disputes.length]);

    const handleUpdateProviderStatus = useCallback((providerId: string, verified: boolean) => {
        setProviders(prev => prev.map(p => p.id === providerId ? { ...p, verified } : p));
        setListings(prev => prev.map(l => l.provider.id === providerId ? { ...l, provider: { ...l.provider, verified } } : l));
    }, []);
    
    const handleUpdateProviderBlockStatus = useCallback((providerId: string, status: 'active' | 'blocked') => {
        setProviders(prev => prev.map(p => p.id === providerId ? { ...p, status } : p));
    }, []);


    const handleSetUnavailableDates = useCallback((providerId: string, dates: string[]) => {
        setProviders(prev => prev.map(p => p.id === providerId ? { ...p, unavailableDates: dates } : p));
    }, []);

    const handleResolveDispute = useCallback((disputeId: string) => {
        setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'Resuelta' } : d));
    }, []);
    
    const handleReleasePayment = useCallback((transactionId: string) => {
        setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: 'Pagado' } : t));
    }, []);
    
    const handleRefundPayment = useCallback((transactionId: string) => {
        setTransactions(prev => prev.map(t => t.id === transactionId ? { ...t, status: 'Reembolsado' } : t));
    }, []);

  
  const renderPage = () => {
    const providerForForm = providers.find(p => p.id === user?.id) || null;

    switch (currentPage) {
      case 'home':
        return <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
      case 'search':
        return <SearchResultsPage listings={searchResults} onViewDetails={handleViewDetails} initialQuery={searchQuery} onSearch={handleSearch} onViewProviderProfile={handleViewProviderProfile} />;
      case 'detail':
        return selectedListing ? <ListingDetailPage listing={selectedListing} onInitiateBooking={handleInitiateBooking} onViewProviderProfile={handleViewProviderProfile} onSendMessage={handleSendMessage} /> : <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onRegister={handleLogin} onNavigate={handleNavigate} />;
      case 'dashboard':
        return user && activeRole ? <DashboardPage 
            user={user} 
            activeRole={activeRole} 
            setActiveRole={setActiveRole} 
            bookings={bookings} 
            allListings={listings} 
            onViewDetails={handleViewDetails} 
            onLogout={handleLogout} 
            conversations={conversations} 
            setConversations={setConversations} 
            onNavigate={handleNavigate}
            projects={projects.filter(p => p.userId === user.id)}
            onCreateProject={handleCreateProject}
            notifications={notifications}
            setNotifications={setNotifications}
            onCreateListing={handleCreateListing}
            onEditListing={handleEditListing}
            onDeleteListing={handleDeleteListing}
            provider={providers.find(p => p.id === user.id)}
            onSetUnavailableDates={handleSetUnavailableDates}
            onCreateDispute={handleCreateDispute}
          /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'provider-profile':
        return selectedProvider ? <ProviderProfilePage provider={selectedProvider} allListings={listings} onViewDetails={handleViewDetails} onViewProviderProfile={handleViewProviderProfile}/> : <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
      case 'checkout':
        return pendingBooking && user ? <CheckoutPage bookingDetails={pendingBooking} onConfirmBooking={handleConfirmBooking} onCancel={() => handleNavigate('detail')} projects={projects.filter(p => p.userId === user.id)} /> : <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
      case 'listing-form':
        return user && providerForForm ? <ListingFormPage 
            provider={providerForForm} 
            onSave={handleSaveListing} 
            onCancel={() => handleNavigate('dashboard')} 
            listingToEdit={listingToEdit} 
          /> : <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
      case 'como-funciona':
        return <ComoFuncionaPage onNavigate={handleNavigate} onSearch={handleSearch} />;
      case 'admin':
          return user && user.roles.includes('admin') ? <AdminDashboardPage 
            user={user}
            onLogout={handleLogout}
            providers={providers}
            listings={listings}
            disputes={disputes}
            transactions={transactions}
            onUpdateProviderStatus={handleUpdateProviderStatus}
            onUpdateProviderBlockStatus={handleUpdateProviderBlockStatus}
            onDeleteListing={handleDeleteListing}
            onResolveDispute={handleResolveDispute}
            onReleasePayment={handleReleasePayment}
            onRefundPayment={handleRefundPayment}
          /> : <LoginPage onLogin={handleLogin} onNavigate={handleNavigate}/>;
      default:
        return <HomePage listings={listings} onSearch={handleSearch} onViewDetails={handleViewDetails} onNavigate={handleNavigate} onViewProviderProfile={handleViewProviderProfile} />;
    }
  };

  const isAuthPage = currentPage === 'login' || currentPage === 'register';
  const isSpecialPage = ['dashboard', 'listing-form', 'admin'].includes(currentPage);

  if (isSpecialPage) {
    return renderPage();
  }

  return (
    <div className={`bg-gray-50 min-h-screen flex flex-col font-sans ${isAuthPage ? 'justify-center' : ''}`}>
      {!isAuthPage && <Header onNavigate={handleNavigate} user={user} onLogout={handleLogout} onSearch={handleSearch} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
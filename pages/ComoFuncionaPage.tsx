import React, { useState } from 'react';
import { Page } from '../types';
import { Search, FileText, BadgeCheck, MessageSquare, Briefcase, ListPlus, CalendarCheck, BarChart2, ArrowRight } from 'lucide-react';

interface ComoFuncionaPageProps {
    onNavigate: (page: Page) => void;
    onSearch: (query: string) => void;
}

const StepCard: React.FC<{ icon: React.ElementType, title: string, description: string, stepNumber: number }> = ({ icon: Icon, title, description, stepNumber }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center flex flex-col items-center">
        <div className="relative mb-4">
            <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">{stepNumber}</div>
            <div className="bg-primary/10 rounded-full p-4">
                <Icon className="w-10 h-10 text-primary" />
            </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral mt-2">{title}</h3>
        <p className="text-neutral-light mt-2 text-sm flex-grow">{description}</p>
    </div>
);


const ComoFuncionaPage: React.FC<ComoFuncionaPageProps> = ({ onNavigate, onSearch }) => {
    const [activeTab, setActiveTab] = useState<'client' | 'provider'>('client');

    const clientSteps = [
        { icon: Search, title: "Busca y Compara", description: "Utiliza nuestros filtros avanzados para encontrar exactamente el servicio o equipo que necesitas. Compara perfiles, paquetes y reseñas." },
        { icon: FileText, title: "Contrata con Confianza", description: "Selecciona el paquete que se ajusta a tu proyecto y contrata directamente a través de nuestra plataforma segura." },
        { icon: MessageSquare, title: "Colabora y Gestiona", description: "Comunícate con tu proveedor, comparte archivos y gestiona todo el proceso desde tu panel de control." },
        { icon: BadgeCheck, title: "Aprueba y Califica", description: "Una vez completado el trabajo, libera el pago y deja una calificación para ayudar a otros miembros de la comunidad." }
    ];

    const providerSteps = [
        { icon: Briefcase, title: "Crea tu Perfil", description: "Regístrate y completa tu perfil de proveedor. Destaca tu experiencia, habilidades y sube un portafolio de tus mejores trabajos." },
        { icon: ListPlus, title: "Publica tus Servicios", description: "Crea anuncios detallados para cada uno de tus servicios o equipos. Define paquetes claros (Básico, Estándar, Premium) para atraer a más clientes." },
        { icon: CalendarCheck, title: "Recibe y Gestiona Contrataciones", description: "Recibe notificaciones de nuevas contrataciones, comunícate con los clientes y gestiona tu agenda, todo desde un solo lugar." },
        { icon: BarChart2, title: "Completa y Cobra", description: "Entrega un trabajo de alta calidad, recibe la aprobación del cliente y cobra tus pagos de forma segura y puntual a través de la plataforma." }
    ];
    
    const steps = activeTab === 'client' ? clientSteps : providerSteps;

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-neutral tracking-tight sm:text-5xl">Simple, Seguro y Eficiente</h1>
                    <p className="mt-4 text-lg text-neutral-light">ConectaObra está diseñado para simplificar cada paso de tu proyecto. Elige tu rol y descubre lo fácil que es empezar.</p>
                </div>

                <div className="mt-12 max-w-sm mx-auto flex p-1.5 bg-gray-200/80 rounded-full">
                    <button 
                        onClick={() => setActiveTab('client')}
                        className={`w-1/2 py-3 rounded-full text-center font-semibold transition-all duration-300 ${activeTab === 'client' ? 'bg-white text-primary shadow-md' : 'text-gray-600 hover:bg-gray-300/50'}`}
                    >
                        Soy Cliente
                    </button>
                    <button 
                        onClick={() => setActiveTab('provider')}
                        className={`w-1/2 py-3 rounded-full text-center font-semibold transition-all duration-300 ${activeTab === 'provider' ? 'bg-white text-primary shadow-md' : 'text-gray-600 hover:bg-gray-300/50'}`}
                    >
                        Soy Proveedor
                    </button>
                </div>
                
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <StepCard key={index} {...step} stepNumber={index + 1} />
                    ))}
                </div>

                <div className="mt-20 text-center bg-white p-10 rounded-2xl shadow-lg border border-gray-200/80">
                    {activeTab === 'client' ? (
                        <>
                            <h2 className="text-2xl font-bold text-neutral">¿Listo para encontrar al profesional perfecto?</h2>
                            <p className="mt-2 text-neutral-light max-w-xl mx-auto">Explora miles de servicios y equipos verificados para dar vida a tu próximo proyecto.</p>
                            <button 
                                onClick={() => onSearch('')}
                                className="mt-6 bg-primary text-white font-bold rounded-full px-8 py-3 text-base hover:bg-accent transition-all flex items-center mx-auto"
                            >
                                Empezar a buscar ahora <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-neutral">¿Preparado para hacer crecer tu negocio?</h2>
                            <p className="mt-2 text-neutral-light max-w-xl mx-auto">Únete a nuestra comunidad de profesionales y accede a una red de clientes que buscan tus habilidades.</p>
                            <button 
                                onClick={() => onNavigate('register')}
                                className="mt-6 bg-secondary text-neutral font-bold rounded-full px-8 py-3 text-base hover:brightness-110 transition-all flex items-center mx-auto"
                            >
                                Regístrate como Proveedor <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ComoFuncionaPage;
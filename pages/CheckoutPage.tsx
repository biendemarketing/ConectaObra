import React, { useState } from 'react';
import { Listing, ServicePackage, Project } from '../types';
import { CreditCard, ShieldCheck, ArrowLeft, Briefcase } from 'lucide-react';

interface CheckoutPageProps {
  bookingDetails: {
    listing: Listing;
    pkg: ServicePackage;
  };
  projects: Project[];
  onConfirmBooking: (projectId: string | null) => void;
  onCancel: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ bookingDetails, projects, onConfirmBooking, onCancel }) => {
  const { listing, pkg } = bookingDetails;
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button onClick={onCancel} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a los detalles del servicio
        </button>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-4 py-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral mb-2">Confirmar y Contratar</h1>
            <p className="text-neutral-light mb-8">Estás a un paso de contratar un servicio increíble.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Summary & Project Assignment */}
              <div>
                <h2 className="text-lg font-bold text-neutral mb-4 border-b pb-2">Resumen de tu Orden</h2>
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img src={listing.imageUrl} alt={listing.title} className="w-20 h-20 rounded-md object-cover" />
                  <div>
                    <p className="text-sm text-neutral-light">{listing.provider.name}</p>
                    <h3 className="font-semibold text-neutral">{listing.title}</h3>
                    <p className="font-bold text-primary mt-1">Paquete {pkg.tier}</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2 text-sm">
                   <div className="flex justify-between">
                     <span className="text-neutral-light">Precio del paquete:</span>
                     <span className="font-medium text-neutral">${pkg.price.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-neutral-light">Tarifa de servicio:</span>
                     <span className="font-medium text-neutral">$0.00</span>
                   </div>
                   <div className="flex justify-between text-lg font-bold pt-2 border-t mt-2">
                     <span className="text-neutral">Total:</span>
                     <span className="text-primary">${pkg.price.toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                     <h2 className="text-lg font-bold text-neutral mb-3 flex items-center"><Briefcase className="w-5 h-5 mr-2" />Organiza tu Obra</h2>
                     <label htmlFor="project" className="block text-sm font-medium text-gray-700">Asignar a un proyecto (opcional)</label>
                      <select
                        id="project"
                        value={selectedProjectId || ''}
                        onChange={(e) => setSelectedProjectId(e.target.value || null)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      >
                          <option value="">No asignar a un proyecto</option>
                          {projects.map(p => (
                              <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                      </select>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h2 className="text-lg font-bold text-neutral mb-4 border-b pb-2">Detalles de Pago</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                        <input type="text" id="card-number" placeholder="**** **** **** 1234" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                     <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiración</label>
                            <input type="text" id="expiry-date" placeholder="MM/YY" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                            <input type="text" id="cvc" placeholder="123" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Nombre en la Tarjeta</label>
                        <input type="text" id="card-name" placeholder="John Doe" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button 
                onClick={() => onConfirmBooking(selectedProjectId)}
                className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-center text-lg"
              >
                <CreditCard className="w-5 h-5 mr-3" />
                Confirmar y Contratar
              </button>
              <div className="flex items-center justify-center mt-4 text-sm text-green-700">
                <ShieldCheck className="w-4 h-4 mr-1"/>
                <span>Pago seguro y encriptado.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
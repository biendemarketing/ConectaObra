import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Listing, ServicePackage, Provider } from '../types';
import { Save, ArrowLeft, PlusCircle, Trash2, UploadCloud } from 'lucide-react';
import { provincesAndCities } from '../data/mockData';

interface ListingFormPageProps {
  provider: Provider;
  onSave: (listing: Listing) => void;
  onCancel: () => void;
  listingToEdit: Listing | null;
}

const emptyListing: Omit<Listing, 'id' | 'provider' | 'rating' | 'reviewsCount' | 'reviews'> = {
    title: '',
    category: 'Profesional',
    type: '',
    province: '',
    city: '',
    packages: [{ tier: 'Básico', price: 0, features: [] }],
    imageUrl: '',
    gallery: [],
    description: '',
    specs: {},
};

const ListingFormPage: React.FC<ListingFormPageProps> = ({ provider, onSave, onCancel, listingToEdit }) => {
  const [listing, setListing] = useState<Omit<Listing, 'provider' | 'rating' | 'reviewsCount' | 'reviews'>>(() => 
    listingToEdit ? { ...listingToEdit } : { ...emptyListing, id: '' }
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listingToEdit) {
      setListing({ ...listingToEdit });
    } else {
      setListing({ ...emptyListing, id: '', province: provider.province, city: provider.city });
    }
  }, [listingToEdit, provider]);

  const availableCities = useMemo(() => {
    if (!listing.province) return [];
    return provincesAndCities.find(p => p.province === listing.province)?.cities || [];
  }, [listing.province]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setListing(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setListing(prev => ({ ...prev, province: e.target.value, city: '' }));
  }

  const handlePackageChange = (index: number, field: keyof ServicePackage, value: string | number | string[]) => {
      const newPackages = [...listing.packages];
      if (field === 'features') {
        newPackages[index] = { ...newPackages[index], features: (value as string).split('\n') };
      } else {
        (newPackages[index] as any)[field] = value;
      }
      setListing(prev => ({ ...prev, packages: newPackages }));
  }

  const addPackage = () => {
    if (listing.packages.length < 3) {
      const tiers: ServicePackage['tier'][] = ['Básico', 'Estándar', 'Premium'];
      const nextTier = tiers[listing.packages.length];
      setListing(prev => ({ ...prev, packages: [...prev.packages, { tier: nextTier, price: 0, features: []}] }));
    }
  }

  const removePackage = (index: number) => {
    if (listing.packages.length > 1) {
      setListing(prev => ({ ...prev, packages: prev.packages.filter((_, i) => i !== index)}));
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setListing(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalListing = {
        ...listing,
        id: listingToEdit?.id || '',
        provider,
        rating: listingToEdit?.rating || 0,
        reviewsCount: listingToEdit?.reviewsCount || 0,
        reviews: listingToEdit?.reviews || []
    };
    onSave(finalListing as Listing);
  };
  
  const formElementClasses = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-neutral";

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button onClick={onCancel} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al panel de control
        </button>
        <h1 className="text-3xl font-bold text-neutral mb-6">{listingToEdit ? 'Editar Anuncio' : 'Crear Nuevo Anuncio'}</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del Anuncio</label>
                <input type="text" name="title" id="title" value={listing.title} onChange={handleInputChange} className={formElementClasses} required/>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                <select name="category" id="category" value={listing.category} onChange={handleInputChange} className={formElementClasses}>
                  <option value="Profesional">Profesional</option>
                  <option value="Equipo">Equipo</option>
                </select>
              </div>
               <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Servicio/Equipo</label>
                <input type="text" name="type" id="type" value={listing.type} onChange={handleInputChange} className={formElementClasses} placeholder="Ej: Arquitecto, Excavadora" required/>
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provincia</label>
                    <select name="province" id="province" value={listing.province} onChange={handleProvinceChange} className={formElementClasses} required>
                        <option value="">Seleccione</option>
                        {provincesAndCities.map(p => <option key={p.province} value={p.province}>{p.province}</option>)}
                    </select>
                 </div>
                 <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <select name="city" id="city" value={listing.city} onChange={handleInputChange} className={formElementClasses} required disabled={!listing.province}>
                        <option value="">Seleccione</option>
                        {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
               </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea name="description" id="description" value={listing.description} onChange={handleInputChange} rows={5} className={formElementClasses} required></textarea>
              </div>
            </div>
          </div>
          
          {/* Packages */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Paquetes de Servicio</h2>
              {listing.packages.length < 3 && <button type="button" onClick={addPackage} className="flex items-center text-sm text-primary font-semibold"><PlusCircle className="w-4 h-4 mr-1"/>Añadir Paquete</button>}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {listing.packages.map((pkg, index) => (
                <div key={index} className="border p-4 rounded-md bg-gray-50 relative">
                  {listing.packages.length > 1 && <button type="button" onClick={() => removePackage(index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>}
                  <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700">Nivel</label>
                     <select value={pkg.tier} onChange={e => handlePackageChange(index, 'tier', e.target.value)} className={`${formElementClasses} text-lg font-bold`}>
                        <option value="Básico">Básico</option>
                        <option value="Estándar">Estándar</option>
                        <option value="Premium">Premium</option>
                     </select>
                  </div>
                  <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
                     <input type="number" value={pkg.price} onChange={e => handlePackageChange(index, 'price', Number(e.target.value))} className={formElementClasses}/>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Características (una por línea)</label>
                     <textarea value={pkg.features.join('\n')} onChange={e => handlePackageChange(index, 'features', e.target.value)} rows={4} className={formElementClasses}></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
           {/* Images */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Imagen Principal</h2>
            <div className="flex items-center space-x-6">
                <div className="w-48 h-32 rounded-lg bg-gray-100 flex items-center justify-center">
                    {listing.imageUrl ? <img src={listing.imageUrl} alt="Vista previa" className="w-full h-full object-cover rounded-lg"/> : <span className="text-sm text-gray-500">Vista previa</span>}
                </div>
                <div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden"/>
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center bg-white border border-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <UploadCloud className="w-5 h-5 mr-2" />
                        Subir Imagen
                    </button>
                    <p className="text-xs text-gray-500 mt-2">Sube un archivo desde tu dispositivo.</p>
                </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-accent flex items-center">
              <Save className="w-5 h-5 mr-2" />
              Guardar Anuncio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingFormPage;
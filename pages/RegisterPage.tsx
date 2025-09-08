import React, { useState } from 'react';
import { Page, Role } from '../types';
import { HardHat, User, Mail, Lock, Briefcase, Users } from 'lucide-react';

interface RegisterPageProps {
  onRegister: (role: Role) => void;
  onNavigate: (page: Page) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigate }) => {
  const [role, setRole] = useState<Role>('client');
  const [name, setName] = useState('Constructora del Futuro');
  const [email, setEmail] = useState('contacto@futuro.com');
  const [password, setPassword] = useState('construccion2024');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center cursor-pointer" onClick={() => onNavigate('home')}>
          <HardHat className="w-12 h-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral">
          Crea tu cuenta en ConectaObra
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes una?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="font-medium text-primary hover:text-accent">
            Inicia sesión aquí
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200/80">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiero registrarme como:</label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setRole('client')}
                  className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-200 ${
                    role === 'client' ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'bg-white hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <Users className={`h-8 w-8 mb-2 ${role === 'client' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${role === 'client' ? 'text-primary' : 'text-neutral'}`}>Cliente</span>
                  <p className="text-xs text-gray-500 mt-1">Necesito contratar servicios o alquilar equipos.</p>
                </div>
                <div
                  onClick={() => setRole('provider')}
                  className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-200 ${
                    role === 'provider' ? 'bg-primary/10 border-primary ring-2 ring-primary' : 'bg-white hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <Briefcase className={`h-8 w-8 mb-2 ${role === 'provider' ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`font-semibold ${role === 'provider' ? 'text-primary' : 'text-neutral'}`}>Proveedor</span>
                   <p className="text-xs text-gray-500 mt-1">Quiero ofrecer mis servicios o equipos.</p>
                </div>
              </div>
            </div>

             <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo o Empresa
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <User className="h-5 w-5 text-gray-400" />
                </div>
                <input id="name" name="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="bg-white appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="John Doe"/>
              </div>
            </div>

            <div>
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input id="email-register" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="bg-white appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="tu@email.com"/>
              </div>
            </div>

            <div>
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input id="password-register" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="bg-white appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Mínimo 8 caracteres"/>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
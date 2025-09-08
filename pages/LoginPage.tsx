import React, { useState } from 'react';
import { Page, Role } from '../types';
import { HardHat, Mail, Lock } from 'lucide-react';
import { mockUserProvider } from '../data/mockData';

interface LoginPageProps {
  onLogin: (role: Role) => void;
  onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState(mockUserProvider.email);
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default login as client if user presses enter
    onLogin('client'); 
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center cursor-pointer" onClick={() => onNavigate('home')}>
          <HardHat className="w-12 h-12 text-primary" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-neutral" style={{color: '#172B4D'}}>
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          O{' '}
          <a href="#" onClick={(e) => {e.preventDefault(); onNavigate('register')}} className="font-medium text-primary hover:text-accent">
            crea una cuenta nueva
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-200/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-900 bg-white appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-900 bg-white appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-accent">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            
            <div className="pt-4">
                <p className="text-center text-xs text-gray-500 mb-3">Para demostración, puedes iniciar sesión como:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onLogin('client')}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-neutral bg-secondary hover:brightness-105 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                    >
                      Ingresar como Cliente
                    </button>
                     <button
                      type="button"
                      onClick={() => onLogin('provider')}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-neutral-light hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral"
                      style={{backgroundColor: '#42526E'}}
                    >
                      Ingresar como Proveedor
                    </button>
                </div>
                 <button
                  type="button"
                  onClick={() => onLogin('admin')}
                  className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Ingresar como Administrador
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
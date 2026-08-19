"use client";

import { useState } from 'react';
import api from '../lib/axios';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      login(response.data.access_token, response.data.refresh_token);
      router.push('/diagnostico');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all border";
  const inputStyle = {
    background: 'var(--accent-light)',
    borderColor: 'var(--border-color)',
    color: 'var(--foreground)',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--background)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8 border"
        style={{
          background: '#fff',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center gap-2 font-bold text-2xl mb-6"
            style={{ color: 'var(--accent)' }}
          >
            <Leaf size={32} />
            <span>Sugarcane AI</span>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
            Bienvenido
          </h1>
          <p className="text-sm" style={{ color: 'var(--accent-mid)' }}>
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
              placeholder="tu@email.com"
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
              style={inputStyle}
              placeholder="••••••••"
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white font-semibold py-3 rounded-lg transition-opacity disabled:opacity-50 mt-2"
            style={{ background: 'var(--accent)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--accent-mid)' }}>
          ¿No tienes una cuenta?{' '}
          <Link
            href="/register"
            className="font-medium hover:underline transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

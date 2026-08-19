"use client";

import { useState } from 'react';
import api from '../lib/axios';
import { useRegisterStore } from '../store/registerStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function RegisterPage() {
  const { step, email, password, passwordConfirm, setField, nextStep, prevStep, reset } =
    useRegisterStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Por favor, ingresa un correo válido.');
        return;
      }
      setError('');
      nextStep();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await api.post('/auth/register', { email, password });
      reset();
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al registrar el usuario.');
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
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = 'var(--accent)');
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = 'var(--border-color)');

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--background)' }}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8 border"
        style={{ background: '#fff', borderColor: 'var(--border-color)' }}
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
            Crear Cuenta
          </h1>
          <p className="text-sm" style={{ color: 'var(--accent-mid)' }}>
            Paso {step} de 2
          </p>
        </div>

        {/* Indicador de pasos */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="flex-1 h-1.5 rounded-full transition-all"
              style={{
                background: step >= s ? 'var(--accent)' : 'var(--accent-light)',
              }}
            />
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setField('email', e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
                placeholder="tu@email.com"
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded-lg transition-opacity mt-2"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Continuar
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setField('password', e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
                placeholder="Mínimo 8 caracteres"
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setField('passwordConfirm', e.target.value)}
                required
                className={inputClass}
                style={inputStyle}
                placeholder="Repite tu contraseña"
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 font-medium py-3 rounded-lg transition-colors border"
                style={{
                  background: 'var(--accent-light)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--accent)',
                }}
              >
                Atrás
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 text-white font-medium py-3 rounded-lg transition-opacity disabled:opacity-50"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
              >
                {isLoading ? 'Creando...' : 'Registrar'}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--accent-mid)' }}>
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/login"
            onClick={reset}
            className="font-medium hover:underline transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

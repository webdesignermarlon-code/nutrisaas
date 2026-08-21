'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', cpfCnpj: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      } else {
        alert(data.error || 'Erro ao processar pagamento.');
      }
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-3 py-1 rounded-full uppercase tracking-wider">
          Sistema Exclusivo
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
          Acelere suas vendas com automação profissional
        </h1>
        <p className="text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
          Ativação imediata e infraestrutura completa para alavancar seu negócio.
        </p>

        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
          <div className="text-3xl font-bold text-emerald-400">R$ 987,00</div>
          <div className="text-sm text-slate-400 mt-1">+ R$ 39,00/mês a partir do 2º mês</div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition"
          >
            Ativar Sistema Agora <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Modal de Checkout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Dados de Ativação</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-xs text-slate-400">Nome Completo</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mt-1"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">E-mail</label>
                <input
                  required
                  type="email"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mt-1"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">CPF ou CNPJ</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mt-1"
                  onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Telefone / WhatsApp</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white mt-1"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2"
              >
                {loading ? 'Gerando Cobrança...' : 'Ir para o Pagamento'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
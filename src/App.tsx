/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Bike, 
  UserPlus, 
  FileText, 
  Camera, 
  IdCard, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface CustomerData {
  name: string;
  cpf: string;
  phone: string;
  address: string;
  photo: string | null;
  rgPhoto: string | null;
}

interface RentalOption {
  id: string;
  model: string;
  price: number;
  description: string;
  image: string;
}

// --- Constants ---

const WHATSAPP_NUMBER = "5592995197573";
const BUSINESS_ADDRESS = "Avenida BH1 Nlolo Pereira Centro, em frente ao comercial Bom Motivo";

const RENTAL_OPTIONS: RentalOption[] = [
  {
    id: 'biz-old',
    model: 'Biz Modelo Antigo',
    price: 35,
    description: 'Período: Manhã até às 18:00h',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'biz-new',
    model: 'Biz Modelo Novo',
    price: 40,
    description: 'Período: Manhã até às 18:00h',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'pop-new',
    model: 'Pop Modelo Novo',
    price: 50,
    description: 'Período: Manhã até às 18:00h',
    image: 'https://images.unsplash.com/photo-1449491023202-383f9f216621?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'fan-2020',
    model: 'Fan Modelo 2020',
    price: 80,
    description: 'Período: Manhã até às 18:00h',
    image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=400'
  }
];

const CONTRACT_TEXT = `
CONTRATO DE LOCAÇÃO DE MOTOCICLETA - JUAN MOTOS

1. OBJETO: O presente contrato tem por objeto a locação de uma motocicleta para uso urbano.
2. PRAZO: A locação compreende o período da manhã até às 18:00h do dia contratado.
3. RESPONSABILIDADE: O locatário assume total responsabilidade civil e criminal pelo uso do veículo, multas e danos causados a terceiros ou ao próprio veículo.
4. DEVOLUÇÃO: O veículo deve ser entregue no mesmo estado de conservação e com o nível de combustível inicial.
5. DOCUMENTAÇÃO: É obrigatória a apresentação de CNH válida e compatível com a categoria.
`;

// --- Components ---

export default function App() {
  const [view, setView] = useState<'home' | 'register' | 'rental' | 'receipt'>('home');
  const [customer, setCustomer] = useState<CustomerData>({
    name: '',
    cpf: '',
    phone: '',
    address: '',
    photo: null,
    rgPhoto: null
  });
  const [selectedBike, setSelectedBike] = useState<RentalOption | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const rgInputRef = useRef<HTMLInputElement>(null);

  const handleWhatsAppRedirect = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'rgPhoto') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomer(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRegistration = () => {
    if (!customer.name || !customer.cpf || !customer.phone) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }
    setIsRegistered(true);
    const message = `*CADASTRO DE CLIENTE - JUAN MOTOS*\n\nNome: ${customer.name}\nCPF: ${customer.cpf}\nTelefone: ${customer.phone}\nEndereço: ${customer.address}\n\n_Contrato aceito e vinculado ao cadastro._`;
    handleWhatsAppRedirect(message);
    setView('home');
  };

  const handleRental = (bike: RentalOption) => {
    if (!isRegistered) {
      alert("Por favor, realize o cadastro primeiro.");
      setView('register');
      return;
    }
    setSelectedBike(bike);
    const message = `*PEDIDO DE ALUGUEL - JUAN MOTOS*\n\nCliente: ${customer.name}\nMoto: ${bike.model}\nValor: R$ ${bike.price.toFixed(2)}\nPeríodo: ${bike.description}\n\n_Contrato vinculado ao aluguel._`;
    handleWhatsAppRedirect(message);
    setView('receipt');
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      {/* Header */}
      <header className="bg-black text-white p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-10 gap-1 rotate-12 scale-150">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className={`w-8 h-8 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`} />
            ))}
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-red-600 shadow-lg"
          >
            <Bike size={48} className="text-red-600" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tighter uppercase text-center">
            Juan <span className="text-red-600">Motos</span>
          </h1>
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Aluguel de Motos</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setView('register')}
                  className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-red-600 flex items-center gap-4 hover:bg-red-50 transition-colors group"
                >
                  <div className="bg-red-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <UserPlus size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Cadastro de Cliente</h3>
                    <p className="text-sm text-neutral-500">Completo com foto e RG</p>
                  </div>
                  <ChevronRight className="ml-auto text-neutral-300" />
                </button>

                <button 
                  onClick={() => setView('rental')}
                  className="bg-white p-6 rounded-2xl shadow-md border-b-4 border-black flex items-center gap-4 hover:bg-neutral-50 transition-colors group"
                >
                  <div className="bg-black p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Bike size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Alugar Moto</h3>
                    <p className="text-sm text-neutral-500">Escolha seu modelo</p>
                  </div>
                  <ChevronRight className="ml-auto text-neutral-300" />
                </button>
              </div>

              {/* Info Card */}
              <div className="bg-red-600 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-black uppercase">Promoção do Dia</h2>
                  <p className="opacity-90">Alugue agora e garanta sua mobilidade em Manaus. Atendimento rápido via WhatsApp!</p>
                  <div className="flex items-center gap-2 text-sm font-mono bg-black/20 p-2 rounded-lg inline-block">
                    <Clock size={16} />
                    <span>Devolução até às 18:00h</span>
                  </div>
                </div>
                <div className="text-4xl font-black">R$ 35<span className="text-xl opacity-70">/dia</span></div>
              </div>

              {/* Address */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex items-start gap-3">
                <MapPin className="text-red-600 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-sm uppercase text-neutral-500">Nossa Localização</h4>
                  <p className="text-sm leading-tight">{BUSINESS_ADDRESS}</p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'register' && (
            <motion.div 
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="bg-black p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold uppercase tracking-tight">Cadastro Completo</h2>
                <button onClick={() => setView('home')} className="text-sm opacity-70 hover:opacity-100">Voltar</button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-500">Nome Completo</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Ex: João Silva"
                      value={customer.name}
                      onChange={e => setCustomer({...customer, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-500">CPF</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="000.000.000-00"
                      value={customer.cpf}
                      onChange={e => setCustomer({...customer, cpf: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-500">WhatsApp</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="(92) 99999-9999"
                      value={customer.phone}
                      onChange={e => setCustomer({...customer, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-500">Endereço</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Rua, Número, Bairro"
                      value={customer.address}
                      onChange={e => setCustomer({...customer, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-500">Foto do Cliente</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square bg-neutral-100 rounded-2xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors overflow-hidden"
                    >
                      {customer.photo ? (
                        <img src={customer.photo} alt="Cliente" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera className="text-neutral-400 mb-2" />
                          <span className="text-[10px] font-bold uppercase text-neutral-400">Tirar Foto</span>
                        </>
                      )}
                    </div>
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => handlePhotoUpload(e, 'photo')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-500">Foto do RG</label>
                    <div 
                      onClick={() => rgInputRef.current?.click()}
                      className="aspect-square bg-neutral-100 rounded-2xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-200 transition-colors overflow-hidden"
                    >
                      {customer.rgPhoto ? (
                        <img src={customer.rgPhoto} alt="RG" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <IdCard className="text-neutral-400 mb-2" />
                          <span className="text-[10px] font-bold uppercase text-neutral-400">Frente/Verso</span>
                        </>
                      )}
                    </div>
                    <input type="file" hidden ref={rgInputRef} accept="image/*" onChange={e => handlePhotoUpload(e, 'rgPhoto')} />
                  </div>
                </div>

                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-red-600" />
                    <h4 className="text-xs font-bold uppercase">Contrato de Locação</h4>
                  </div>
                  <div className="text-[10px] text-neutral-600 h-24 overflow-y-auto bg-white p-2 rounded border border-neutral-100 font-mono">
                    {CONTRACT_TEXT}
                  </div>
                  <p className="text-[10px] mt-2 text-neutral-400 italic">* Ao clicar em finalizar, você declara estar de acordo com os termos do contrato.</p>
                </div>

                <button 
                  onClick={submitRegistration}
                  className="w-full bg-red-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Finalizar Cadastro
                </button>
              </div>
            </motion.div>
          )}

          {view === 'rental' && (
            <motion.div 
              key="rental"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-black uppercase tracking-tighter">Escolha sua Moto</h2>
                <button onClick={() => setView('home')} className="text-sm font-bold text-red-600">Voltar</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RENTAL_OPTIONS.map((bike) => (
                  <motion.div 
                    key={bike.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-3xl shadow-md overflow-hidden border border-neutral-200 group"
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img src={bike.image} alt={bike.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full font-black text-sm">
                        R$ {bike.price}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="font-black text-lg uppercase leading-tight">{bike.model}</h3>
                        <p className="text-xs text-neutral-500 font-medium">{bike.description}</p>
                      </div>
                      <button 
                        onClick={() => handleRental(bike)}
                        className="w-full bg-black text-white p-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                      >
                        Alugar Agora
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'receipt' && selectedBike && (
            <motion.div 
              key="receipt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-red-600 max-w-md mx-auto relative"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Bike size={120} />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Recibo de Locação</h2>
                <p className="text-xs font-bold text-neutral-400">JUAN MOTOS - ALUGUEL DE MOTOS</p>
              </div>

              <div className="space-y-4 border-y border-dashed border-neutral-200 py-6 my-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 uppercase font-bold text-[10px]">Cliente</span>
                  <span className="font-bold">{customer.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 uppercase font-bold text-[10px]">Veículo</span>
                  <span className="font-bold">{selectedBike.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 uppercase font-bold text-[10px]">Data</span>
                  <span className="font-bold">{new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500 uppercase font-bold text-[10px]">Período</span>
                  <span className="font-bold">Até 18:00h</span>
                </div>
                <div className="flex justify-between text-lg pt-4 border-t border-neutral-100">
                  <span className="font-black uppercase">Total</span>
                  <span className="font-black text-red-600">R$ {selectedBike.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => window.print()}
                  className="w-full bg-neutral-100 text-neutral-600 p-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={18} />
                  Imprimir Recibo
                </button>
                <button 
                  onClick={() => setView('home')}
                  className="w-full bg-black text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Novo Aluguel
                </button>
              </div>

              <p className="text-[9px] text-center mt-6 text-neutral-400 leading-tight">
                {BUSINESS_ADDRESS}<br/>
                Suporte: (92) 99519-7573
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav / Support */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-neutral-200 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider">Suporte Online</span>
          </div>
          <button 
            onClick={() => handleWhatsAppRedirect("Olá Juan Motos, gostaria de tirar uma dúvida sobre o aluguel.")}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-green-200 hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

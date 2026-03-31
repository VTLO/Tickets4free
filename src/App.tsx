import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Train } from 'lucide-react';
import { Ticket, TicketFormData } from './types';
import { TicketForm } from './components/TicketForm';
import { TicketDisplay } from './components/TicketDisplay';
import { generateTicketHash, generateTicketId } from './utils/hashUtils';
import { TICKET_TYPES, getValidUntil } from './utils/stationData';

export default function App() {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (formData: TicketFormData) => {
    setIsLoading(true);
    try {
      const issuedAt = new Date().toISOString();
      const hash = await generateTicketHash({
        ...formData,
        issuedAt,
      });
      const id = generateTicketId(hash);
      const ticketTypeInfo = TICKET_TYPES.find((t) => t.value === formData.ticketType)!;
      const validUntil = getValidUntil(formData.travelDate, formData.travelTime, formData.ticketType);

      const newTicket: Ticket = {
        id,
        passengerName: formData.passengerName,
        origin: formData.origin,
        destination: formData.destination,
        travelDate: formData.travelDate,
        travelTime: formData.travelTime,
        ticketType: formData.ticketType,
        price: ticketTypeInfo.price,
        hash,
        issuedAt,
        validUntil,
      };

      setTicket(newTicket);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTicket(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <Train className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-none">M-Réso</h1>
            <p className="text-zinc-500 text-xs">Virtual Ticket Generator</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {ticket ? (
              <motion.div
                key="display"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TicketDisplay ticket={ticket} onReset={handleReset} />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TicketForm onGenerate={handleGenerate} isLoading={isLoading} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-3 text-center">
        <p className="text-zinc-600 text-xs">
          M-Réso Virtual Ticket Generator · Simulation only · Not for actual transit use
        </p>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ticket, ArrowRight, Calendar, Clock, User, MapPin, Tag } from 'lucide-react';
import { TicketFormData, TicketType } from '../types';
import { TICKET_TYPES, getUniqueStationNames, formatPrice } from '../utils/stationData';

interface TicketFormProps {
  onGenerate: (data: TicketFormData) => void;
  isLoading: boolean;
}

const stationNames = getUniqueStationNames();

export const TicketForm: React.FC<TicketFormProps> = ({ onGenerate, isLoading }) => {
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  const [formData, setFormData] = useState<TicketFormData>({
    passengerName: '',
    origin: stationNames[0],
    destination: stationNames[1],
    travelDate: today,
    travelTime: currentTime,
    ticketType: 'single',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TicketFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TicketFormData, string>> = {};
    if (!formData.passengerName.trim()) {
      newErrors.passengerName = 'Passenger name is required';
    }
    if (formData.origin === formData.destination) {
      newErrors.destination = 'Origin and destination must be different';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onGenerate(formData);
    }
  };

  const handleChange = <K extends keyof TicketFormData>(key: K, value: TicketFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const selectedTicketType = TICKET_TYPES.find((t) => t.value === formData.ticketType)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500 p-2 rounded-lg">
          <Ticket className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">Generate Ticket</h2>
          <p className="text-zinc-400 text-sm">M-Réso Virtual Transit System</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Passenger Name */}
        <div>
          <label className="block text-zinc-400 text-sm mb-1.5">
            <User size={14} className="inline mr-1.5" />
            Passenger Name
          </label>
          <input
            type="text"
            value={formData.passengerName}
            onChange={(e) => handleChange('passengerName', e.target.value)}
            placeholder="Full name"
            className={`w-full bg-zinc-800 border ${
              errors.passengerName ? 'border-red-500' : 'border-zinc-700'
            } text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors`}
          />
          {errors.passengerName && (
            <p className="text-red-400 text-xs mt-1">{errors.passengerName}</p>
          )}
        </div>

        {/* Origin / Destination */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">
              <MapPin size={14} className="inline mr-1.5" />
              Origin
            </label>
            <select
              value={formData.origin}
              onChange={(e) => handleChange('origin', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
            >
              {stationNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">
              <ArrowRight size={14} className="inline mr-1.5" />
              Destination
            </label>
            <select
              value={formData.destination}
              onChange={(e) => handleChange('destination', e.target.value)}
              className={`w-full bg-zinc-800 border ${
                errors.destination ? 'border-red-500' : 'border-zinc-700'
              } text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors`}
            >
              {stationNames.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.destination && (
              <p className="text-red-400 text-xs mt-1">{errors.destination}</p>
            )}
          </div>
        </div>

        {/* Date / Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">
              <Calendar size={14} className="inline mr-1.5" />
              Travel Date
            </label>
            <input
              type="date"
              value={formData.travelDate}
              onChange={(e) => handleChange('travelDate', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1.5">
              <Clock size={14} className="inline mr-1.5" />
              Departure Time
            </label>
            <input
              type="time"
              value={formData.travelTime}
              onChange={(e) => handleChange('travelTime', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        {/* Ticket Type */}
        <div>
          <label className="block text-zinc-400 text-sm mb-2">
            <Tag size={14} className="inline mr-1.5" />
            Ticket Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TICKET_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleChange('ticketType', type.value as TicketType)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  formData.ticketType === type.value
                    ? 'border-green-500 bg-green-500/10 text-white'
                    : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                <div className="font-medium text-sm">{type.label}</div>
                <div className="text-xs mt-0.5 opacity-70">{type.description}</div>
                <div
                  className={`text-sm font-bold mt-1 ${
                    formData.ticketType === type.value ? 'text-green-400' : 'text-zinc-300'
                  }`}
                >
                  {formatPrice(type.price)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-zinc-800 rounded-lg p-3 flex justify-between items-center">
          <span className="text-zinc-400 text-sm">Total</span>
          <span className="text-green-400 font-bold text-lg">
            {formatPrice(selectedTicketType.price)}
          </span>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-green-500 hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Ticket size={18} />
              Generate Ticket
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Download, RefreshCw, CheckCircle, Shield, Train } from 'lucide-react';
import { Ticket } from '../types';
import { formatHashForDisplay, generateBarcodeData } from '../utils/hashUtils';
import { formatPrice } from '../utils/stationData';

interface TicketDisplayProps {
  ticket: Ticket;
  onReset: () => void;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('fr-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function BarcodeStripes({ data }: { data: string }) {
  // Generate deterministic bar widths from the hash data
  const bars = data.split('').map((char) => {
    const code = char.charCodeAt(0);
    return ((code % 4) + 1) * 2;
  });

  return (
    <div className="flex items-center gap-px h-12" aria-hidden="true">
      {bars.map((width, i) => (
        <div
          key={i}
          style={{ width }}
          className={`h-full ${i % 2 === 0 ? 'bg-zinc-800' : 'bg-white'}`}
        />
      ))}
    </div>
  );
}

export const TicketDisplay: React.FC<TicketDisplayProps> = ({ ticket, onReset }) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const shortHash = formatHashForDisplay(ticket.hash);
  const barcodeData = generateBarcodeData(ticket.hash);

  const handleDownload = () => {
    if (!ticketRef.current) return;
    // Build a simple text representation for download
    const content = [
      '╔══════════════════════════════════╗',
      '║      M-RÉSO VIRTUAL TICKET       ║',
      '╠══════════════════════════════════╣',
      `║ ID: ${ticket.id.padEnd(29)}║`,
      `║ Passenger: ${ticket.passengerName.substring(0, 23).padEnd(23)}║`,
      `║ From: ${ticket.origin.substring(0, 26).padEnd(26)}║`,
      `║ To:   ${ticket.destination.substring(0, 26).padEnd(26)}║`,
      `║ Date: ${new Date(ticket.travelDate + 'T' + ticket.travelTime).toLocaleDateString('fr-CA').padEnd(26)}║`,
      `║ Type: ${ticket.ticketType.padEnd(26)}║`,
      `║ Price: ${formatPrice(ticket.price).padEnd(25)}║`,
      '╠══════════════════════════════════╣',
      `║ HASH: ${shortHash.substring(0, 27)}║`,
      '╚══════════════════════════════════╝',
      '',
      `Issued: ${formatDateTime(ticket.issuedAt)}`,
      `Valid until: ${formatDateTime(ticket.validUntil)}`,
      '',
      'This is a virtual/simulation ticket for demonstration purposes only.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ticket.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
      className="w-full max-w-lg"
    >
      {/* Success header */}
      <div className="flex items-center gap-2 mb-4 text-green-400">
        <CheckCircle size={20} />
        <span className="font-medium">Ticket generated successfully</span>
      </div>

      {/* Ticket card */}
      <div ref={ticketRef} className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
        {/* Ticket header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Train className="text-white" size={22} />
            <div>
              <div className="text-white font-bold text-lg leading-none">M-Réso</div>
              <div className="text-green-100 text-xs">Réseau M métro virtuel</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-100 text-xs">Ticket ID</div>
            <div className="text-white font-mono font-bold">{ticket.id}</div>
          </div>
        </div>

        {/* Main ticket body */}
        <div className="p-5 space-y-4">
          {/* Passenger */}
          <div>
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Passenger</div>
            <div className="text-white font-semibold text-lg">{ticket.passengerName}</div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">From</div>
              <div className="text-white font-medium">{ticket.origin}</div>
            </div>
            <div className="text-green-500">→</div>
            <div className="flex-1 text-right">
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">To</div>
              <div className="text-white font-medium">{ticket.destination}</div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Date</div>
              <div className="text-white text-sm">{ticket.travelDate}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Departure</div>
              <div className="text-white text-sm">{ticket.travelTime}</div>
            </div>
          </div>

          {/* Type & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Ticket Type</div>
              <div className="text-white text-sm capitalize">{ticket.ticketType.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Price</div>
              <div className="text-green-400 font-bold">{formatPrice(ticket.price)}</div>
            </div>
          </div>

          {/* Validity */}
          <div>
            <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Valid Until</div>
            <div className="text-white text-sm">{formatDateTime(ticket.validUntil)}</div>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-zinc-700 my-2" />

          {/* Barcode */}
          <div className="flex flex-col items-center gap-2">
            <BarcodeStripes data={barcodeData} />
            <div className="font-mono text-zinc-500 text-xs tracking-widest">{barcodeData}</div>
          </div>

          {/* Dashed divider */}
          <div className="border-t border-dashed border-zinc-700 my-2" />

          {/* Cryptographic hash */}
          <div className="bg-zinc-800 rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Shield size={14} className="text-green-500" />
              <span className="text-zinc-400 text-xs uppercase tracking-wider">SHA-256 Verification Hash</span>
            </div>
            <div className="font-mono text-xs text-green-400 break-all leading-relaxed">{shortHash}</div>
          </div>

          {/* Issued at */}
          <div className="text-zinc-600 text-xs text-center">
            Issued: {formatDateTime(ticket.issuedAt)}
          </div>

          {/* Disclaimer */}
          <div className="text-zinc-600 text-xs text-center">
            This is a virtual simulation ticket. Not valid for actual transit use.
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <motion.button
          onClick={handleDownload}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Download size={16} />
          Save Ticket
        </motion.button>
        <motion.button
          onClick={onReset}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-green-500 hover:bg-green-400 text-black rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw size={16} />
          New Ticket
        </motion.button>
      </div>
    </motion.div>
  );
};

import { Station, TicketType } from '../types';

export const STATIONS: Station[] = [
  // Green Line (Ligne verte)
  { name: 'Angrignon', line: 'Verte', lineColor: '#00A651' },
  { name: 'Monk', line: 'Verte', lineColor: '#00A651' },
  { name: 'Jolicœur', line: 'Verte', lineColor: '#00A651' },
  { name: 'Verdun', line: 'Verte', lineColor: '#00A651' },
  { name: 'De l\'Église', line: 'Verte', lineColor: '#00A651' },
  { name: 'LaSalle', line: 'Verte', lineColor: '#00A651' },
  { name: 'Charlevoix', line: 'Verte', lineColor: '#00A651' },
  { name: 'Lionel-Groulx', line: 'Verte', lineColor: '#00A651' },
  { name: 'Atwater', line: 'Verte', lineColor: '#00A651' },
  { name: 'Guy-Concordia', line: 'Verte', lineColor: '#00A651' },
  { name: 'Peel', line: 'Verte', lineColor: '#00A651' },
  { name: 'McGill', line: 'Verte', lineColor: '#00A651' },
  { name: 'Place-des-Arts', line: 'Verte', lineColor: '#00A651' },
  { name: 'Saint-Laurent', line: 'Verte', lineColor: '#00A651' },
  { name: 'Berri-UQAM', line: 'Verte', lineColor: '#00A651' },
  { name: 'Frontenac', line: 'Verte', lineColor: '#00A651' },
  { name: 'Préfontaine', line: 'Verte', lineColor: '#00A651' },
  { name: 'Joliette', line: 'Verte', lineColor: '#00A651' },
  { name: 'Pie-IX', line: 'Verte', lineColor: '#00A651' },
  { name: 'Viau', line: 'Verte', lineColor: '#00A651' },
  { name: 'Assomption', line: 'Verte', lineColor: '#00A651' },
  { name: 'Cadillac', line: 'Verte', lineColor: '#00A651' },
  { name: 'Langelier', line: 'Verte', lineColor: '#00A651' },
  { name: 'Radisson', line: 'Verte', lineColor: '#00A651' },
  { name: 'Honoré-Beaugrand', line: 'Verte', lineColor: '#00A651' },
  // Orange Line (Ligne orange)
  { name: 'Côte-Vertu', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Du Collège', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'De la Savane', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Namur', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Plamondon', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Snowdon', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Villa-Maria', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Vendôme', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Place-Saint-Henri', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Lionel-Groulx', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Georges-Vanier', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Lucien-L\'Allier', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Bonaventure', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Square-Victoria–OACI', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Place-d\'Armes', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Champ-de-Mars', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Berri-UQAM', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Sherbrooke', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Mont-Royal', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Laurier', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Rosemont', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Beaubien', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Jean-Talon', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Jarry', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Cremazie', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Sauvé', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Henri-Bourassa', line: 'Orange', lineColor: '#EF7D00' },
  { name: 'Cartier', line: 'Orange', lineColor: '#EF7D00' },
  // Yellow Line (Ligne jaune)
  { name: 'Berri-UQAM', line: 'Jaune', lineColor: '#FFD100' },
  { name: 'Jean-Drapeau', line: 'Jaune', lineColor: '#FFD100' },
  { name: 'Longueuil–Université-de-Sherbrooke', line: 'Jaune', lineColor: '#FFD100' },
  // Blue Line (Ligne bleue)
  { name: 'Snowdon', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Côte-Sainte-Catherine', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Outremont', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Édouard-Montpetit', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Université-de-Montréal', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Côte-des-Neiges', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Jean-Talon', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Parc', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'De Castelnau', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Saint-Michel', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Fabre', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'D\'Iberville', line: 'Bleue', lineColor: '#0072CE' },
  { name: 'Anjou', line: 'Bleue', lineColor: '#0072CE' },
];

export const TICKET_TYPES: { value: TicketType; label: string; description: string; price: number }[] = [
  { value: 'single', label: 'Single Trip', description: 'Valid for one journey', price: 3.75 },
  { value: 'return', label: 'Return Trip', description: 'Valid for two journeys', price: 7.00 },
  { value: 'day-pass', label: 'Day Pass', description: 'Unlimited travel for one day', price: 11.00 },
  { value: 'weekly', label: 'Weekly Pass', description: 'Unlimited travel for 7 days', price: 29.00 },
];

export function getUniqueStationNames(): string[] {
  const names = new Set(STATIONS.map((s) => s.name));
  return Array.from(names).sort();
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)} CAD`;
}

export function getValidUntil(travelDate: string, travelTime: string, ticketType: TicketType): string {
  const [year, month, day] = travelDate.split('-').map(Number);
  const [hours, minutes] = travelTime.split(':').map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);

  if (ticketType === 'single') {
    date.setHours(date.getHours() + 2);
  } else if (ticketType === 'return') {
    date.setHours(date.getHours() + 24);
  } else if (ticketType === 'day-pass') {
    date.setHours(23, 59, 59);
  } else if (ticketType === 'weekly') {
    date.setDate(date.getDate() + 7);
  }

  return date.toISOString();
}

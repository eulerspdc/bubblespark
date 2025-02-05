import { isBefore, isToday, formatDistanceToNow, format } from 'date-fns';

export type ExpirationStatus = {
  message: string;
  expired: 'danger' | 'alert' | 'safe';
}

export function checkExpirationDate(date: Date): ExpirationStatus {
  const now = new Date();

  // Verifica se a data é anterior ao dia atual
  if (isBefore(date, now)) {
    return {
      message: 'Expirado',
      expired: 'danger',
    };
  }

  // Verifica se a data é hoje
  if (isToday(date)) {
    return {
      message: 'Expira hoje',
      expired: 'alert',
    };
  }

  // Se a data for futura
  return {
    message: `A data vai expirar em ${formatDistanceToNow(date, { addSuffix: true })}.`,
    expired: 'safe',
  };
}

  
export function timeAgo(date: Date): string {
    const now = new Date();
    const distance = formatDistanceToNow(date, { addSuffix: true });
  
    // Checa se a data é anterior ao dia atual
    if (isBefore(date, now)) {
      return distance;
    }
  
    return 'Data inválida';
  }
  
  
export function formatDate(date: Date): string {
    return format(date, 'dd/MM/yyyy');
  }
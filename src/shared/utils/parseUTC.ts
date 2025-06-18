export function parseUTC(dateStr: string): Date {
    const [d, t] = dateStr.split(' ');
    const [Y, M, D] = d.split('-').map(Number);
    const [h, m, s] = t.split(':').map(Number);
    return new Date(Date.UTC(Y, M - 1, D, h, m, s));
  }
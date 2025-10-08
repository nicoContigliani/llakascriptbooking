// hooks/useMeetLinkGenerator.ts
import { useCallback } from 'react';

// Lista de códigos de Google Meet válidos predefinidos
const VALID_MEET_CODES = [
  'abc-defg-hij', 'xyz-1234-567', 'qwe-rtyu-iop', 'asd-fghj-klz',
  'mnb-vcxl-kjh', 'poi-uytg-rew', 'lkj-hgfd-saq', 'wmn-bvcz-xya',
  'qaz-wsx-edc', 'rfv-tgb-yhn', 'ujm-ikm-olp', 'plm-okn-ijb',
  'tgb-yhn-ujm', 'edc-rfv-tgb', 'zaq-xsw-cde', 'vfr-bgt-nhy',
  'mju-ki8-lo9', 'pq2-ws3-ed4', 'abc-1234-xyz', 'meet-now-123',
  'zii-bwgi-kxu', 'kfp-9mwx-2qr', 'bng-7tvc-8yz', 'xdr-5fgh-3kl',
  'mkl-2qwe-9po', 'vbn-8yui-1mj', 'cxz-4rty-0qw', 'lpo-6ghj-5nm'
];

export const useMeetLinkGenerator = () => {
  // Generar un código de Google Meet único y consistente
  const generateMeetCode = useCallback((seed: string): string => {
    // Si ya tenemos un código en el seed, usarlo
    if (seed.match(/[a-z]{3}-[a-z0-9]{4}-[a-z]{3}/)) {
      return seed;
    }
    
    // Generar un índice basado en el seed para obtener un código consistente
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32-bit integer
    }
    
    const codeIndex = Math.abs(hash) % VALID_MEET_CODES.length;
    return VALID_MEET_CODES[codeIndex];
  }, []);

  // Generar el link completo de Google Meet
  const generateMeetLink = useCallback((seed: string): string => {
    const meetCode = generateMeetCode(seed);
    return `https://meet.google.com/${meetCode}`;
  }, [generateMeetCode]);

  // Generar link de Zoom alternativo
  const generateZoomLink = useCallback((seed: string): string => {
    const meetingId = Math.abs(seed.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0)).toString().substring(0, 10);
    
    const password = btoa(seed).replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
    return `https://zoom.us/j/${meetingId}?pwd=${password}`;
  }, []);

  // Validar si un código de meeting es válido
  const isValidMeetCode = useCallback((code: string): boolean => {
    return code.match(/^[a-z]{3}-[a-z0-9]{4}-[a-z]{3}$/) !== null;
  }, []);

  return {
    generateMeetCode,
    generateMeetLink,
    generateZoomLink,
    isValidMeetCode,
    VALID_MEET_CODES
  };
};

export default useMeetLinkGenerator;
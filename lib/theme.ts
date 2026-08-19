// Jetons de couleur copiés depuis fristaid-mobile/src/constants/theme.ts
// (charte confirmée définitive, voir plan dashboard admin, §Constat de
// l'exploration — "Ne jamais coder une valeur en dur ailleurs" dans la
// source mobile). Pas de monorepo/package partagé cette phase : copie
// intentionnelle, à garder synchronisée manuellement si la charte mobile
// évolue.
export const colors = {
  emergencyRed: '#D62828',
  trustBlue: '#1565C0',
  successGreen: '#2E7D32',
  warningOrange: '#F57C00',
  lightGray: '#F5F7FA',
  white: '#FFFFFF',
  darkText: '#263238',
  mutedText: '#607D8B',
  border: '#E0E0E0',
  successBg: 'rgba(46, 125, 50, 0.12)',
  emergencyBg: 'rgba(214, 40, 40, 0.10)',
  warningBg: 'rgba(245, 124, 0, 0.12)',
  trustBg: 'rgba(21, 101, 192, 0.10)',
} as const;

export const brand = {
  forest: '#16342A',
  forestDeep: '#122A22',
  terracotta: '#C8552C',
  cream: '#F1ECE0',
  creamCard: '#FFFFFF',
  sage: '#8CA290',
} as const;

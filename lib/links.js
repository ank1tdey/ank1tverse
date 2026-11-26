import { site } from './content';

export const whatsappUrl = message =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

// '9/16' → 0.5625
export const ratioValue = ratio => {
  const [w, h] = String(ratio).split('/').map(Number);
  return w && h ? w / h : 1;
};

/**
 * Centralized Design Tokens for TulSip Media
 *
 * Official Four-Color Interface Palette:
 * - Deep Dark:   #1E1110
 * - Dark Brown:  #462C28
 * - Royal Beige: #BDA07E
 * - Light Beige: #F1EADA
 *
 * Nuanced bronze, ivory, and shadow lighting/material effects are derived
 * from the TulSip Media emblem while strictly preserving the 4 core tokens
 * for the interface.
 */

export const PALETTE = {
  deepDark: '#1E1110',
  darkBrown: '#462C28',
  royalBeige: '#BDA07E',
  lightBeige: '#F1EADA',
} as const;

export const PALETTE_RGB = {
  deepDark: '30, 17, 16',
  darkBrown: '70, 44, 40',
  royalBeige: '189, 160, 126',
  lightBeige: '241, 234, 218',
} as const;

export const LIGHTING_AND_MATERIAL = {
  /** Subtle warm ivory specular highlight from logo center glow */
  ivoryGlow: 'rgba(241, 234, 218, 0.24)',
  ivorySoft: 'rgba(241, 234, 218, 0.12)',
  /** Sculpted bronze wave rim & ambient glow */
  bronzeGlow: 'rgba(189, 160, 126, 0.32)',
  bronzeSubtle: 'rgba(189, 160, 126, 0.15)',
  /** Deep espresso/obsidian shadow nuance from logo outer bezel */
  shadowDepth: 'rgba(18, 9, 8, 0.82)',
  shadowAmbient: 'rgba(30, 17, 16, 0.65)',
  /** Metallic bronze & ivory gradients for lighting and material surfaces */
  bronzeSheenGradient:
    'linear-gradient(135deg, #462C28 0%, #BDA07E 50%, #F1EADA 100%)',
  royalGradient:
    'linear-gradient(90deg, #BDA07E 0%, #F1EADA 50%, #BDA07E 100%)',
  surfaceMaterialGradient:
    'linear-gradient(180deg, rgba(70, 44, 40, 0.65) 0%, rgba(30, 17, 16, 0.95) 100%)',
  cardMaterialGradient:
    'linear-gradient(145deg, rgba(70, 44, 40, 0.45) 0%, rgba(30, 17, 16, 0.9) 100%)',
  ivoryBloomRadial:
    'radial-gradient(circle, rgba(241, 234, 218, 0.16) 0%, rgba(189, 160, 126, 0.08) 45%, transparent 75%)',
  bronzeSpotlightRadial:
    'radial-gradient(circle, rgba(189, 160, 126, 0.22) 0%, rgba(70, 44, 40, 0.12) 50%, transparent 75%)',
} as const;

export const SEMANTIC_TOKENS = {
  background: {
    primary: PALETTE.deepDark,
    secondary: PALETTE.darkBrown,
    light: PALETTE.lightBeige,
    accent: PALETTE.royalBeige,
  },
  text: {
    primary: PALETTE.lightBeige,
    secondary: PALETTE.royalBeige,
    muted: 'rgba(189, 160, 126, 0.78)',
    inverse: PALETTE.deepDark,
    inverseSecondary: PALETTE.darkBrown,
  },
  border: {
    subtle: 'rgba(189, 160, 126, 0.22)',
    default: 'rgba(189, 160, 126, 0.38)',
    strong: PALETTE.royalBeige,
    dark: PALETTE.darkBrown,
    light: 'rgba(241, 234, 218, 0.25)',
  },
  button: {
    primaryBg: PALETTE.royalBeige,
    primaryText: PALETTE.deepDark,
    primaryHoverBg: PALETTE.lightBeige,
    primaryHoverText: PALETTE.deepDark,
    secondaryBg: PALETTE.darkBrown,
    secondaryText: PALETTE.lightBeige,
    secondaryHoverBg: PALETTE.royalBeige,
    secondaryHoverText: PALETTE.deepDark,
    outlineBorder: PALETTE.royalBeige,
    outlineText: PALETTE.lightBeige,
  },
  shadow: {
    card: '0 12px 36px -8px rgba(18, 9, 8, 0.75), 0 0 1px 1px rgba(189, 160, 126, 0.18)',
    glow: '0 0 24px 4px rgba(189, 160, 126, 0.35)',
    ivoryGlow: '0 0 28px 6px rgba(241, 234, 218, 0.25)',
    elevated: '0 20px 50px rgba(18, 9, 8, 0.85)',
  },
  transition: {
    fast: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '500ms cubic-bezier(0.22, 1, 0.36, 1)',
    spring: { type: 'spring', stiffness: 300, damping: 28 } as const,
  },
} as const;

export const DESIGN_TOKENS = {
  palette: PALETTE,
  rgb: PALETTE_RGB,
  lighting: LIGHTING_AND_MATERIAL,
  ...SEMANTIC_TOKENS,
} as const;

export default DESIGN_TOKENS;

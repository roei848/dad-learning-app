/**
 * App-wide design tokens for "English for Dad".
 *
 * Color values are fixed per the design brief (warm painterly aesthetic).
 * Shadow, border-radius, and transition values incorporate ui-ux-pro-max
 * Claymorphism recommendations: soft inner+outer shadows, chunky rounded
 * corners, and smooth 200ms ease-out press transitions.
 */
export const theme = {
  colors: {
    background: '#FDF5E6',    // Old Lace / Cream — fixed per design brief
    cardBackground: '#FFFFFF',
    primary: '#6B8F71',       // Sage Green
    secondary: '#5B8CB8',     // Soft Blue
    correct: '#4CAF50',
    wrong: '#E57373',
    text: '#2C2C2C',
    textLight: '#666666',
    border: '#E0D5C1',
  },
  typography: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    body: '20px',
    story: '24px',
    heading: '32px',
    subheading: '24px',
    hebrew: '18px',
    lineHeight: '1.6',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  layout: {
    maxWidth: '1200px',
    contentWidth: '800px',
    storyWidth: '900px',
  },
  // ui-ux-pro-max Claymorphism: chunky 16-24px radius, soft layered shadows
  borderRadius: '12px',
  shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 4px 16px rgba(0, 0, 0, 0.12)',
  // ui-ux-pro-max: soft press transition — 200ms ease-out
  transition: '0.2s ease-out',
};

export type AppTheme = typeof theme;

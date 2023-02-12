import { createTheme, responsiveFontSizes  } from '@mui/material/styles';
import { JADEIITE, SAND, CARBON } from './constant';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    darkbutton: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    darkbutton?: React.CSSProperties;
  }

  interface Palette {
    jadeite: Palette['primary'];
    sand: Palette['primary'];
    carbon: Palette['primary'];
  }

  interface PaletteOptions {
    jadeite: PaletteOptions['primary'];
    sand: PaletteOptions['primary'];
    carbon: PaletteOptions['primary'];
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    darkbutton: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    jadeite: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    jadeite: true;
  }
}

declare module '@mui/material/PaginationItem' {
  interface PaginationItemPropsColorOverrides {
    jadeite: true;
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    jadeite: true;
    sand: true;
  }
}

let theme = createTheme({
  palette: {
    text: { primary: "#444346"},
    jadeite: { main: JADEIITE},
    sand: { main: SAND},
    carbon: {main: CARBON},
  },
  typography: {
    darkbutton: { color: "#f5f5f5" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600 + 240,
      md: 900 + 240,
      lg: 1200 + 240,
      xl: 1536 + 240,
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
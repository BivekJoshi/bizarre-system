import palette, { tokensDark } from "./palette";

// Function to reverse the color palette
function reverseTokens(tokens) {
  const reversedTokens = {};
  Object.entries(tokens).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

// MUI theme settings
export const themeSettings = (mode) => {
  const tokensLight = reverseTokens(tokensDark);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Palette values for dark mode
            primary: {
              ...palette.primary,
              main: palette.primary["light"],
              light: palette.primary["dark"],
            },
            secondary: {
              ...palette.secondary,
              main: palette.secondary[300],
              nav: palette.secondary[400],
            },
            tertiary: {
              ...palette.tertiary,
              main: palette.tertiary[700],
            },
            neutral: {
              ...palette.surface,
              main: palette.surface[500],
              alt: palette.surface["light"],
            },
            background: {
              default: palette.surface["dark"],
              alt: palette.surface[900],
              main: palette.surface[100],
              btn: palette.surface[10],
              hover: palette.primary[600],
              opt: palette.surface[700],
            },
            text: {
              main: palette.surface["light"],
              alt: palette.surface["dark"],
              default: palette.surface["light"],
            },
          }
        : {
            // Palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: palette.primary["light"],
              light: palette.surface[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: palette.secondary[600],
              light: palette.secondary[700],
              header: palette.secondary[400],
              nav: palette.secondary[400],
            },
            tertiary: {
              ...palette.tertiary,
              main: palette.tertiary[700],
            },
            neutral: {
              ...tokensLight.surface,
              main: palette.surface[100],
              alt: palette.primary["light"],
            },
            background: {
              default: palette.surface["light"],
              alt: palette.surface[100],
              main: palette.surface[100],
              btn: palette.secondary[800],
              hover: palette.surface[100],
              opt: palette.surface["light"],
            },
            text: {
              main: palette.surface["dark"],
              alt: palette.surface["light"],
              default: palette.primary["light"],
            },
          }),
    },
    typography: {
      fontFamily: ["DM Sans", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
      h7: {
        fontFamily: ["DM Sans", "sans-serif"].join(","),
        fontSize: 12,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 700,
          },
        },
      },
    },
  };
};

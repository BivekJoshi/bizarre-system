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

// Linear/Notion-inspired neutral surfaces with the existing teal accent.
const NEUTRAL_LIGHT = {
  bg: "#FAFAF9",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F5F4",
  border: "#E7E5E4",
  borderStrong: "#D6D3D1",
  text: "#1C1917",
  textMuted: "#57534E",
  textSubtle: "#A8A29E",
};

const NEUTRAL_DARK = {
  bg: "#0F0F0F",
  surface: "#161616",
  surfaceAlt: "#1F1F1F",
  border: "#262626",
  borderStrong: "#2E2E2E",
  text: "#F5F5F4",
  textMuted: "#A3A3A3",
  textSubtle: "#737373",
};

// MUI theme settings
export const themeSettings = (mode) => {
  const tokensLight = reverseTokens(tokensDark);
  const isDark = mode === "dark";
  const n = isDark ? NEUTRAL_DARK : NEUTRAL_LIGHT;

  return {
    palette: {
      mode: mode,
      ...(isDark
        ? {
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
              default: n.bg,
              paper: n.surface,
              alt: n.surfaceAlt,
              main: n.surface,
              btn: n.surfaceAlt,
              hover: n.surfaceAlt,
              opt: n.surfaceAlt,
            },
            text: {
              primary: n.text,
              secondary: n.textMuted,
              disabled: n.textSubtle,
              main: n.text,
              alt: n.bg,
              default: n.text,
            },
            divider: n.border,
            border: { main: n.border, strong: n.borderStrong },
          }
        : {
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
              default: n.bg,
              paper: n.surface,
              alt: n.surfaceAlt,
              main: n.surface,
              btn: n.surface,
              hover: n.surfaceAlt,
              opt: n.surface,
            },
            text: {
              primary: n.text,
              secondary: n.textMuted,
              disabled: n.textSubtle,
              main: n.text,
              alt: n.surface,
              default: n.text,
            },
            divider: n.border,
            border: { main: n.border, strong: n.borderStrong },
          }),
    },
    shape: {
      borderRadius: 10,
    },
    shadows: [
      "none",
      isDark
        ? "0 1px 0 rgba(255,255,255,0.04)"
        : "0 1px 0 rgba(15,23,42,0.04)",
      isDark
        ? "0 1px 2px rgba(0,0,0,0.4)"
        : "0 1px 2px rgba(15,23,42,0.06)",
      ...Array(22).fill(
        isDark ? "0 4px 16px rgba(0,0,0,0.4)" : "0 4px 16px rgba(15,23,42,0.08)",
      ),
    ],
    typography: {
      fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
      fontSize: 13,
      htmlFontSize: 16,
      h1: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
      },
      h2: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
      },
      h3: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "-0.015em",
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        lineHeight: 1.35,
      },
      h5: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 15,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h7: {
        fontFamily: ["Inter", "DM Sans", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 500,
      },
      body1: { fontSize: 13, lineHeight: 1.55 },
      body2: { fontSize: 12.5, lineHeight: 1.55 },
      caption: { fontSize: 11.5, color: n.textMuted },
      button: { fontSize: 13, fontWeight: 600, letterSpacing: 0 },
      overline: {
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: n.bg, color: n.text },
          "*::-webkit-scrollbar": { width: 8, height: 8 },
          "*::-webkit-scrollbar-track": { background: "transparent" },
          "*::-webkit-scrollbar-thumb": {
            background: n.border,
            borderRadius: 4,
          },
          "*::-webkit-scrollbar-thumb:hover": { background: n.borderStrong },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            paddingInline: 14,
            paddingBlock: 8,
            transition: "background-color .15s ease, border-color .15s ease",
          },
          containedPrimary: {
            color: "#fff",
            "&:hover": { boxShadow: "none" },
          },
          outlined: {
            borderColor: n.border,
            color: n.text,
            "&:hover": {
              borderColor: n.borderStrong,
              backgroundColor: n.surfaceAlt,
            },
          },
          text: {
            color: n.text,
            "&:hover": { backgroundColor: n.surfaceAlt },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&:hover": { backgroundColor: n.surfaceAlt },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${n.border}`,
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            border: `1px solid ${n.border}`,
            borderRadius: 12,
            boxShadow: "none",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: n.surface,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: n.border },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: n.borderStrong,
            },
          },
          input: { paddingBlock: 10 },
        },
      },
      MuiTextField: {
        defaultProps: { size: "small" },
      },
      MuiSelect: {
        defaultProps: { size: "small" },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 500 },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? "#262626" : "#1C1917",
            color: "#fff",
            fontSize: 11.5,
            fontWeight: 500,
            borderRadius: 6,
            paddingInline: 8,
            paddingBlock: 4,
          },
          arrow: { color: isDark ? "#262626" : "#1C1917" },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: n.border },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderColor: n.border, fontSize: 12.5 },
          head: {
            fontWeight: 600,
            color: n.textMuted,
            backgroundColor: n.surfaceAlt,
            textTransform: "none",
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: "transparent" },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 14, border: `1px solid ${n.border}` },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              backgroundColor: isDark
                ? "rgba(6,197,192,0.14)"
                : "rgba(6,197,192,0.10)",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(6,197,192,0.20)"
                  : "rgba(6,197,192,0.16)",
              },
            },
          },
        },
      },
    },
  };
};

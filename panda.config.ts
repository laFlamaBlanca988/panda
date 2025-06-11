// panda.config.ts
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  theme: {
    extend: {
      tokens: {
        colors: {
          // Primary Facebook Blue
          primary: {
            50: { value: "#f0f4ff" },
            100: { value: "#d9e2fc" },
            200: { value: "#b8c9fa" },
            300: { value: "#8da6f6" },
            400: { value: "#6384f3" },
            500: { value: "#4267B2" }, // Facebook primary blue
            600: { value: "#3b5998" }, // Classic Facebook blue
            700: { value: "#2f4a80" },
            800: { value: "#293e69" },
            900: { value: "#1e2e4f" },
          },
          // Secondary accent colors
          secondary: {
            50: { value: "#eefbf3" },
            100: { value: "#d3f4e0" },
            200: { value: "#a9e9c5" },
            300: { value: "#72d6a3" },
            400: { value: "#42bf7e" },
            500: { value: "#36a46c" }, // Action green
            600: { value: "#298057" },
            700: { value: "#246747" },
            800: { value: "#1f513a" },
            900: { value: "#1a442f" },
          },
          // Error/danger (Facebook notification red)
          error: {
            50: { value: "#fff1f1" },
            100: { value: "#ffe1e1" },
            200: { value: "#ffc7c7" },
            300: { value: "#ffa3a3" },
            400: { value: "#ff6464" },
            500: { value: "#fa3e3e" }, // Facebook notification red
            600: { value: "#e53e3e" },
            700: { value: "#c53030" },
            800: { value: "#9b2c2c" },
            900: { value: "#742a2a" },
          },
          // Warning colors
          warning: {
            50: { value: "#fffbeb" },
            100: { value: "#fef3c7" },
            200: { value: "#fde68a" },
            300: { value: "#fcd34d" },
            400: { value: "#fbbf24" },
            500: { value: "#f59e0b" }, // Warning orange
            600: { value: "#d97706" },
            700: { value: "#b45309" },
            800: { value: "#92400e" },
            900: { value: "#78350f" },
          },
          // Success colors
          success: {
            50: { value: "#ecfdf5" },
            100: { value: "#d1fae5" },
            200: { value: "#a7f3d0" },
            300: { value: "#6ee7b7" },
            400: { value: "#34d399" },
            500: { value: "#10b981" }, // Success green
            600: { value: "#059669" },
            700: { value: "#047857" },
            800: { value: "#065f46" },
            900: { value: "#064e3b" },
          },
          // Neutral colors (Facebook UI grays)
          gray: {
            50: { value: "#f9fafb" },
            100: { value: "#f3f4f6" },
            200: { value: "#e5e7eb" }, // Facebook background light gray
            300: { value: "#d1d5db" },
            400: { value: "#9ca3af" },
            500: { value: "#6b7280" },
            600: { value: "#4b5563" },
            700: { value: "#374151" },
            800: { value: "#1f2937" }, // Facebook dark mode background
            900: { value: "#111827" },
          },
          // Facebook messenger accent
          accent: {
            50: { value: "#f5f3ff" },
            100: { value: "#ede9fe" },
            200: { value: "#ddd6fe" },
            300: { value: "#c4b5fd" },
            400: { value: "#a78bfa" },
            500: { value: "#8b5cf6" },
            600: { value: "#7c3aed" }, // Messenger purple
            700: { value: "#6d28d9" },
            800: { value: "#5b21b6" },
            900: { value: "#4c1d95" },
          },
        },
      },
      // Additional semantic tokens for quick reference
      semanticTokens: {
        colors: {
          // UI Elements
          background: { value: "{colors.gray.50}" },
          backgroundDark: { value: "{colors.gray.800}" },
          formBg: { value: "white" },
          border: { value: "{colors.gray.200}" },

          // Text colors
          text: { value: "{colors.gray.900}" },
          textLight: { value: "{colors.gray.500}" },
          textDisabled: { value: "{colors.gray.400}" },

          // Button states
          buttonPrimary: { value: "{colors.primary.500}" },
          buttonPrimaryHover: { value: "{colors.primary.600}" },
          buttonSecondary: { value: "{colors.gray.100}" },
          buttonSecondaryHover: { value: "{colors.gray.200}" },

          // Form elements
          inputBorder: { value: "{colors.gray.300}" },
          inputBorderFocus: { value: "{colors.primary.500}" },
          inputBg: { value: "white" },

          // Status indicators
          successText: { value: "{colors.success.700}" },
          errorText: { value: "{colors.error.700}" },
          warningText: { value: "{colors.warning.700}" },

          // Form builder specific
          previewBg: { value: "{colors.gray.50}" },
          builderBg: { value: "white" },
          dragHandleBg: { value: "{colors.gray.200}" },
          fieldSelectedBg: { value: "{colors.primary.50}" },
          fieldBorderSelected: { value: "{colors.primary.500}" },
        },
      },
    },
  },
  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styled-system",
  jsxFramework: "react",
});

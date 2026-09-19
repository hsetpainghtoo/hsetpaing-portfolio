import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * Flat config. Next 16 removed `next lint`, so ESLint is invoked directly and
 * eslint-config-next is imported rather than pulled through a compat shim:
 * v16 ships real flat-config entrypoints.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
      "graphify-out/**",
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    /**
     * react-hooks v7 ships compiler-backed rules that fire on patterns this
     * codebase uses deliberately. Kept visible as warnings rather than
     * silenced, but not treated as build-breaking:
     *
     * set-state-in-effect  flags the `mounted` guard that next-themes
     *                      prescribes for SSR-safe rendering, and the
     *                      matchMedia subscriptions. Both are advisory about
     *                      an extra render, not correctness bugs.
     * immutability         fires on `ref.current = x` inside useEffect, which
     *                      is exactly where React documents refs should be
     *                      written. False positive.
     * purity               same family, and only hits vendored shadcn code.
     */
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
    },
  },

  {
    /* Vendored shadcn/ui, kept close to upstream so it can be re-synced.
       Not held to the app's own standards. */
    files: ["components/ui/**"],
    rules: { "@typescript-eslint/no-unused-vars": "off" },
  },
];

export default config;

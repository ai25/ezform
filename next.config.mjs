/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
import { fileURLToPath } from "url";
import path from "path";
import pkg from "./next-i18next.config.js";
const { i18n } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    reactStrictMode: true,
    i18n,
};

export default config;

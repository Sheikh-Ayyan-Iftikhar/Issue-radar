import next from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";
const config = [...next, ...ts, { rules: { "@typescript-eslint/no-explicit-any": "off" } }];
export default config;

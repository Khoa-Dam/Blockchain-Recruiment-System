import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Kết hợp cấu hình mở rộng và cấu hình rules tùy chỉnh
export default tseslintConfig({
  // Mở rộng cấu hình từ Next.js (core-web-vitals và typescript)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  rules: {
    "@typescript-eslint/no-explicit-any": "no", // hoặc "off" nếu muốn tắt quy tắc
  },
});

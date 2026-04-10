import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use file URL for local migrations, remote URL at runtime handled by adapter
    url: process.env["DATABASE_URL"],
    directUrl: process.env["DATABASE_URL"],
  },
});

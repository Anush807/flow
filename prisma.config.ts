import "dotenv/config";
import dns from "node:dns";
import { defineConfig, env } from "prisma/config";

dns.setDefaultResultOrder("ipv4first");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

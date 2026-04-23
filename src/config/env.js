import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";
const liveUrl = process.env.LIVE_URL || "http://localhost:5000";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: "development" }),
  PORT: port({ default: 5000 }),
  LIVE_URL: str({ default: liveUrl }),
  DATABASE_URL: str({
    default: isTest
      ? "postgresql://postgres:postgres@localhost:5432/test_db?schema=public"
      : undefined
  }),
  JWT_SECRET: str({
    default: isTest ? "test_jwt_secret" : undefined
  })
});
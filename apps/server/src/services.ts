import { createAuth } from "@boarding-school-new/auth";
import { type Database, createPrismaClient } from "@boarding-school-new/db";

import { env } from "./env.server";

const db = createPrismaClient(env);

export function getDb(): Database {
  return db;
}
export const auth = createAuth(env, db);

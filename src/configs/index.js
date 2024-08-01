import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import { jsonForms } from "./schema";


config({ path: ".env" });


const sql = neon(process.env.NEXT_PUBLIC_NEON_DATABASE_URL);

export const db = drizzle(sql, { schema: jsonForms });

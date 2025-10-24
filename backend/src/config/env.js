import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory (two levels up from config/)
const envPath = path.join(__dirname, "../../.env");
console.log("Loading .env from:", envPath);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log("✅ Environment variables loaded successfully");
  console.log("RESEND_API_KEY loaded:", !!process.env.RESEND_API_KEY);
  console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);
  console.log("NODE_ENV:", process.env.NODE_ENV);
}

export default result;

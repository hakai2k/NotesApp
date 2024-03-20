import { cleanEnv, port, str } from "envalid";
import "dotenv/config";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_CONNECTION_STRING: str(),
  SESSION_SECRET: str(),
});

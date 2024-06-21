import { createResponse } from "../response";

export default defineEventHandler(async () => {
  return createResponse(true, "Hello World");
});

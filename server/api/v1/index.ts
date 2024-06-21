import { createResponse } from "~/server/response";

export default defineEventHandler(() => {
  return createResponse(true, "Api Version 1");
});

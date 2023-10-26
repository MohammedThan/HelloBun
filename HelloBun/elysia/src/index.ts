import { Elysia } from "elysia";
import { insertActivity, convertToNewSchema } from "./inserts";
import {
  getAllAccountRequests,
  getAllNewLicenses,
  getAllPermissions,
  getAllRequests,
  getAllActivities,
} from "./selects";
import { OldRequest, OldRequestStr } from "./types";

const app = new Elysia();

app.get("/", () => getAllRequests());
app.get("/1", () => getAllNewLicenses());
app.get("/2", () => getAllAccountRequests());
app.get("/6", () => getAllPermissions());
app.get("/7", () => getAllActivities());
app.get("/8", () => insertActivity());

app.post("/", ({ body, set }: any) => {
  try {
    console.log(body);

    let parsedData = JSON.parse(body).map((request: OldRequestStr) => {
      return { ...request, RequestData: JSON.parse(request.RequestData) };
    });
    convertToNewSchema(parsedData as OldRequest[]);
    return { success: true };
  } catch (e: Error | any) {
    console.log("[ERR @ index-Post / ]", e);
    set.status = 400;
    return { error: e.message };
  }
});

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

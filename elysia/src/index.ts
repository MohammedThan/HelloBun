import { Elysia } from "elysia";
import { insertActivity, convertToNewSchema } from "./inserts";
import {
  getAllAccountRequests,
  getAllNewLicenses,
  getAllPermissions,
  getAllRequests,
  getAllActivities,
  getAllAddActivities,
  getAllCompanyActives,
  getAllInspectionRequests,
  getAllStampLicenseLetters,
} from "./selects";
import { OldRequest, OldRequestStr } from "./types";
import { cors } from "@elysiajs/cors";
import moment from "moment";
//@ts-ignore
const app = new Elysia().use(cors());
app.get("/getAllRequests", ({ set }) => {
  try {
    const result = getAllRequests();
    set.status = 200;

    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllRequests  ]", error);
    return { message: "error " };
  }
});
app.get("/getAllNewLicenses", ({ set }) => {
  try {
    const result = getAllNewLicenses();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllNewLicenses]", error);
    return { message: "error " };
  }
});
app.get("/getAllAccountRequests", ({ set }) => {
  try {
    const result = getAllAccountRequests();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllAccountRequests]", error);
    return { message: "error " };
  }
});
app.get("/getAllPermissions", ({ set }) => {
  try {
    const result = getAllPermissions();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllPermissions]", error);
    return { message: "error " };
  }
});

app.get("/getAllActivities", ({ set }) => {
  try {
    const result = getAllActivities();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllActivities]", error);
    return { message: "error " };
  }
});
app.get("/getAllAddActivities", ({ set }) => {
  try {
    const result = getAllAddActivities();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllAddActivities]", error);
    return { message: "error " };
  }
});
app.get("/getAllCompanyActives", ({ set }) => {
  try {
    const result = getAllCompanyActives();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllCompanyActives]", error);
    return { message: "error " };
  }
});
app.get("/getAllInspectionRequests", ({ set }) => {
  try {
    const result = getAllInspectionRequests();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllInspectionRequests]", error);
    return { message: "error " };
  }
});
app.get("/getAllStampLicenseLetters", ({ set }) => {
  try {
    const result = getAllStampLicenseLetters();
    set.status = 200;
    return JSON.stringify(result);
  } catch (error) {
    set.status = 400;
    console.log("[ERR @ index-getAllStampLicenseLetters]", error);
    return { message: "error " };
  }
});

app.post("/uploadData", ({ body, set }: any) => {
  try {
    let start = moment(new Date());

    let parsedData = body.map((request: OldRequestStr) => {
      return { ...request, RequestData: JSON.parse(request.RequestData) };
    });

    let { type1, type2, type3, type4, type5 } = convertToNewSchema(
      parsedData as OldRequest[]
    );
    let end = moment();

    let duration = moment.duration(end.diff(start));
    let seconds = duration.asSeconds();

    return { type1, type2, type3, type4, type5, seconds };
  } catch (error: Error | any) {
    console.log("[ERR @ index-uploadData ]", error);
    set.status = 400;
    return { error: error.message };
  }
});

app.listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

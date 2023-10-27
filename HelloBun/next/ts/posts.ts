const apiUrl = "http://localhost:8000";
import { OldRequest } from "./types";
let headers = {
  Accept: "application/json, text/plain",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};
export async function postOldRequestToApi(payload: OldRequest[]) {
  return await fetch(`${apiUrl}/uploadData`, {
    // mode: "no-cors",
    method: "post",
    headers,
    body: JSON.stringify(payload),
  });
}

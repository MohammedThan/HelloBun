import { Database } from "bun:sqlite";

export function getAllNewLicenses() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM newLicenses");
  const res = query.all();
  db.close();
  return res;
}

export function getAllRequests() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM requests");
  const res = query.all();
  db.close();
  return res;
}

export function getAllAccountRequests() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM accountRequests");
  const res = query.all();
  db.close();
  return res;
}
export function getAllPermissions() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM permissions");
  const res = query.all();
  db.close();
  return res;
}

export function getAllActivities() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM activity");
  const res = query.all();
  db.close();
  return res;
}

export function getAllAddActivities() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM addActivities");
  const res = query.all();
  db.close();
  return res;
}

export function getAllCompanyActives() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM companyActives");
  const res = query.all();
  db.close();
  return res;
}

export function getAllInspectionRequests() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM inspectionRequests");
  const res = query.all();
  db.close();
  return res;
}

export function getAllStampLicenseLetters() {
  const db = new Database("Requests.sqlite", { create: true });
  const query = db.query("SELECT * FROM stampLicenseLetters");
  const res = query.all();
  db.close();
  return res;
}

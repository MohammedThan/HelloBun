import { Database } from "bun:sqlite";

export const db = new Database("Requests.sqlite", { create: true });

function init() {
  const createRequests = db.query(`CREATE TABLE IF NOT EXISTS requests (
        id INTEGER PRIMARY KEY ,
        type INTEGER CHECK( type <= 5 AND type >= 1),
        status INTEGER CHECK( status <= 3 AND status >= 1),
        typeId INTEGER
    );
    `);

  const createNewLicenses = db.query(`CREATE TABLE IF NOT EXISTS newLicenses (
        id  INTEGER PRIMARY KEY ,
        companyName Text,
        licenceType Text,
        isOffice INTEGER,
        officeName Text,
        officeServiceNumber Text,
        requestDate DATE,
        activities TEXT,
        requestId INTEGER UNIQUE
    );`);

  const createAccountRequests =
    db.query(`CREATE TABLE IF NOT EXISTS accountRequests (
    id  INTEGER PRIMARY KEY ,
    companyName Text,
    requesterName Text,
    applicantName Text,
    userName Text,
    contactEmail Text,
    permissionsId INTEGER UNIQUE,
    requestId INTEGER UNIQUE
);`);

  const createPermissions = db.query(`CREATE TABLE IF NOT EXISTS permissions (
    id INTEGER PRIMARY KEY ,
    canView INTEGER DEFAULT 0,
    canUpdate INTEGER DEFAULT 0,
    canDelete INTEGER DEFAULT 0,
    canAdd INTEGER DEFAULT 0,
    accountId INTEGER UNIQUE
  );`);

  const createInspectionRequests =
    db.query(`CREATE TABLE IF NOT EXISTS inspectionRequests (
  id  INTEGER PRIMARY KEY ,
  inspectionDate Text,
  inspectionType Text,
  requestId INTEGER UNIQUE
);`);

  const createAddActivities =
    db.query(`CREATE TABLE IF NOT EXISTS addActivities (
    id  INTEGER PRIMARY KEY ,
    companyName Text,
    licenceId Text,
    requestId INTEGER UNIQUE
);`);

  const createActivity = db.query(`CREATE TABLE IF NOT EXISTS activity (
    id  INTEGER PRIMARY KEY ,
    name TEXT
);`);

  const createCompanyActives =
    db.query(`CREATE TABLE IF NOT EXISTS companyActives (
    id  INTEGER PRIMARY KEY ,
    addActivityId INTEGER ,
    activityId INTEGER
);`);

  const createStampLicenseLetters =
    db.query(`CREATE TABLE IF NOT EXISTS stampLicenseLetters (
  id  INTEGER PRIMARY KEY ,
  companyName Text,
  licenceId Text,
  requestDate Text,
  requestId INTEGER UNIQUE
);`);

  createRequests.run();
  createNewLicenses.run();
  createAccountRequests.run();
  createPermissions.run();
  createInspectionRequests.run();
  createAddActivities.run();
  createActivity.run();
  createCompanyActives.run();
  createStampLicenseLetters.run();
}

init();

// db.close(); no need to close BUN handel this

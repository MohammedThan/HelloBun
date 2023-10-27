import { OldRequest, activity, newLicenses } from "./types";
import { Database } from "bun:sqlite";
import * as bun from "bun";
import { preventNaN } from "./utils";

export function convertToNewSchema(oldData: OldRequest[]) {
  const db = new Database("Requests.sqlite", { create: true });

  try {
    let { type1Data, type2Data, type3Data, type4Data, type5Data } =
      typeFilter(oldData);
    insertType1(type1Data, db);
    insertType2(type2Data, db);
    insertType3(type3Data, db);
    insertType4(type4Data, db);
    insertType5(type5Data, db);

    return {
      type1: type1Data.length,
      type2: type2Data.length,
      type3: type3Data.length,
      type4: type4Data.length,
      type5: type5Data.length,
    };
  } catch (error: Error | any) {
    throw new Error(error.message);
  } finally {
    db.close();
  }
}

function insertType1(oldTypeData: OldRequest[], db: any) {
  // const db = new Database("Requests.sqlite", { create: true });

  try {
    const insert = db.prepare(
      "INSERT INTO newLicenses  (id,companyName,licenceType,isOffice,officeName,officeServiceNumber,requestDate,activities,requestId ) VALUES (?,?,?,?,?,?,?,?,?)"
    );
    const requestInsert = db.prepare(
      "INSERT INTO requests  (id,type,status,typeId ) VALUES (?,?,?,?)"
    );
    const lastestId = db
      .query("SELECT MAX(id) FROM newLicenses")
      .get() as object;

    //@ts-ignore
    let id = lastestId["MAX(id)"] ? lastestId["MAX(id)"] + 1 : 1;

    const inserting = db.transaction((oldRequests: OldRequest[]) => {
      for (const oldRequest of oldRequests) {
        const requestId = oldRequest.RequestID;
        id += 1;
        insert.run(
          preventNaN(id),
          oldRequest?.RequestData?.CompanyName,
          preventNaN(oldRequest?.RequestData?.LicenceType),
          oldRequest?.RequestData?.IsOffice,
          oldRequest?.RequestData?.OfficeName,
          oldRequest?.RequestData?.OfficeServiceNumber,
          oldRequest?.RequestData?.RequestDate,
          oldRequest?.RequestData?.Activities,
          preventNaN(requestId)
        );
        requestInsert.run(
          preventNaN(requestId),
          oldRequest?.RequestType,
          oldRequest?.RequestStatus,
          preventNaN(id)
        );
      }
      return oldRequests.length;
    });

    const count = inserting(oldTypeData);

    console.log(`Inserted ${count} `);
    return count;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

function insertType2(oldTypeData: OldRequest[], db: any) {
  // const db = new Database("Requests.sqlite", { create: true });

  try {
    const insert = db.prepare(
      "INSERT INTO accountRequests  (id,companyName,requesterName,applicantName,username,contactEmail,permissionsId,requestId ) VALUES (?,?,?,?,?,?,?,?)"
    );
    const requestInsert = db.prepare(
      "INSERT INTO requests  (id,type,status,typeId ) VALUES (?,?,?,?)"
    );
    const lastestId = db
      .query("SELECT MAX(id) FROM accountRequests")
      .get() as object;

    //@ts-ignore
    let id = lastestId["MAX(id)"] ? lastestId["MAX(id)"] : 0;

    const permissionsInsert = db.prepare(
      "INSERT INTO permissions  (id,canView,canUpdate,canDelete,canAdd,accountId ) VALUES (?,?,?,?,?,?)"
    );
    const lastestPermission = db
      .query("SELECT MAX(id) FROM permissions")
      .get() as object;
    //@ts-ignore
    let permissionId = lastestPermission["MAX(id)"]
      ? //@ts-ignore
        lastestPermission["MAX(id)"]
      : 0;

    const inserting = db.transaction((oldRequests: OldRequest[]) => {
      for (const oldRequest of oldRequests) {
        const requestId = oldRequest.RequestID;
        id += 1;
        permissionId += 1;

        permissionsInsert.run(
          permissionId,
          oldRequest?.RequestData?.Permissions.includes("view"),
          oldRequest?.RequestData?.Permissions.includes("update"),
          oldRequest?.RequestData?.Permissions.includes("delete"),
          oldRequest?.RequestData?.Permissions.includes("add"),
          id
        );

        insert.run(
          preventNaN(id),
          oldRequest?.RequestData?.CompanyName,
          oldRequest?.RequestData?.RequesterName,
          oldRequest?.RequestData?.ApplicantName,
          oldRequest?.RequestData?.UserName,
          oldRequest?.RequestData?.ContactEmail,
          preventNaN(permissionId),
          preventNaN(requestId)
        );

        requestInsert.run(
          preventNaN(requestId),
          oldRequest?.RequestType,
          oldRequest?.RequestStatus,
          preventNaN(id)
        );
      }
      return oldRequests.length;
    });

    const count = inserting(oldTypeData);

    console.log(`Inserted ${count} `);
    return count;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

function insertType3(oldTypeData: OldRequest[], db: any) {
  // const db = new Database("Requests.sqlite", { create: true });

  try {
    const insert = db.prepare(
      "INSERT INTO inspectionRequests  (id,inspectionDate,inspectionType,requestId ) VALUES (?,?,?,?)"
    );
    const requestInsert = db.prepare(
      "INSERT INTO requests  (id,type,status,typeId ) VALUES (?,?,?,?)"
    );
    const lastestId = db
      .query("SELECT MAX(id) FROM inspectionRequests")
      .get() as object;

    //@ts-ignore
    let id = lastestId["MAX(id)"] ? lastestId["MAX(id)"] : 0;

    const inserting = db.transaction((oldRequests: OldRequest[]) => {
      for (const oldRequest of oldRequests) {
        const requestId = oldRequest.RequestID;
        id += 1;

        insert.run(
          preventNaN(id),
          oldRequest?.RequestData?.InspectionDate +
            " " +
            oldRequest?.RequestData?.InspectionTime,
          oldRequest?.RequestData?.InspectionType,
          preventNaN(requestId)
        );

        requestInsert.run(
          preventNaN(requestId),
          oldRequest?.RequestType,
          oldRequest?.RequestStatus,
          preventNaN(id)
        );
      }
      return oldRequests.length;
    });

    const count = inserting(oldTypeData);

    console.log(`Inserted ${count} `);
    return count;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

function insertType4(oldTypeData: OldRequest[], db: any) {
  // const db = new Database("Requests.sqlite", { create: true });

  try {
    const insert = db.prepare(
      "INSERT INTO addActivities  (id,companyName,licenceId,requestId ) VALUES (?,?,?,?)"
    );

    const requestInsert = db.prepare(
      "INSERT INTO requests  (id,type,status,typeId ) VALUES (?,?,?,?)"
    );
    const companyActivesInsert = db.prepare(
      ` INSERT INTO companyActives (id,addActivityId,activityId) VALUES (?,?,?)`
    );
    const lastestId = db
      .query("SELECT MAX(id) FROM inspectionRequests")
      .get() as object;

    //@ts-ignore
    let id = lastestId["MAX(id)"] ? lastestId["MAX(id)"] : 0;

    const lastestCompanyActivityId = db
      .query("SELECT MAX(id) FROM companyActives")
      .get() as object;

    //@ts-ignore
    let companyActivityId = lastestCompanyActivityId["MAX(id)"]
      ? //@ts-ignore
        lastestCompanyActivityId["MAX(id)"]
      : 0;

    let activityIds: activity[] = db
      .query("SELECT * FROM activity")
      .all() as activity[];

    if (!activityIds.length) {
      insertActivity();
      activityIds = db.query("SELECT * FROM activity").all() as activity[];
    }

    const inserting = db.transaction((oldRequests: OldRequest[]) => {
      for (const oldRequest of oldRequests) {
        const requestId = oldRequest.RequestID;
        id += 1;
        insert.run(
          preventNaN(id),
          oldRequest?.RequestData?.CompanyName,
          oldRequest?.RequestData?.LicenceID,
          preventNaN(requestId)
        );

        oldRequest.RequestData.Activities.map((activityName: string) => {
          companyActivityId += 1;
          companyActivesInsert.run(
            companyActivityId,
            preventNaN(id),
            activityIds.find((activity) => activity.name === activityName)?.id
          );
        });

        requestInsert.run(
          preventNaN(requestId),
          oldRequest.RequestType,
          oldRequest.RequestStatus,
          preventNaN(id)
        );
      }
      return oldRequests.length;
    });

    const count = inserting(oldTypeData);

    console.log(`Inserted ${count} `);
    return count;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

function insertType5(oldTypeData: OldRequest[], db: any) {
  try {
    const insert = db.prepare(
      "INSERT INTO stampLicenseLetters  (id,companyName,licenceId,requestDate,requestId ) VALUES (?,?,?,?,?)"
    );
    const requestInsert = db.prepare(
      "INSERT INTO requests  (id,type,status,typeId ) VALUES (?,?,?,?)"
    );
    const lastestId = db
      .query("SELECT MAX(id) FROM stampLicenseLetters")
      .get() as object;

    //@ts-ignore
    let id = lastestId["MAX(id)"] ? lastestId["MAX(id)"] : 0;

    const inserting = db.transaction((oldRequests: OldRequest[]) => {
      for (const oldRequest of oldRequests) {
        const requestId = oldRequest.RequestID;
        id += 1;

        insert.run(
          preventNaN(id),
          oldRequest?.RequestData?.CompanyName,
          oldRequest?.RequestData?.LicenceID,
          oldRequest?.RequestData?.RequestDate,
          preventNaN(requestId)
        );

        requestInsert.run(
          preventNaN(requestId),
          oldRequest?.RequestType,
          oldRequest?.RequestStatus,
          preventNaN(id)
        );
      }
      return oldRequests.length;
    });

    const count = inserting(oldTypeData);

    console.log(`Inserted ${count} `);
    return count;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
}

export function insertActivity() {
  const db = new Database("Requests.sqlite", { create: true });
  const activityIds: { [key: string]: number } = {
    laundry: 1,
    retail: 2,
    "real estate": 3,
    outlet: 4,
    store: 5,
  };
  try {
    const insert = db.prepare(`INSERT INTO activity  (id,name) VALUES (?,?)`);

    Object.keys(activityIds).map((activityName: string) => {
      insert.run(activityIds[activityName], activityName);
    });

    return { message: "Inserted" };
  } catch (error: Error | any) {
    throw new Error(error.message);
  } finally {
    db.close();
  }
}

function typeFilter(oldData: OldRequest[]) {
  let type1Data: OldRequest[] = [];
  let type2Data: OldRequest[] = [];
  let type3Data: OldRequest[] = [];
  let type4Data: OldRequest[] = [];
  let type5Data: OldRequest[] = [];

  oldData.forEach((item) => {
    if (item.RequestType === 1) {
      type1Data.push(item);
    }
    if (item.RequestType === 2) {
      type2Data.push(item);
    }
    if (item.RequestType === 3) {
      type3Data.push(item);
    }
    if (item.RequestType === 4) {
      type4Data.push(item);
    }
    if (item.RequestType === 5) {
      type5Data.push(item);
    }
  });

  return { type1Data, type2Data, type3Data, type4Data, type5Data };
}

import { GridColDef } from "@mui/x-data-grid";

export const requestsCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "type", headerName: "type", flex: 1 },
  { field: "status", headerName: "status", flex: 1 },
  { field: "typeId", headerName: "typeId", flex: 1 },
];
export const newLicencsesCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyName", headerName: "companyName", flex: 1 },
  { field: "licenceType", headerName: "licenceType", flex: 1 },
  { field: "isOffice", headerName: "isOffice", flex: 1 },
  { field: "officeName", headerName: "officeName", flex: 1 },
  { field: "officeServiceNumber", headerName: "officeServiceNumber", flex: 1 },
  { field: "requestDate", headerName: "requestDate", flex: 1 },
  { field: "activities", headerName: "activities", flex: 1 },
  { field: "requestId", headerName: "requestId", flex: 1 },
];

export const accountRequestsCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyName", headerName: "companyName", flex: 1 },
  { field: "requesterName", headerName: "requesterName", flex: 1 },
  { field: "applicantName", headerName: "applicantName", flex: 1 },
  { field: "userName", headerName: "userName", flex: 1 },
  { field: "contactEmail", headerName: "contactEmail", flex: 1 },
  { field: "permissionsId", headerName: "permissionsId", flex: 1 },
  { field: "requestId", headerName: "requestId", flex: 1 },
];

export const activityCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "name", flex: 1 },
];

export const addActivityCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyName", headerName: "companyName", flex: 1 },
  { field: "licenceId", headerName: "licenceId", flex: 1 },
  { field: "requestId", headerName: "requestId", flex: 1 },
];

export const companyActivesols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "addActivityId", headerName: "addActivityId", flex: 1 },
  { field: "activityId", headerName: "activityId", flex: 1 },
];

export const inspectionRequestsCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "inspectionDate", headerName: "inspectionDate", flex: 1 },
  { field: "inspectionType", headerName: "inspectionType", flex: 1 },
  { field: "requestId", headerName: "requestId", flex: 1 },
];

export const permissionsCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "canView", headerName: "canView", flex: 1 },
  { field: "canUpdate", headerName: "canUpdate", flex: 1 },
  { field: "canDelete", headerName: "canDelete", flex: 1 },
  { field: "canAdd", headerName: "canAdd", flex: 1 },
  { field: "accountId", headerName: "accountId", flex: 1 },
];
export const stampLicenseLettersCols: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyName", headerName: "companyName", flex: 1 },
  { field: "licenceId", headerName: "licenceId", flex: 1 },
  { field: "requestDate", headerName: "requestDate", flex: 1 },
  { field: "requestId", headerName: "requestId", flex: 1 },
];

export type accountRequests = {
  id: number;
  companyName: string;
  requesterName: string;
  applicantName: string;
  userName: string;
  contactEmail: string;
  permissionsID: number;
  requestId: number;
};

export type activity = {
  id: 1 | 2 | 3 | 4 | 5;
  name: "string" | "retail" | "real estate" | "outlet" | "store";
};

export type addActivities = {
  id: number;
  companyName: string;
  licenceID: string;
  activities: string;
  requestId: number;
};

export type companyActives = {
  id: number;
  addActivityId: string;
  activityId: string;
};

export type inspectionRequests = {
  id: number;
  inspectionDate: string;
  inspectionType: string;
  requestId: number;
};

export type newLicenses = {
  id: number;
  companyName: string;
  licenceType: string;
  isOffice: number;
  officeName: string;
  officeServiceNumber: string;
  requestDate: string;
  activities: string;
  requestId: number;
};

export type permissions = {
  id: number;
  canView: number;
  canUpdate: number;
  canDelete: number;
  canAdd: number;
  accountId: number;
};

export type request = {
  id: number;
  type: number;
  status: number;
  typeId: number;
};

export type stampLicenseLetters = {
  id: number;
  companyName: string;
  licenceId: string;
  requestDate: string;
  requestId: number;
};

export type OldRequestStr = {
  RequestID: number;
  RequestType: number;
  RequestStatus: number;
  RequestData: string;
};

export type OldRequest = {
  RequestID: number;
  RequestType: number;
  RequestStatus: number;
  RequestData: any;
};

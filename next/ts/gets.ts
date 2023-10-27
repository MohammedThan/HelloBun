export const getAllRequests = async () =>
  GET({
    url: "http://localhost:8000/getAllRequests",
  });

export const getAllNewLicenses = async () =>
  GET({
    url: "http://localhost:8000/getAllNewLicenses",
  });
export const getAllAccountRequests = async () =>
  GET({
    url: "http://localhost:8000/getAllAccountRequests",
  });
export const getAllPermissions = async () =>
  GET({
    url: "http://localhost:8000/getAllPermissions",
  });
export const getAllActivities = async () =>
  GET({
    url: "http://localhost:8000/getAllActivities",
  });
export const getAllAddActivities = async () =>
  GET({
    url: "http://localhost:8000/getAllAddActivities",
  });
export const getAllCompanyActives = async () =>
  GET({
    url: "http://localhost:8000/getAllCompanyActives",
  });
export const getAllInspectionRequests = async () =>
  GET({
    url: "http://localhost:8000/getAllInspectionRequests",
  });
export const getAllStampLicenseLetters = async () =>
  GET({
    url: "http://localhost:8000/getAllStampLicenseLetters",
  });
async function GET({ url }: { url: string }) {
  try {
    let headers = {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json",
    };

    const res = await fetch(url);
    if (res.status >= 200 && res.status < 300) {
      const result = await res.json();
      return result;
    } else {
      throw new Error("somehting went wrong");
    }
  } catch (error: Error | any) {
    console.log(error);
    throw new Error(error.message);
  }
}

"use client";

import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import {
  getAllRequests,
  getAllNewLicenses,
  getAllAccountRequests,
  getAllActivities,
  getAllAddActivities,
  getAllCompanyActives,
  getAllInspectionRequests,
  getAllPermissions,
  getAllStampLicenseLetters,
} from "../../ts/gets";
import {
  accountRequestsCols,
  activityCols,
  addActivityCols,
  companyActivesols,
  inspectionRequestsCols,
  newLicencsesCols,
  permissionsCols,
  requestsCols,
  stampLicenseLettersCols,
} from "./columns";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function DataGridDemo() {
  const [page, setPage] = useState("Requests");
  const [rows, setRows] = useState<Object[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setPage(newValue);
  };

  async function fetchData() {
    setIsLoading(true);
    let result = [];
    if (page === "New License") {
      setColumns(newLicencsesCols);
      result = await getAllNewLicenses();
    } else if (page === "Account Request") {
      setColumns(accountRequestsCols);
      result = await getAllAccountRequests();
    } else if (page === "Inspection Request") {
      setColumns(inspectionRequestsCols);
      result = await getAllInspectionRequests();
    } else if (page === "Add New Activity") {
      setColumns(addActivityCols);
      result = await getAllAddActivities();
    } else if (page === "Stamp License Letter") {
      setColumns(stampLicenseLettersCols);
      result = await getAllStampLicenseLetters();
    } else if (page === "Stamp License Letter") {
      setColumns(stampLicenseLettersCols);
      result = await getAllStampLicenseLetters();
    } else if (page === "Company Actives") {
      setColumns(companyActivesols);
      result = await getAllCompanyActives();
    } else if (page === "Activity") {
      setColumns(activityCols);
      result = await getAllActivities();
    } else if (page === "Permissions") {
      setColumns(permissionsCols);
      result = await getAllPermissions();
    } else {
      setColumns(requestsCols);
      result = await getAllRequests();
    }

    setRows(result);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 p-10">
      <Tabs
        value={page}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(event: React.SyntheticEvent, newValue: string) =>
          handleTabChange(event, newValue)
        }
        variant="fullWidth"
      >
        <Tab value="Requests" label="Requests" />
        <Tab value="New License" label="New License" />
        <Tab value="Account Request" label="Account Request" />
        <Tab value="Inspection Request" label="Inspection Request" />
        <Tab value="Add New Activity" label="Add New Activity" />
        <Tab value="Stamp License Letter" label="Stamp License Letter" />
        <Tab value="Permissions" label="Permissions" />
        <Tab value="Activity" label="Activity" />
        <Tab value="Company Actives" label="Company Actives" />
      </Tabs>
      <div className="w-full h-full  bg-white flex rounded-xl p-4">
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              boxShadow: 0,
              border: 0,
              backgroundColor: "white",
              "& .MuiDataGrid-cell:hover": {
                color: "secondary.main",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e0e0e0",
                // add more css for customization
              },
            }}
            disableRowSelectionOnClick
            autoHeight={true}
          />
        )}
      </div>
    </div>
  );
}

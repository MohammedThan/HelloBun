"use client";
import { postOldRequestToApi } from "../../ts/posts";
import * as XLSX from "xlsx";
import { OldRequest } from "../../ts/types";
import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { Alert, AlertColor } from "@mui/material";
import { AlertTitle } from "@mui/material";
/* list of supported file types */
const SheetJSFT = ["xlsx", "xls", "csv"].map((x) => `.${x}`).join(",");

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/

function DataInput({ handleFile }: any) {
  const handleChange = (e: any) => {
    const files = e.target.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <input
      type="file"
      className="opacity-0"
      id="file"
      accept={SheetJSFT}
      onChange={handleChange}
    />
  );
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/

function DragDropFile({
  handleFile,
  children,
}: {
  handleFile: any;
  children: React.ReactNode;
}) {
  const suppress = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleDrop = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <div
      className="flex-1"
      onDrop={handleDrop}
      onDragEnter={suppress}
      onDragOver={suppress}
    >
      {children}
    </div>
  );
}

export default function UploadPurchaseMenuScreen() {
  const [showAlert, setShowAlert] = useState<{
    show: boolean;
    title: string;
    message: string;
    variant: AlertColor;
  }>({
    show: false,
    title: "",
    message: "",
    variant: "success",
  });

  return (
    <div className="w-full h-full ">
      {showAlert.show && (
        <Dialog
          open={true}
          onClose={() => setShowAlert({ ...showAlert, show: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Alert severity={showAlert.variant}>
            <AlertTitle>{showAlert.title}</AlertTitle>
            <div dangerouslySetInnerHTML={{ __html: showAlert.message }} />
          </Alert>
        </Dialog>
      )}

      <PageContent showAlert={showAlert} setShowAlert={setShowAlert} />
    </div>
  );
}

const PageContent = ({
  showAlert,
  setShowAlert,
}: {
  showAlert: {
    show: boolean;
    title: string;
    message: string;
    variant: AlertColor;
  };
  setShowAlert: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      title: string;
      message: string;
      variant: AlertColor;
    }>
  >;
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState<OldRequest[] | [] | null>([]);

  const transformToItems = (data: any) => {
    let rows: OldRequest[] = [];
    let stop = false;

    data.forEach((row: any, index: number) => {
      if (stop) return;

      if (index === 0) {
        /* Check if schema is correct */
        if (
          row[0] !== "RequestID" ||
          row[1] !== "RequestType" ||
          row[2] !== "RequestStatus" ||
          row[3] !== "RequestData"
        ) {
          setShowAlert({
            show: true,
            title: "INVALID FILE",
            message: "Please upload a valid file",
            variant: "error",
          });
          stop = true;
        }
      } else {
        rows.push({
          RequestID: row[0],
          RequestType: row[1],
          RequestStatus: row[2],
          RequestData: row[3],
        });
      }
    });
    return rows;
  };

  const handleFile = (file: any) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, {
        type: "array",
        cellDates: true,
        dateNF: "mm/dd/yyyy",
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils
        .sheet_to_json(ws, { header: 1 })
        .filter((row: any) => row.length);
      /* Update state */
      const rows = transformToItems(data);
      setData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  const onUploadFile = async () => {
    setLoading(true);
    try {
      const res = await postOldRequestToApi(data as OldRequest[]);
      if (res.status >= 200 && res.status < 300) {
        const result = await res.json();
        setData(null);
        setFile(null);
        setShowAlert({
          show: true,
          message: `ADDED SUCCESSFULLY <br/>
          insert ${result.type1} rows in newLicenses  <br/>
          insert ${result.type2} rows in accountRequests  <br/>
          insert ${result.type3} rows in inspectionRequests  <br/>
          insert ${result.type4} rows in addActivities  <br/>
          insert ${result.type5} rows in stampLicenseLetters  <br/>
          in total ${result.seconds} seconds
          `,
          variant: "success",
          title: "SUCCESS",
        });

        return result;
      } else {
        throw new Error("somehting went wrong");
      }
    } catch (error) {
      console.log("ERR @ onUploadFile in PageContent of ", error);
      setShowAlert({
        show: true,
        //@ts-ignore
        message: (error.message +
          "most probably duplicate data entered or null keys, please make sure all the data you want insert have a unique key") as string,
        variant: "error",
        title: "ERROR",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-screen items-center justify-center flex flex-col bg-white  ">
      <span>Upload your excel file</span>
      <span className="text-red-400">Note: duplicated data are rejected</span>

      <div className="max-w-2xl rounded-lg shadow-xl  items-center justify-center w-[50%] ">
        <div style={{ height: 20 }} />
        <DragDropFile handleFile={handleFile}>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300 pt-20">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 h-40 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <Typography className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  {"Attach file or drag"}
                </Typography>

                {file ? (
                  <Typography className="text-base font-bold" variant="h5">
                    {
                      //@ts-ignore
                      file.name as string
                    }
                  </Typography>
                ) : null}
              </div>
              <DataInput handleFile={handleFile} />
            </label>
          </div>
        </DragDropFile>
        <div style={{ height: 20 }} />
        <div className="flex justify-center ">
          <Button
            //@ts-ignore
            onClick={() => document.getElementById("file").click()}
            className="whitespace-no-wrap normal-case"
            variant="contained"
            color="primary"
          >
            <span>{"Upload File"}</span>
          </Button>
        </div>
        <div style={{ height: 20 }} />

        {data && data.length ? (
          <div className="flex-col">
            {/* <div style={{ height: 20 }} /> */}
            <div className="bg-gray-200 w-full h-1 " />

            <div className="flex justify-center ">
              <Typography color="textSecondary">{`${
                data.length
              }${" rows found"} 
              `}</Typography>
            </div>

            {/* <div style={{ height: 20 }} /> */}

            <div className="flex justify-center p-2">
              <Button
                onClick={onUploadFile}
                disabled={loading}
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
              >
                {loading ? (
                  <CircularProgress size="2rem" style={{ color: "#fff" }} />
                ) : (
                  <span>{"Submit file"}</span>
                )}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      {/* <div className="w-[50% h-10 bg-blue-500"></div> */}
    </div>
  );
};

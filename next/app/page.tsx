import Image from "next/image";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="flex flex-col items-center justify-center  transition-colors hover:border-gray-300 hover:bg-gray-300 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <span className="md:text-6xl text-2xl  font-bold text-gray-800">
          Welcome to Hello Bun
        </span>
        <span className="md:text-2xl text-md font-bold text-gray-800">
          By Mohammed Al-Thunayan
        </span>
      </div>
      <div className="flex flex-row w-full  items-center justify-around">
        <a href="/uploadExcel">
          <Button variant="outlined" size="large" color="secondary">
            Upload the excel file
          </Button>
        </a>
        <div className="w-4" />
        <a href="/readDatabase">
          <Button variant="outlined" size="large" color="secondary">
            see the database
          </Button>
        </a>
      </div>
    </main>
  );
}

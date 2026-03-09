import AnalystSidebar from "../components/AnalystSidebar";
import { Outlet } from "react-router-dom";

export default function AnalystLayout() {

  return (

    <div className="flex">

      <AnalystSidebar />

      <div className="flex-1 p-6">

        <Outlet />

      </div>

    </div>

  );

}

import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 ml-0 lg:ml-64">
        <AppHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

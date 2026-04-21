import TopBar from "./TopBar";
import Taskbar from "./Taskbar";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col relative w-full overflow-x-clip">
    <TopBar />
    <main className="p-6 pb-24">{children}</main>
    <Taskbar />
  </div>
);

export default AppLayout;

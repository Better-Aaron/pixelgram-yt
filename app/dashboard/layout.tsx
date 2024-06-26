import { SideNav } from '@/components/side-nav';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-20 flex-none md:border-r lg:w-64">
        <SideNav />
      </div>
      <div className="mx-auto w-full mt-12  max-w-7xl flex-1 flex-grow sm:p-6 md:mt-0 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Header } from '@/components/header';

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HomePageLayout;

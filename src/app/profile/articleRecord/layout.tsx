const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-auto h-full overflow-y-scroll pr-[17px] w-full overflow-x-hidden">
      {children}
    </div>
  );
};

export default Layout;

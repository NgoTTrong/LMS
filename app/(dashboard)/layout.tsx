type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default DashboardLayout;

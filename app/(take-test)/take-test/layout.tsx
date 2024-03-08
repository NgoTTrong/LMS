import HeaderBar from "../_components/header-bar";

type Props = {
	children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
	return (
		<main className="w-full h-full min-h-screen flex flex-col justify-center">
			<HeaderBar />
			{children}
		</main>
	);
};

export default DashboardLayout;

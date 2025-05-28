import React from "react";

let isHydrating = true;
export default function ClientComponent({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isHydrated, setIsHydrated] = React.useState(!isHydrating);

	React.useEffect(() => {
		isHydrating = false;
		setIsHydrated(true);
	}, []);

	if (!isHydrated) return <></>;

	return children;
}

import React from "react";

const FallbackUI: React.FC = () => {
	const handleClick = () => {
		document.location.reload();
	};
	return (
		<div>
			<h1 className="underline">An error has occcurred</h1>
			<button onClick={handleClick}>Click to refresh</button>
		</div>
	);
};

export default FallbackUI;

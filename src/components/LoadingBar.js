export default function LoadingBar({ percentage, label = "Loading..." }) {
	return (
		<div style={{ width: "40%" }}>
			<div className="round" style={{ backgroundColor: "#131313", color: "white", width: "100%", height: "10px" }}>
				<div className="red round" style={{ color: "white", width: percentage + "%", height: "10px", position: "relative", top: "-10px", left: "-10px" }} />
			</div>
			<p>{label}</p>
		</div>
	);
}

export default function ApaFigureHeader({ label, title }) {
	return <div className="apa noIndent">
		<b>{label}</b>
		<br />
		<i>{title}</i>
		<br />
		<br />
	</div>
}
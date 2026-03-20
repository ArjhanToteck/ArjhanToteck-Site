
import ApaReference from "@/src/components/ApaReference";

export default function ApaReferencesList({ referenceMap }) {
	return <section className="apa">
		<h2>References</h2>

		{
			Object.keys(referenceMap.referenceMap)
				// make sure its sorted
				.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
				.map(key =>

					<span id={key} key={key}>
						<ApaReference bibtex={referenceMap.referenceMap[key]} />
					</span>
				)
		}
	</section>
}
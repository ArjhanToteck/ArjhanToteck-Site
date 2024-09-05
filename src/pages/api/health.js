export default function health(req, res) {
	res.status(200).json({ message: "API is healthy.", code: 200 });
}
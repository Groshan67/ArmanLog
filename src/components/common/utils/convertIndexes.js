export default function convertIndexes(indexes) {
	const newIndexes = [];
	for (const index in indexes) newIndexes.push(parseInt(index));
	return newIndexes;
}
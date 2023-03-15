export default function hasSomeParentTheClasses(element, classes) {
	let isFound = false;
	classes.forEach((classname) => {
		if (hasSomeParentTheClass(element, classname)) isFound = true;
	});
	return isFound;
}

export function hasSomeParentTheClass(element, classname) {
	if (
		element.className &&
		typeof element.className === "string" &&
		element.className.split(" ").indexOf(classname) >= 0
	)
		return true;
	return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}
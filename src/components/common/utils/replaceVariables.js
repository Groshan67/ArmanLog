export default function (value, variables) {
	variables.forEach((variable, index) => {
		if (value) value = value.replace(`{${index}}`, variable);
	});
	return value;
}
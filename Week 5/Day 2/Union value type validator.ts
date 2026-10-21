function validateUnionType(value: any, allowedTypes: string[]): boolean {
	const valueType = typeof value;

	for (const allowedType of allowedTypes) {
		if (valueType === allowedType) {
			return true;
		}
	}

	return false;
}

const userName = "Alice";
const userAge = 25;
const isStudent = true;

console.log(validateUnionType(userName, ["string", "number"]));
console.log(validateUnionType(userAge, ["string"]));
console.log(validateUnionType(isStudent, ["boolean", "number"]));

export function genRandomVector(types, elementCount) {
    const vector = [];
    const control = [];
    const numberOfTypes = types.length;
    let lastType = "";
    for (let i = 0; i < numberOfTypes; i++) {
        control.push({ type: types[i], added: 0 });
    }
    for (let i = 0; i < numberOfTypes * elementCount; i++) {
        let validType = false;
        let currentType = "";
        let currentTypeIndex = -1;
        const pendingTypes = control.filter(
            (item) => item.added < elementCount
        );
        if (pendingTypes.length === 1) {
            currentTypeIndex = 0;
            currentType = pendingTypes[currentTypeIndex].type;
            validType = true;
        }
        while (!validType) {
            currentTypeIndex = Math.floor(Math.random() * numberOfTypes);
            currentType = types[currentTypeIndex];
            if (control[currentTypeIndex].added === elementCount) {
                continue;
            }
            if (currentType === lastType) {
                continue;
            }
            validType = true;
        }
        vector.push({ id: i + 1, name: currentType });
        control[currentTypeIndex].added++;
        lastType = currentType;
    }
    // check lasts types
    let typeToCheck = "";
    const itemsToShuffle = [];
    for (let i = vector.length - 1; i > vector.length - 1 - elementCount; i--) {
        if (i == vector.length - 1) {
            typeToCheck = vector[i].name;
        } else if (vector[i].name !== typeToCheck) {
            break;
        } else if (vector[i].name === typeToCheck) {
            itemsToShuffle.push({ ...vector[i], originalIndex: i });
        }
    }
    if (itemsToShuffle.length > 0) {
        for (let i = 0; i < itemsToShuffle.length; i++) {
            const itemToShuffle = itemsToShuffle[i];
            const maxIndex =
                vector.length - 1 - (itemsToShuffle.length + 1) + i;
            let findedIndexToSwitch = false;
            while (!findedIndexToSwitch) {
                const randomIndex = Math.floor(Math.random() * maxIndex)
                if (vector[randomIndex].name === itemToShuffle.name) {
                    continue;
                }
                if (
                    vector[itemToShuffle.originalIndex - 1].name ===
                        vector[randomIndex].name ||
                    vector[itemToShuffle.originalIndex + 1].name ===
                        vector[randomIndex].name
                ) {
                    continue;
                }
                if (randomIndex === 0) {
                    if (vector[randomIndex + 1].name === itemToShuffle.name) {
                        continue;
                    }
                } else if (randomIndex === maxIndex) {
                    if (vector[randomIndex - 1].name === itemToShuffle.name) {
                        continue;
                    }
                } else {
                    if (
                        vector[randomIndex + 1].name === itemToShuffle.name ||
                        vector[randomIndex - 1].name === itemToShuffle.name
                    ) {
                        continue;
                    }
                }
                const findedType = vector[randomIndex].name;
                vector[randomIndex].name = itemToShuffle.name;
                vector[itemToShuffle.originalIndex].name = findedType;
                findedIndexToSwitch = true;
            }
        }
    }
    return vector;
}

function printObjetcsVector(vector, elementCount) {
    // const line = "---------------------";
    let string = "";
    vector.forEach((item, index) => {
        string += " | " + item.type;
        if ((index + 1) % elementCount === 0) {
            string += " | ";
            string = "";
        }
    });
}

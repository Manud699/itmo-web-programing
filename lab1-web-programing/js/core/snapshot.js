
export function deepFreeze(obj) {
    Object.values(obj).forEach(value =>{
        if(value && typeof value == 'object') deepFreeze(value);
    });
} 

export function takeSnapshot(state) {
    return deepFreeze(structuredClone(state));
} 
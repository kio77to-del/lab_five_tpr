export function createIdentityMatrix(size) {
    return Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 1))
    );
}

export function cloneMatrix(matrix) {
    return matrix.map((row) => [...row]);
}

export function formatNumber(value, digits = 4) {
    if (!Number.isFinite(value)) return "—";
    return Number(value).toFixed(digits);
}
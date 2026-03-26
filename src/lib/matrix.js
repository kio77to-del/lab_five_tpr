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

export function formatSaatyValue(value) {
    const map = [
        { num: 1 / 9, label: "1/9" },
        { num: 1 / 8, label: "1/8" },
        { num: 1 / 7, label: "1/7" },
        { num: 1 / 6, label: "1/6" },
        { num: 1 / 5, label: "1/5" },
        { num: 1 / 4, label: "1/4" },
        { num: 1 / 3, label: "1/3" },
        { num: 1 / 2, label: "1/2" },
        { num: 1, label: "1" },
        { num: 2, label: "2" },
        { num: 3, label: "3" },
        { num: 4, label: "4" },
        { num: 5, label: "5" },
        { num: 6, label: "6" },
        { num: 7, label: "7" },
        { num: 8, label: "8" },
        { num: 9, label: "9" },
    ];

    for (const item of map) {
        if (Math.abs(value - item.num) < 0.0001) {
            return item.label;
        }
    }

    return formatNumber(value, 4);
}
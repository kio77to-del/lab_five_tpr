import { cloneMatrix } from "./matrix";

export function createPairwiseMatrix(size) {
    return Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 1))
    );
}

export function updateMatrixValue(matrix, row, col, rawValue) {
    const newMatrix = cloneMatrix(matrix);

    let value = Number(rawValue);

    if (!Number.isFinite(value) || value <= 0) {
        value = 1;
    }

    newMatrix[row][col] = value;
    newMatrix[col][row] = 1 / value;
    newMatrix[row][row] = 1;
    newMatrix[col][col] = 1;

    return newMatrix;
}

export function calculateRowProducts(matrix) {
    return matrix.map((row) => row.reduce((acc, item) => acc * item, 1));
}

export function calculateGeometricMeans(products, size) {
    return products.map((product) => Math.pow(product, 1 / size));
}

export function normalizeVector(vector) {
    const sum = vector.reduce((acc, item) => acc + item, 0);

    if (sum === 0) {
        return vector.map(() => 0);
    }

    return vector.map((item) => item / sum);
}

export function calculatePriorityVector(matrix) {
    const products = calculateRowProducts(matrix);
    const geometricMeans = calculateGeometricMeans(products, matrix.length);
    const priorities = normalizeVector(geometricMeans);

    return {
        products,
        geometricMeans,
        priorities,
    };
}

export function multiplyMatrixByVector(matrix, vector) {
    return matrix.map((row) =>
        row.reduce((sum, value, index) => sum + value * vector[index], 0)
    );
}

export function calculateLambdaMax(matrix, priorityVector) {
    const weightedSum = multiplyMatrixByVector(matrix, priorityVector);

    const lambdaValues = weightedSum.map((value, index) => {
        if (priorityVector[index] === 0) return 0;
        return value / priorityVector[index];
    });

    const lambdaMax =
        lambdaValues.reduce((acc, item) => acc + item, 0) / lambdaValues.length;

    return {
        weightedSum,
        lambdaValues,
        lambdaMax,
    };
}

export function calculateConsistencyIndex(lambdaMax, size) {
    if (size <= 1) return 0;
    return (lambdaMax - size) / (size - 1);
}

export function calculateRandomIndex(size) {
    const riTable = {
        1: 0,
        2: 0,
        3: 0.58,
        4: 0.9,
        5: 1.12,
        6: 1.24,
        7: 1.32,
        8: 1.41,
        9: 1.45,
        10: 1.49,
    };

    return riTable[size] ?? 1.49;
}

export function calculateConsistencyRatio(matrix, priorityVector) {
    const size = matrix.length;
    const { weightedSum, lambdaValues, lambdaMax } = calculateLambdaMax(
        matrix,
        priorityVector
    );

    const ci = calculateConsistencyIndex(lambdaMax, size);
    const ri = calculateRandomIndex(size);
    const cr = ri === 0 ? 0 : ci / ri;

    return {
        weightedSum,
        lambdaValues,
        lambdaMax,
        ci,
        ri,
        cr,
        isConsistent: cr < 0.1,
    };
}

export function calculateMatrixData(matrix) {
    const priorityData = calculatePriorityVector(matrix);
    const consistencyData = calculateConsistencyRatio(
        matrix,
        priorityData.priorities
    );

    return {
        ...priorityData,
        ...consistencyData,
    };
}

export function calculateGlobalPriorities(criteriaWeights, localPrioritiesMap, alternatives) {
    const result = alternatives.map(() => 0);

    Object.keys(localPrioritiesMap).forEach((criterionName, criterionIndex) => {
        const localVector = localPrioritiesMap[criterionName];

        for (let i = 0; i < result.length; i++) {
            result[i] += (criteriaWeights[criterionIndex] || 0) * (localVector[i] || 0);
        }
    });

    return result;
}
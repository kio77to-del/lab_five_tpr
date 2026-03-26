"use client";

import { formatSaatyValue } from "../lib/matrix";

const saatyOptions = [
    { label: "1/9", value: 1 / 9 },
    { label: "1/8", value: 1 / 8 },
    { label: "1/7", value: 1 / 7 },
    { label: "1/6", value: 1 / 6 },
    { label: "1/5", value: 1 / 5 },
    { label: "1/4", value: 1 / 4 },
    { label: "1/3", value: 1 / 3 },
    { label: "1/2", value: 1 / 2 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
];

function getClosestSaatyValue(currentValue) {
    let closest = saatyOptions[0].value;
    let minDiff = Math.abs(currentValue - closest);

    for (const option of saatyOptions) {
        const diff = Math.abs(currentValue - option.value);
        if (diff < minDiff) {
            minDiff = diff;
            closest = option.value;
        }
    }

    return String(closest);
}

export default function PairwiseMatrix({
                                           title,
                                           items,
                                           matrix,
                                           onChangeMatrix,
                                       }) {
    const handleChange = (row, col, value) => {
        onChangeMatrix(row, col, Number(value));
    };

    if (!items.length || !matrix.length) {
        return <p>Нет данных для матрицы.</p>;
    }

    return (
        <div className="card">
            {title && <h3>{title}</h3>}

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        {items.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((rowName, i) => (
                        <tr key={i}>
                            <th>{rowName}</th>
                            {items.map((_, j) => {
                                if (i === j) {
                                    return <td key={j}>1</td>;
                                }

                                if (i < j) {
                                    return (
                                        <td key={j}>
                                            <select
                                                value={getClosestSaatyValue(matrix[i][j])}
                                                onChange={(e) => handleChange(i, j, e.target.value)}
                                            >
                                                {saatyOptions.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                }

                                return <td key={j}>{formatSaatyValue(matrix[i][j])}</td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <p className="hint">
                Заполняй только верхний треугольник матрицы по шкале Саати.
                Обратные значения рассчитываются автоматически.
            </p>
        </div>
    );
}
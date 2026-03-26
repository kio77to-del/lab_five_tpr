"use client";

import { formatNumber } from "../lib/matrix";

export default function PairwiseMatrix({ title, items, matrix, onChangeMatrix }) {
    const handleChange = (row, col, value) => {
        onChangeMatrix(row, col, value);
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
                                            <input
                                                type="number"
                                                min="0.1111"
                                                step="0.1111"
                                                value={formatNumber(matrix[i][j], 4)}
                                                onChange={(e) => handleChange(i, j, e.target.value)}
                                            />
                                        </td>
                                    );
                                }

                                return <td key={j}>{formatNumber(matrix[i][j], 4)}</td>;
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <p className="hint">
                Заполняй только верхний треугольник матрицы. Обратные значения считаются автоматически.
            </p>
        </div>
    );
}
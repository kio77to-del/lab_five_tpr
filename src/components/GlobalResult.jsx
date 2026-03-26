"use client";

import { formatNumber } from "@/lib/matrix";

export default function GlobalResult({ alternatives, globalPriorities }) {
    if (!alternatives.length || !globalPriorities.length) return null;

    const maxValue = Math.max(...globalPriorities);
    const bestIndex = globalPriorities.findIndex((item) => item === maxValue);

    return (
        <div className="card">
            <h3>Итоговые глобальные приоритеты</h3>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Альтернатива</th>
                        <th>Глобальный приоритет</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alternatives.map((item, index) => (
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{formatNumber(globalPriorities[index])}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <p className="success">
                Лучшая альтернатива: <strong>{alternatives[bestIndex]}</strong>
            </p>
        </div>
    );
}
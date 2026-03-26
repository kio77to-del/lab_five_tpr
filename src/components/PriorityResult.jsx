"use client";

import { formatNumber } from "../lib/matrix";

export default function PriorityResult({ items, data }) {
    if (!data) return null;

    return (
        <div className="card">
            <h3>Локальные приоритеты</h3>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Объект</th>
                        <th>Произведение строки</th>
                        <th>Корень n-й степени</th>
                        <th>Приоритет</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{formatNumber(data.products[index])}</td>
                            <td>{formatNumber(data.geometricMeans[index])}</td>
                            <td>{formatNumber(data.priorities[index])}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
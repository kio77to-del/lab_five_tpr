"use client";

import { formatNumber } from "../lib/matrix";

export default function GlobalResult({ alternatives, globalPriorities }) {
    if (!alternatives.length || !globalPriorities.length) return null;

    const maxValue = Math.max(...globalPriorities);
    const bestIndex = globalPriorities.findIndex((item) => item === maxValue);
    const bestAlternative = alternatives[bestIndex];

    return (
        <div className="result-card">
            <div className="result-badge">Итоговое решение</div>

            <h3 className="result-title">Лучшая альтернатива</h3>

            <div className="winner-box">
                <div className="winner-name">{bestAlternative}</div>
                <div className="winner-score">
                    Глобальный приоритет: <strong>{formatNumber(maxValue)}</strong>
                </div>
            </div>

            <p className="result-description">
                По результатам метода анализа иерархий наилучшей альтернативой является{" "}
                <strong>{bestAlternative}</strong>, так как она получила максимальный
                глобальный приоритет среди всех рассматриваемых вариантов.
            </p>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Альтернатива</th>
                        <th>Глобальный приоритет</th>
                        <th>Место</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...alternatives]
                        .map((alternative, index) => ({
                            alternative,
                            priority: globalPriorities[index],
                        }))
                        .sort((a, b) => b.priority - a.priority)
                        .map((item, index) => (
                            <tr key={item.alternative} className={index === 0 ? "best-row" : ""}>
                                <td>{item.alternative}</td>
                                <td>{formatNumber(item.priority)}</td>
                                <td>{index + 1}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
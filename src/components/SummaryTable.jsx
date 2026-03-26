"use client";

import { formatNumber } from "../lib/matrix";

export default function SummaryTable({
                                         criteria,
                                         alternatives,
                                         criteriaWeights,
                                         alternativeDataMap,
                                         globalPriorities,
                                     }) {
    if (
        !criteria.length ||
        !alternatives.length ||
        !criteriaWeights.length ||
        !globalPriorities.length
    ) {
        return null;
    }

    const maxValue = Math.max(...globalPriorities);
    const bestIndex = globalPriorities.findIndex((value) => value === maxValue);

    return (
        <div className="card">
            <h3>Сводная таблица результатов</h3>

            <div className="table-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th>Альтернатива</th>
                        {criteria.map((criterion, index) => (
                            <th key={index}>
                                {criterion}
                                <br />
                                <span className="small-text">
                    w = {formatNumber(criteriaWeights[index])}
                  </span>
                            </th>
                        ))}
                        <th>Глобальный приоритет</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alternatives.map((alternative, altIndex) => (
                        <tr key={altIndex} className={altIndex === bestIndex ? "best-row" : ""}>
                            <td>
                                {alternative}
                                {altIndex === bestIndex && (
                                    <div className="best-mark">Лучшая</div>
                                )}
                            </td>

                            {criteria.map((criterion, criterionIndex) => {
                                const localPriority =
                                    alternativeDataMap[criterion]?.priorities?.[altIndex] ?? 0;

                                const contribution =
                                    (criteriaWeights[criterionIndex] ?? 0) * localPriority;

                                return (
                                    <td key={criterionIndex}>
                                        <div>{formatNumber(localPriority)}</div>
                                        <div className="small-text">
                                            вклад: {formatNumber(contribution)}
                                        </div>
                                    </td>
                                );
                            })}

                            <td>
                                <strong>{formatNumber(globalPriorities[altIndex])}</strong>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
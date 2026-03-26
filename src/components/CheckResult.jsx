"use client";

import { formatNumber } from "../lib/matrix";

export default function CheckResult({ data }) {
    if (!data) return null;

    return (
        <div className="card">
            <h3>Проверка согласованности</h3>

            <p>λmax = {formatNumber(data.lambdaMax)}</p>
            <p>Индекс согласованности (CI) = {formatNumber(data.ci)}</p>
            <p>Случайный индекс (RI) = {formatNumber(data.ri)}</p>
            <p>Отношение согласованности (CR) = {formatNumber(data.cr)}</p>

            <p className={data.isConsistent ? "success" : "error"}>
                {data.isConsistent
                    ? "Матрица согласована (CR &lt; 0.1)"
                    : "Матрица плохо согласована (CR ≥ 0.1)"}
            </p>
        </div>
    );
}
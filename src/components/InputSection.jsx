"use client";

export default function InputSection({
                                         goal,
                                         setGoal,
                                         criteriaText,
                                         setCriteriaText,
                                         alternativesText,
                                         setAlternativesText,
                                         onCreateMatrices,
                                     }) {
    return (
        <div className="card">
            <div className="form-group">
                <label>Цель исследования</label>
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="Введите цель"
                />
            </div>

            <div className="form-group">
                <label>Критерии (каждый с новой строки)</label>
                <textarea
                    value={criteriaText}
                    onChange={(e) => setCriteriaText(e.target.value)}
                    rows={6}
                />
            </div>

            <div className="form-group">
                <label>Альтернативы (каждая с новой строки)</label>
                <textarea
                    value={alternativesText}
                    onChange={(e) => setAlternativesText(e.target.value)}
                    rows={6}
                />
            </div>

            <button onClick={onCreateMatrices}>Создать матрицы</button>
        </div>
    );
}
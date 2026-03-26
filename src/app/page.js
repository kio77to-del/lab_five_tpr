"use client";

import { useMemo, useState } from "react";
import InputSection from "../components/InputSection";
import StepSection from "../components/StepSection";
import PairwiseMatrix from "../components/PairwiseMatrix";
import PriorityResult from "../components/PriorityResult";
import CheckResult from "../components/CheckResult";
import GlobalResult from "../components/GlobalResult";
import {
  defaultGoal,
  defaultCriteriaText,
  defaultAlternativesText,
} from "../data/defaultData";
import {
  createPairwiseMatrix,
  updateMatrixValue,
  calculateMatrixData,
  calculateGlobalPriorities,
} from "../lib/ahp";

export default function HomePage() {
  const [goal, setGoal] = useState(defaultGoal);
  const [criteriaText, setCriteriaText] = useState(defaultCriteriaText);
  const [alternativesText, setAlternativesText] = useState(defaultAlternativesText);

  const [criteria, setCriteria] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  const [criteriaMatrix, setCriteriaMatrix] = useState([]);
  const [alternativeMatrices, setAlternativeMatrices] = useState({});

  const parseLines = (text) =>
      text
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

  const handleCreateMatrices = () => {
    const parsedCriteria = parseLines(criteriaText);
    const parsedAlternatives = parseLines(alternativesText);

    setCriteria(parsedCriteria);
    setAlternatives(parsedAlternatives);

    setCriteriaMatrix(createPairwiseMatrix(parsedCriteria.length));

    const newAlternativeMatrices = {};
    parsedCriteria.forEach((criterion) => {
      newAlternativeMatrices[criterion] = createPairwiseMatrix(
          parsedAlternatives.length
      );
    });

    setAlternativeMatrices(newAlternativeMatrices);
  };

  const handleCriteriaMatrixChange = (row, col, value) => {
    setCriteriaMatrix((prev) => updateMatrixValue(prev, row, col, value));
  };

  const handleAlternativeMatrixChange = (criterion, row, col, value) => {
    setAlternativeMatrices((prev) => ({
      ...prev,
      [criterion]: updateMatrixValue(prev[criterion], row, col, value),
    }));
  };

  const criteriaData = useMemo(() => {
    if (!criteriaMatrix.length) return null;
    return calculateMatrixData(criteriaMatrix);
  }, [criteriaMatrix]);

  const alternativeDataMap = useMemo(() => {
    const result = {};

    criteria.forEach((criterion) => {
      const matrix = alternativeMatrices[criterion];
      if (matrix && matrix.length) {
        result[criterion] = calculateMatrixData(matrix);
      }
    });

    return result;
  }, [criteria, alternativeMatrices]);

  const globalPriorities = useMemo(() => {
    if (!criteriaData || !criteria.length || !alternatives.length) return [];

    const localPrioritiesMap = {};
    criteria.forEach((criterion) => {
      localPrioritiesMap[criterion] =
          alternativeDataMap[criterion]?.priorities || [];
    });

    return calculateGlobalPriorities(
        criteriaData.priorities,
        localPrioritiesMap,
        alternatives
    );
  }, [criteriaData, criteria, alternatives, alternativeDataMap]);

  return (
      <main className="container">
        <h1>Лабораторная работа №5 — Метод анализа иерархий</h1>
        <p className="subtitle">
          Приложение для расчёта локальных и глобальных приоритетов альтернатив
        </p>

        <StepSection title="Шаг 1. Ввод исходных данных">
          <InputSection
              goal={goal}
              setGoal={setGoal}
              criteriaText={criteriaText}
              setCriteriaText={setCriteriaText}
              alternativesText={alternativesText}
              setAlternativesText={setAlternativesText}
              onCreateMatrices={handleCreateMatrices}
          />
        </StepSection>

        {goal && (
            <div className="card">
              <h3>Цель</h3>
              <p>{goal}</p>
            </div>
        )}

        {criteria.length > 0 && alternatives.length > 0 && (
            <>
              <StepSection title="Шаг 2. Матрица попарных сравнений критериев">
                <PairwiseMatrix
                    title="Сравнение критериев"
                    items={criteria}
                    matrix={criteriaMatrix}
                    onChangeMatrix={handleCriteriaMatrixChange}
                />
                <PriorityResult items={criteria} data={criteriaData} />
                <CheckResult data={criteriaData} />
              </StepSection>

              <StepSection title="Шаг 3. Матрицы попарных сравнений альтернатив">
                {criteria.map((criterion, index) => (
                    <div key={index} className="criterion-block">
                      <PairwiseMatrix
                          title={`Сравнение альтернатив по критерию: ${criterion}`}
                          items={alternatives}
                          matrix={alternativeMatrices[criterion]}
                          onChangeMatrix={(row, col, value) =>
                              handleAlternativeMatrixChange(criterion, row, col, value)
                          }
                      />
                      <PriorityResult
                          items={alternatives}
                          data={alternativeDataMap[criterion]}
                      />
                      <CheckResult data={alternativeDataMap[criterion]} />
                    </div>
                ))}
              </StepSection>

              <StepSection title="Шаг 4. Итоговый выбор лучшей альтернативы">
                <GlobalResult
                    alternatives={alternatives}
                    globalPriorities={globalPriorities}
                />
              </StepSection>
            </>
        )}
      </main>
  );
}
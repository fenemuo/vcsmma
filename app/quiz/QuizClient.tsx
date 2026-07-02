"use client";

import { useEffect, useState } from "react";
import questionsData from "./questions.json";

type Difficulty = "Simple" | "Intermediate" | "Hard";

type QuizQuestion = {
  id: number;
  category: string;
  difficulty: string;
  topic: string;
  question: string;
  options: string[];
  answer: string;
  correctOption: number;
  explanation: string;
};

const DIFFICULTY_TIMERS: Record<Difficulty, number> = {
  Simple: 20,
  Intermediate: 30,
  Hard: 55,
};

const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  Simple: 1,
  Intermediate: 2,
  Hard: 3,
};

const TOTAL_QUESTIONS = 10;

export default function QuizClient() {
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Difficulty>("Simple");
  const [intermediateMistakes, setIntermediateMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY_TIMERS.Simple);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [results, setResults] = useState<
    Array<{ question: QuizQuestion; correct: boolean; points: number; level: Difficulty }>
  >([]);

  const currentQuestion = selectedQuestions[currentIndex] ?? null;
  const questionNumber = currentIndex + 1;
  const timerDuration = currentQuestion
    ? DIFFICULTY_TIMERS[currentQuestion.difficulty as Difficulty] ?? DIFFICULTY_TIMERS.Simple
    : DIFFICULTY_TIMERS.Simple;
  const progressPercent = Math.min(100, (questionNumber / TOTAL_QUESTIONS) * 100);

  const pickQuestionForLevel = (level: Difficulty) => {
    const pool = (questionsData as QuizQuestion[]).filter(
      (question) => question.difficulty === level && !usedQuestionIds.includes(question.id)
    );

    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)] ?? null;
    }

    const fallbackPool = (questionsData as QuizQuestion[]).filter(
      (question) => !usedQuestionIds.includes(question.id)
    );

    return fallbackPool[Math.floor(Math.random() * fallbackPool.length)] ?? null;
  };

  const answerQuestion = (optionIndex: number) => {
    if (!currentQuestion || isAnswered) {
      return;
    }

    const isCorrect = currentQuestion.correctOption === optionIndex;
    const currentLevelValue = currentQuestion.difficulty as Difficulty;
    const points = isCorrect ? DIFFICULTY_POINTS[currentLevelValue] : 0;

    setSelectedOption(optionIndex);
    setIsAnswered(true);
    setScore((prev) => prev + points);
    setResults((prev) => [
      ...prev,
      {
        question: currentQuestion,
        correct: isCorrect,
        points,
        level: currentLevelValue,
      },
    ]);

    if (isCorrect) {
      setFeedback(`Correct! ${currentQuestion.explanation}`);
    } else {
      setFeedback(`Not quite. ${currentQuestion.explanation}`);
    }

    if (currentLevelValue === "Simple") {
      setCurrentLevel(isCorrect ? "Intermediate" : "Simple");
      return;
    }

    if (currentLevelValue === "Intermediate") {
      const nextMistakes = isCorrect ? 0 : intermediateMistakes + 1;
      setIntermediateMistakes(nextMistakes);
      setCurrentLevel(nextMistakes >= 2 ? "Simple" : "Hard");
      return;
    }

    setCurrentLevel(isCorrect ? "Hard" : "Intermediate");
  };

  const goToNextQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    if (questionNumber >= TOTAL_QUESTIONS) {
      setIsComplete(true);
      setFeedback("Quiz complete. Review your score and challenge yourself again.");
      return;
    }

    const nextQuestion = pickQuestionForLevel(currentLevel);

    if (!nextQuestion) {
      setIsComplete(true);
      setFeedback("Quiz complete. Review your score and challenge yourself again.");
      return;
    }

    setSelectedQuestions((prev) => [...prev, nextQuestion]);
    setUsedQuestionIds((prev) => [...prev, nextQuestion.id]);
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setFeedback("");
    setIsAnswered(false);
    setTimeLeft(DIFFICULTY_TIMERS[nextQuestion.difficulty as Difficulty] ?? DIFFICULTY_TIMERS.Simple);
  };

  useEffect(() => {
    if (selectedQuestions.length === 0) {
      const firstQuestion = pickQuestionForLevel("Simple");

      if (firstQuestion) {
        setSelectedQuestions([firstQuestion]);
        setUsedQuestionIds([firstQuestion.id]);
        setTimeLeft(DIFFICULTY_TIMERS.Simple);
      }
    }
  }, [selectedQuestions.length, usedQuestionIds]);

  useEffect(() => {
    if (!currentQuestion || isComplete || isAnswered) {
      return;
    }

    setTimeLeft(timerDuration);

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          answerQuestion(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentQuestion?.id, isComplete, isAnswered, timerDuration]);

  if (isComplete) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-emerald-500/30 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Quiz Complete
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                You finished the adaptive challenge
              </h1>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-center">
              <p className="text-sm text-slate-400">Score</p>
              <p className="text-3xl font-semibold text-white">{score}</p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">{feedback}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {results.map((entry, index) => (
              <div
                key={`${entry.question.id}-${index}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <p className="text-sm font-medium text-slate-300">{entry.question.question}</p>
                <p className="mt-2 text-sm text-slate-400">
                  Level: <span className="text-white">{entry.level}</span> • Points: {entry.points}
                </p>
                <p className={`mt-2 text-sm font-medium ${entry.correct ? "text-emerald-400" : "text-rose-400"}`}>
                  {entry.correct ? "Correct" : "Incorrect"}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
          <p className="text-base text-slate-400">Loading quiz questions...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 text-slate-100 shadow-xl shadow-slate-950/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Adaptive OS Quiz
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Question {questionNumber} of {TOTAL_QUESTIONS}
            </h1>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-center">
            <p className="text-sm text-slate-400">Score</p>
            <p className="text-2xl font-semibold text-white">{score}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300">
            Level: {currentQuestion.difficulty}
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Topic: {currentQuestion.category}
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Time: {timeLeft}s
          </span>
          <span className="rounded-full border border-slate-700 px-3 py-1">
            Adaptive path: {currentLevel}
          </span>
        </div>

        <div className="mt-6 h-2 rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-8">
          <p className="text-lg font-medium leading-8 text-slate-100">
            {currentQuestion.question}
          </p>

          <div className="mt-6 grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = currentQuestion.correctOption === index;
              const showCorrect = isAnswered && isCorrectOption;
              const showIncorrect = isAnswered && isSelected && !isCorrectOption;

              return (
                <button
                  key={`${currentQuestion.id}-${option}`}
                  type="button"
                  onClick={() => answerQuestion(index)}
                  disabled={isAnswered}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    showCorrect
                      ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200"
                      : showIncorrect
                        ? "border-rose-500/60 bg-rose-500/10 text-rose-200"
                        : isSelected
                          ? "border-emerald-500/50 bg-slate-800 text-white"
                          : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 text-xs font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm leading-7 text-slate-400">
          <p className="font-medium text-slate-200">How it adapts</p>
          <p className="mt-2">
            Start with simple questions, move to intermediate after a correct simple answer, shift to hard when the flow stays steady, and fall back if the challenge becomes too difficult.
          </p>
          {feedback ? <p className="mt-3 text-slate-300">{feedback}</p> : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            {currentQuestion.difficulty === "Simple"
              ? "Simple questions are worth 1 point and last 20 seconds."
              : currentQuestion.difficulty === "Intermediate"
                ? "Intermediate questions are worth 2 points and last 30 seconds."
                : "Hard questions are worth 3 points and last 55 seconds."}
          </p>
          <button
            type="button"
            onClick={goToNextQuestion}
            disabled={!isAnswered}
            className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {questionNumber === TOTAL_QUESTIONS ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import questionsData from "./questions.json";
import QuizIntro from "./QuizIntro";

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

const getDifficultyTotals = () => {
  const questions = questionsData as QuizQuestion[];
  return questions.reduce(
    (acc, question) => {
      const difficulty = question.difficulty as Difficulty;
      if (difficulty === "Simple") {
        acc.Simple += 1;
      } else if (difficulty === "Intermediate") {
        acc.Intermediate += 1;
      } else if (difficulty === "Hard") {
        acc.Hard += 1;
      }
      return acc;
    },
    { Simple: 0, Intermediate: 0, Hard: 0 }
  );
};

export default function QuizClient() {
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<Difficulty>("Simple");
  const [simpleCorrectStreak, setSimpleCorrectStreak] = useState(0);
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
  const totalPossiblePoints = 25;
  const scoreLabel = `${score}/${totalPossiblePoints}`;
  const percentage = totalPossiblePoints > 0 ? Math.round((score / totalPossiblePoints) * 100) : 0;
  const isPassing = percentage >= 60;
  const needsRestart = isComplete && percentage < 60;

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
      if (isCorrect) {
        const nextStreak = simpleCorrectStreak + 1;
        setSimpleCorrectStreak(nextStreak);
        setCurrentLevel(nextStreak >= 2 ? "Intermediate" : "Simple");
      } else {
        setSimpleCorrectStreak(0);
        setCurrentLevel("Simple");
      }
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

  const restartQuiz = () => {
    setSelectedQuestions([]);
    setCurrentIndex(0);
    setCurrentLevel("Simple");
    setSimpleCorrectStreak(0);
    setIntermediateMistakes(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback("");
    setIsAnswered(false);
    setIsComplete(false);
    setTimeLeft(DIFFICULTY_TIMERS.Simple);
    setUsedQuestionIds([]);
    setResults([]);
    setHasStarted(true);
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
    if (!hasStarted || selectedQuestions.length > 0) {
      return;
    }

    if (selectedQuestions.length === 0) {
      const firstQuestion = pickQuestionForLevel("Simple");

      if (firstQuestion) {
        setSelectedQuestions([firstQuestion]);
        setUsedQuestionIds([firstQuestion.id]);
        setTimeLeft(DIFFICULTY_TIMERS.Simple);
      }
    }
  }, [hasStarted, selectedQuestions.length, usedQuestionIds]);

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

  // Save quiz performance when complete
  useEffect(() => {
    if (isComplete && score > 0) {
      const savePerformance = async () => {
        try {
          await fetch("/api/quiz-performance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              score,
              totalPoints: totalPossiblePoints,
              percentage,
            }),
          });
        } catch (error) {
          console.error("Error saving quiz performance:", error);
        }
      };
      savePerformance();
    }
  }, [isComplete, score, totalPossiblePoints, percentage]);

  if (!hasStarted) {
    return <QuizIntro onStart={() => setHasStarted(true)} />;
  }

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
            <div
              className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-center ${
                isPassing
                  ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  : "border-slate-800 bg-slate-900/70"
              }`}
            >
              {isPassing ? (
                <>
                  <span className="star-float star-one">★</span>
                  <span className="star-float star-two">★</span>
                  <span className="star-float star-three">★</span>
                </>
              ) : null}
              <p className="text-sm text-slate-400">Score</p>
              <p className="text-3xl font-semibold text-white">{scoreLabel}</p>
              {isPassing ? (
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                  Passed!
                </p>
              ) : null}
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">{feedback}</p>

          {needsRestart ? (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
              <p>You scored below 60%. Restart the quiz to try again.</p>
              <button
                type="button"
                onClick={restartQuiz}
                className="rounded-full bg-amber-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Restart Quiz
              </button>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3">
              <p className="text-slate-400">Percentage</p>
              <p className="text-2xl font-semibold text-white">{percentage}%</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3">
              <p className="text-slate-400">Pass mark</p>
              <p className="text-2xl font-semibold text-white">60%</p>
            </div>
          </div>

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
          <div
            className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-center ${
              isPassing
                ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                : "border-slate-800 bg-slate-900/70"
            }`}
          >
            {isPassing ? (
              <>
                <span className="star-float star-one">★</span>
                <span className="star-float star-two">★</span>
                <span className="star-float star-three">★</span>
              </>
            ) : null}
            <p className="text-sm text-slate-400">Score</p>
            <p className="text-2xl font-semibold text-white">{scoreLabel}</p>
            {isPassing ? (
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Passed!
              </p>
            ) : null}
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
      <style jsx>{`
        .star-float {
          position: absolute;
          color: #fde68a;
          font-size: 0.8rem;
          opacity: 0;
          animation: starPop 1.8s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(253, 230, 138, 0.7);
        }
        .star-one {
          top: 0.2rem;
          right: 0.45rem;
          animation-delay: 0s;
        }
        .star-two {
          top: 0.5rem;
          left: 0.45rem;
          animation-delay: 0.45s;
        }
        .star-three {
          bottom: 0.25rem;
          right: 0.55rem;
          animation-delay: 0.9s;
        }
        @keyframes starPop {
          0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
          }
          40% {
            transform: translateY(-6px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-14px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}

import type { Metadata } from "next";
import QuizClient from "./QuizClient";

export const metadata: Metadata = {
  title: "Quiz — VCSMMA",
  description: "Test your knowledge with quizzes and challenges built for OS learners.",
};

export default function QuizPage() {
  return <QuizClient />;
}

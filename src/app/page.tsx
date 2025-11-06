'use client';
import { useState, useMemo, useEffect } from 'react';
import Progress from "@/components/Progress";
import { QUESTIONS } from "@/data/questions";

export default function QuizPage() {
  const total = QUESTIONS.length; // 這裡也改
  const [index, setIndex] = useState(0);

  const q = QUESTIONS[index];     // 取題目時改用 QUESTIONS

  // 其餘程式碼不變…
}

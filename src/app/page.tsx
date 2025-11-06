import Progress from "@/components/Progress";
import questions from "@/data/questions";
// … 其他 import

export default function QuizPage() {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  // …

  return (
    <main className="container-narrow py-8">
      {/* 這行是進度條，確定有把 index / total 傳進去 */}
      <Progress current={index} total={total} />

      {/* 其餘題目 UI … */}
    </main>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw, BookOpen, Brain, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeapTree } from "@/components/HeapTree";
import { cn } from "@/lib/utils";

// ─── Content sections ────────────────────────────────────────
const sections = [
  {
    id: "intro",
    title: "¿Qué es Heap Sort?",
    icon: BookOpen,
    content: (
      <div className="space-y-4 text-muted-foreground">
        <p>
          <strong className="text-foreground">Heap Sort</strong> es un algoritmo que ordena elementos 
          (como una lista de números) usando una estructura especial llamada <em>heap</em>.
        </p>
        <p>
          Imagina que tienes cartas desordenadas y quieres ordenarlas de menor a mayor. 
          Heap Sort las organiza formando un <strong className="text-foreground">árbol especial</strong> donde 
          el número más grande siempre está arriba.
        </p>
        <div className="glass-card p-4">
          <p className="text-sm font-medium text-foreground mb-3">Ejemplo de un Max-Heap:</p>
          <HeapTree array={[50, 30, 40, 10, 20, 15]} />
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Cada padre es mayor o igual que sus hijos
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "heap",
    title: "¿Qué es un Heap?",
    icon: Brain,
    content: (
      <div className="space-y-4 text-muted-foreground">
        <p>
          Un <strong className="text-foreground">heap</strong> es un árbol binario con una regla simple:
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span><strong className="text-foreground">Max-Heap:</strong> cada padre es <em>mayor o igual</em> que sus hijos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">•</span>
            <span><strong className="text-foreground">Min-Heap:</strong> cada padre es <em>menor o igual</em> que sus hijos</span>
          </li>
        </ul>
        <p>En Heap Sort usamos un <strong className="text-foreground">Max-Heap</strong>. El array se interpreta como un árbol:</p>
        <div className="glass-card p-4 space-y-2 text-sm">
          <p>Para un elemento en posición <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">i</code>:</p>
          <p>• Hijo izquierdo: <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">2i + 1</code></p>
          <p>• Hijo derecho: <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">2i + 2</code></p>
          <p>• Padre: <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono">⌊(i-1)/2⌋</code></p>
        </div>
      </div>
    ),
  },
  {
    id: "steps",
    title: "Pasos del algoritmo",
    icon: ListChecks,
    content: (
      <div className="space-y-4 text-muted-foreground">
        <div className="space-y-3">
          {[
            { step: 1, title: "Construir el Max-Heap", desc: "Reorganiza el array para que cumpla la propiedad de Max-Heap." },
            { step: 2, title: "Extraer el máximo", desc: "El elemento más grande (raíz) se mueve al final del array." },
            { step: 3, title: "Reducir el heap", desc: "Reduce el tamaño del heap en 1 y restaura la propiedad." },
            { step: 4, title: "Repetir", desc: "Repite los pasos 2 y 3 hasta que el heap tenga un solo elemento." },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-display shrink-0">
                {s.step}
              </div>
              <div>
                <p className="font-medium text-foreground">{s.title}</p>
                <p className="text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Quiz data ───────────────────────────────────────────────
interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    question: "¿Qué estructura de datos usa Heap Sort?",
    options: ["Lista enlazada", "Heap (montículo)", "Pila (stack)", "Cola (queue)"],
    correct: 1,
    explanation: "Heap Sort usa un heap binario (montículo) para organizar y ordenar los elementos.",
  },
  {
    question: "En un Max-Heap, ¿dónde está el elemento más grande?",
    options: ["Al final del array", "En la raíz (posición 0)", "En una hoja", "En cualquier posición"],
    correct: 1,
    explanation: "En un Max-Heap, el elemento más grande siempre está en la raíz (posición 0 del array).",
  },
  {
    question: "Si un nodo está en la posición 2 del array, ¿cuál es su hijo izquierdo?",
    options: ["Posición 3", "Posición 4", "Posición 5", "Posición 6"],
    correct: 2,
    explanation: "El hijo izquierdo de la posición i es 2i + 1. Para i=2: 2(2)+1 = 5.",
  },
  {
    question: "¿Cuál es el primer paso de Heap Sort?",
    options: ["Ordenar el array", "Construir un Max-Heap", "Encontrar el mínimo", "Dividir el array"],
    correct: 1,
    explanation: "El primer paso es construir un Max-Heap a partir del array desordenado.",
  },
  {
    question: "¿Cuántas veces se ejecuta la extracción del máximo?",
    options: ["1 vez", "log n veces", "n-1 veces", "n² veces"],
    correct: 2,
    explanation: "Se extrae el máximo n-1 veces, cada vez colocando el mayor al final y reduciendo el heap.",
  },
];

// ─── Step exercise data ──────────────────────────────────────
const stepExerciseArray = [4, 10, 3, 5, 1];
const stepExerciseSteps = [
  { label: "¿Cuál es el primer paso?", options: ["Ordenar directamente", "Construir un Max-Heap", "Encontrar el mínimo"], correct: 1 },
  { label: "Después de construir el Max-Heap [10, 5, 3, 4, 1], ¿qué hacemos?", options: ["Terminamos", "Intercambiamos 10 con el último elemento", "Borramos 10"], correct: 1 },
  { label: "Tras intercambiar, el array es [1, 5, 3, 4, | 10]. ¿Qué sigue?", options: ["Repetir heapify en la parte sin ordenar", "Empezar de nuevo", "Nada más"], correct: 0 },
];

// ─── Component ───────────────────────────────────────────────
export default function Learn() {
  const [activeSection, setActiveSection] = useState("intro");
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswer, setStepAnswer] = useState<number | null>(null);
  const [stepScore, setStepScore] = useState(0);
  const [stepDone, setStepDone] = useState(false);

  const currentQ = quizQuestions[quizIndex];
  const currentStep = stepExerciseSteps[stepIndex];

  const handleQuizAnswer = (i: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(i);
    if (i === currentQ.correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((q) => q + 1);
      setSelectedAnswer(null);
    } else {
      setQuizDone(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizDone(false);
  };

  const handleStepAnswer = (i: number) => {
    if (stepAnswer !== null) return;
    setStepAnswer(i);
    if (i === currentStep.correct) setStepScore((s) => s + 1);
  };

  const nextStep = () => {
    if (stepIndex < stepExerciseSteps.length - 1) {
      setStepIndex((s) => s + 1);
      setStepAnswer(null);
    } else {
      setStepDone(true);
    }
  };

  const resetSteps = () => {
    setStepIndex(0);
    setStepAnswer(null);
    setStepScore(0);
    setStepDone(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Aprende Heap Sort</h1>
        <p className="text-muted-foreground mb-8">Desde los conceptos básicos hasta la práctica</p>
      </motion.div>

      {/* Section tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              activeSection === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <s.icon className="h-4 w-4" />
            {s.title}
          </button>
        ))}
      </div>

      {/* Section content */}
      <AnimatePresence mode="wait">
        {sections.map(
          (s) =>
            activeSection === s.id && (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="glass-card p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <s.icon className="h-5 w-5 text-primary" />
                  {s.title}
                </h2>
                {s.content}
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Brain className="h-5 w-5 text-secondary" />
          Quiz interactivo
        </h2>
        <p className="text-sm text-muted-foreground mb-6">Pon a prueba lo que aprendiste</p>

        {!quizDone ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Pregunta {quizIndex + 1} de {quizQuestions.length}
              </span>
              <span className="text-sm font-medium text-primary">{score} puntos</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full mb-6">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            <p className="font-medium text-lg mb-4">{currentQ.question}</p>

            <div className="space-y-2">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentQ.correct;
                const showResult = selectedAnswer !== null;

                return (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(i)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm",
                      !showResult && "hover:border-primary/50 hover:bg-primary/5 border-border",
                      showResult && isCorrect && "border-success bg-success/10 text-success",
                      showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-destructive",
                      showResult && !isSelected && !isCorrect && "opacity-50 border-border"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 shrink-0" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{currentQ.explanation}</p>
                <Button onClick={nextQuestion} className="mt-3 rounded-full" size="sm">
                  {quizIndex < quizQuestions.length - 1 ? (
                    <>Siguiente <ChevronRight className="h-4 w-4 ml-1" /></>
                  ) : (
                    "Ver resultado"
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
            <Trophy className="h-12 w-12 text-secondary mx-auto mb-4" />
            <p className="text-2xl font-bold mb-2">
              {score}/{quizQuestions.length}
            </p>
            <p className="text-muted-foreground mb-1">
              {score === quizQuestions.length
                ? "¡Perfecto! 🎉 Dominas los conceptos."
                : score >= 3
                ? "¡Muy bien! 💪 Casi lo tienes."
                : "¡Sigue practicando! 📚 Tú puedes."}
            </p>
            <Button onClick={resetQuiz} variant="outline" className="mt-4 rounded-full" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" /> Reintentar
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Step exercise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-accent" />
          Ejercicio paso a paso
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Array inicial: <code className="bg-muted px-2 py-0.5 rounded font-mono text-primary">[{stepExerciseArray.join(", ")}]</code>
        </p>

        {!stepDone ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Paso {stepIndex + 1} de {stepExerciseSteps.length}</span>
              <span className="text-sm font-medium text-accent">{stepScore} correctos</span>
            </div>
            <p className="font-medium mb-4">{currentStep.label}</p>
            <div className="space-y-2">
              {currentStep.options.map((opt, i) => {
                const isSelected = stepAnswer === i;
                const isCorrect = i === currentStep.correct;
                const showResult = stepAnswer !== null;
                return (
                  <button
                    key={i}
                    onClick={() => handleStepAnswer(i)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border transition-all text-sm",
                      !showResult && "hover:border-accent/50 hover:bg-accent/5 border-border",
                      showResult && isCorrect && "border-success bg-success/10 text-success",
                      showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-destructive",
                      showResult && !isSelected && !isCorrect && "opacity-50 border-border"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {stepAnswer !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                <Button onClick={nextStep} className="rounded-full" size="sm">
                  {stepIndex < stepExerciseSteps.length - 1 ? "Siguiente paso" : "Finalizar"}
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-4">
            <p className="text-lg font-bold mb-1">
              {stepScore === stepExerciseSteps.length ? "¡Excelente! Entiendes el flujo completo 🎉" : "¡Buen intento! Repasa los pasos 💡"}
            </p>
            <Button onClick={resetSteps} variant="outline" className="mt-3 rounded-full" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" /> Reintentar
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

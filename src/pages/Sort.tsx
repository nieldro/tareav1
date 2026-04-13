import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, RotateCcw, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeapTree } from "@/components/HeapTree";
import { cn } from "@/lib/utils";

interface Step {
  array: number[];
  highlight: number[];
  sorted: number[];
  comparing: number[];
  message: string;
}

function generateHeapSortSteps(input: number[]): Step[] {
  const arr = [...input];
  const n = arr.length;
  const steps: Step[] = [];
  const sorted: number[] = [];

  steps.push({ array: [...arr], highlight: [], sorted: [], comparing: [], message: "Array inicial" });

  // Build max heap
  function heapify(size: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    steps.push({ array: [...arr], highlight: [i], sorted: [...sorted], comparing: left < size ? [left] : [], message: `Heapify: comparando nodo ${arr[i]} con sus hijos` });

    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      steps.push({ array: [...arr], highlight: [], sorted: [...sorted], comparing: [i, largest], message: `Intercambiando ${arr[i]} ↔ ${arr[largest]}` });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({ array: [...arr], highlight: [i, largest], sorted: [...sorted], comparing: [], message: `Resultado del intercambio` });
      heapify(size, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  steps.push({ array: [...arr], highlight: [], sorted: [...sorted], comparing: [], message: "✅ Max-Heap construido" });

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    steps.push({ array: [...arr], highlight: [], sorted: [...sorted], comparing: [0, i], message: `Moviendo el máximo ${arr[0]} al final` });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    sorted.push(i);
    steps.push({ array: [...arr], highlight: [], sorted: [...sorted], comparing: [], message: `${arr[i]} en su posición final` });
    heapify(i, 0);
  }
  sorted.push(0);
  steps.push({ array: [...arr], highlight: [], sorted: [...sorted], comparing: [], message: "🎉 ¡Array ordenado!" });

  return steps;
}

export default function Sort() {
  const [inputValue, setInputValue] = useState("38, 27, 43, 3, 9, 82, 10");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentData = steps[currentStep];

  const startSort = useCallback(() => {
    const nums = inputValue.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));
    if (nums.length < 2) return;
    const s = generateHeapSortSteps(nums);
    setSteps(s);
    setCurrentStep(0);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [inputValue]);

  const play = () => {
    if (currentStep >= steps.length - 1) return;
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const pause = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextStepFn = () => {
    pause();
    setCurrentStep((p) => Math.min(p + 1, steps.length - 1));
  };

  const reset = () => {
    pause();
    setCurrentStep(0);
  };

  const randomize = () => {
    const count = 5 + Math.floor(Math.random() * 4);
    const nums = Array.from({ length: count }, () => Math.floor(Math.random() * 99) + 1);
    setInputValue(nums.join(", "));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Ordenar con Heap Sort</h1>
        <p className="text-muted-foreground mb-8">Ingresa números y observa el algoritmo en acción</p>
      </motion.div>

      {/* Input */}
      <div className="glass-card p-6 mb-6">
        <label className="text-sm font-medium mb-2 block">Lista de números (separados por coma)</label>
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ej: 38, 27, 43, 3, 9"
            className="font-mono"
          />
          <Button onClick={randomize} variant="outline" size="icon" title="Aleatorio">
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={startSort} className="mt-3 rounded-full">
          <Play className="h-4 w-4 mr-2" /> Ordenar
        </Button>
      </div>

      {/* Visualization */}
      {steps.length > 0 && currentData && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Controls */}
          <div className="glass-card p-4 flex flex-wrap items-center gap-3">
            <Button size="sm" variant="outline" onClick={isPlaying ? pause : play} className="rounded-full">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="ml-1">{isPlaying ? "Pausar" : "Reproducir"}</span>
            </Button>
            <Button size="sm" variant="outline" onClick={nextStepFn} className="rounded-full" disabled={currentStep >= steps.length - 1}>
              <SkipForward className="h-4 w-4 mr-1" /> Siguiente
            </Button>
            <Button size="sm" variant="outline" onClick={reset} className="rounded-full">
              <RotateCcw className="h-4 w-4 mr-1" /> Reiniciar
            </Button>
            <span className="text-sm text-muted-foreground ml-auto">
              Paso {currentStep + 1} / {steps.length}
            </span>
          </div>

          {/* Progress */}
          <div className="h-1.5 bg-muted rounded-full">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>

          {/* Message */}
          <div className="glass-card p-4 text-center">
            <p className="font-medium">{currentData.message}</p>
          </div>

          {/* Tree */}
          <div className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Vista de árbol</p>
            <HeapTree
              array={currentData.array}
              highlightIndices={currentData.highlight}
              sortedIndices={currentData.sorted}
              comparingIndices={currentData.comparing}
            />
          </div>

          {/* Array view */}
          <div className="glass-card p-6">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Vista de array</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {currentData.array.map((n, i) => (
                <motion.div
                  key={i}
                  layout
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold font-display text-sm transition-colors",
                    currentData.sorted.includes(i)
                      ? "bg-success/15 text-success border border-success/30"
                      : currentData.comparing.includes(i)
                      ? "bg-secondary/15 text-secondary border border-secondary/30"
                      : currentData.highlight.includes(i)
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "bg-muted text-foreground border border-border"
                  )}
                >
                  {n}
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary" /> Heap</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary" /> Comparando</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success" /> Ordenado</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

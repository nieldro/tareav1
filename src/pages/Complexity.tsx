import { motion } from "framer-motion";
import { BarChart3, Clock, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Generate complexity data
const data = Array.from({ length: 10 }, (_, i) => {
  const n = (i + 1) * 10;
  return {
    n,
    "Heap Sort O(n log n)": Math.round(n * Math.log2(n)),
    "Quick Sort O(n log n)": Math.round(n * Math.log2(n) * 1.1),
    "Bubble Sort O(n²)": n * n,
  };
});

const comparisons = [
  { algo: "Heap Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: "No", color: "bg-primary" },
  { algo: "Quick Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "No", color: "bg-secondary" },
  { algo: "Merge Sort", best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "Sí", color: "bg-accent" },
  { algo: "Bubble Sort", best: "O(n)", avg: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "Sí", color: "bg-destructive" },
];

export default function Complexity() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Complejidad</h1>
        <p className="text-muted-foreground mb-8">Entiende qué tan eficiente es Heap Sort</p>
      </motion.div>

      {/* What is Big O */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          ¿Qué es Big O?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            <strong className="text-foreground">Big O</strong> es una forma de medir qué tan rápido (o lento) 
            es un algoritmo a medida que la cantidad de datos crece.
          </p>
          <p>Piensa en ello como una "calificación de velocidad":</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            {[
              { label: "O(n log n)", desc: "Rápido ⚡", badge: "bg-success/15 text-success border-success/30" },
              { label: "O(n²)", desc: "Lento 🐌", badge: "bg-warning/15 text-warning border-warning/30" },
              { label: "O(n!)", desc: "Muy lento 🐢", badge: "bg-destructive/15 text-destructive border-destructive/30" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border p-4 text-center ${item.badge}`}>
                <p className="font-mono font-bold text-lg">{item.label}</p>
                <p className="text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Heap Sort complexity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-secondary" />
          Heap Sort: O(n log n) siempre
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            La gran ventaja de Heap Sort es que <strong className="text-foreground">siempre tiene la misma velocidad</strong>, 
            sin importar cómo estén ordenados los datos inicialmente.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { case: "Mejor caso", val: "O(n log n)" },
              { case: "Caso promedio", val: "O(n log n)" },
              { case: "Peor caso", val: "O(n log n)" },
            ].map((c) => (
              <div key={c.case} className="rounded-xl bg-primary/10 p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">{c.case}</p>
                <p className="font-mono font-bold text-primary">{c.val}</p>
              </div>
            ))}
          </div>
          <p className="text-sm mt-2">
            Además usa <strong className="text-foreground">memoria constante O(1)</strong> — no necesita espacio extra.
          </p>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-accent" />
          Comparación visual
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Operaciones necesarias según el tamaño de los datos</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="n" label={{ value: "Elementos (n)", position: "bottom", offset: -5 }} tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="Heap Sort O(n log n)" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Quick Sort O(n log n)" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="Bubble Sort O(n²)" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Comparison table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Tabla comparativa</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Algoritmo</th>
                <th className="text-center py-3 px-2 font-medium text-muted-foreground">Mejor</th>
                <th className="text-center py-3 px-2 font-medium text-muted-foreground">Promedio</th>
                <th className="text-center py-3 px-2 font-medium text-muted-foreground">Peor</th>
                <th className="text-center py-3 px-2 font-medium text-muted-foreground">Espacio</th>
                <th className="text-center py-3 px-2 font-medium text-muted-foreground">Estable</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c) => (
                <tr key={c.algo} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-2 font-medium flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${c.color}`} />
                    {c.algo}
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-xs">{c.best}</td>
                  <td className="py-3 px-2 text-center font-mono text-xs">{c.avg}</td>
                  <td className="py-3 px-2 text-center font-mono text-xs">{c.worst}</td>
                  <td className="py-3 px-2 text-center font-mono text-xs">{c.space}</td>
                  <td className="py-3 px-2 text-center">{c.stable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

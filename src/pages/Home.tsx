import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpDown, BarChart3, Sparkles, FileText, Presentation, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeapTree } from "@/components/HeapTree";

const features = [
  { icon: BookOpen, title: "Aprende", desc: "Explicaciones claras y ejercicios interactivos", path: "/aprende", color: "bg-primary/10 text-primary" },
  { icon: ArrowUpDown, title: "Ordena", desc: "Visualiza el algoritmo paso a paso", path: "/ordenar", color: "bg-secondary/10 text-secondary" },
  { icon: BarChart3, title: "Complejidad", desc: "Entiende Big O con gráficas", path: "/complejidad", color: "bg-accent/10 text-accent" },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Aprende algoritmos de forma divertida
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Domina{" "}
              <span className="gradient-text">Heap Sort</span>
              {" "}desde cero
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Una plataforma interactiva para aprender el algoritmo de ordenamiento Heap Sort. 
              Sin conocimientos previos necesarios.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/aprende">Comenzar a aprender</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/ordenar">Probar el algoritmo</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <p className="text-sm text-muted-foreground mb-3 font-medium">Ejemplo: Max-Heap</p>
            <HeapTree array={[90, 70, 80, 30, 50, 40, 20]} />
            <div className="flex gap-2 mt-4 justify-center">
              {[90, 70, 80, 30, 50, 40, 20].map((n, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold font-display"
                >
                  {n}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link to={f.path} className="glass-card p-6 block hover:border-primary/30 transition-colors group">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Downloads */}
      <section id="descargas" className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Download className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Material descargable</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Descarga la presentación y el documento del trabajo realizado por{" "}
            <strong className="text-foreground">Daniel Alejandro Paez Torres</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/downloads/Heap_Sort_Daniel_Paez.pptx"
              download
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <Presentation className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">Presentación (PPTX)</p>
                <p className="text-sm text-muted-foreground truncate">Heap_Sort_Daniel_Paez.pptx</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="/downloads/Heap_Sort_APA_Daniel_Paez.docx"
              download
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">Documento APA (DOCX)</p>
                <p className="text-sm text-muted-foreground truncate">Heap_Sort_APA_Daniel_Paez.docx</p>
              </div>
              <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Author footer */}
      <footer className="container mx-auto px-4 pb-10">
        <p className="text-center text-sm text-muted-foreground">
          Hecho por <span className="font-semibold text-foreground">Daniel Alejandro Paez Torres</span>
        </p>
      </footer>
    </div>
  );
}

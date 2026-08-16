export const SITE = {
  name: "Conexpet",
  tagline: "Logística y Transporte de Carga Pesada",
  hero: "Hacemos de la logística y transporte de carga pesada un arte",
  whatsapp: "+593991234567", // Reemplazar con número real
  phone: "+593 (02) 3956540",
  email: "conexpet@conexpet.com",
  address: "Vía Tarapoa Lote 5 S/N y Kilómetro 11 1/2, Lago Agrio, Sucumbíos, Ecuador",
  location: { lat: 0.0833, lng: -76.8833 }, // Lago Agrio coords
} as const;

export const SERVICES = [
  {
    id: "vacuum",
    title: "Transporte de Fluidos",
    shortTitle: "Vacuum",
    description:
      "Movilizamos crudo, aguas residuales y agua fresca con equipos tipo vacuum de alta capacidad hasta 200 barriles.",
    capacity: "Hasta 200 barriles",
    icon: "droplets" as const,
  },
  {
    id: "carga-pesada",
    title: "Carga Pesada y Contenedores",
    shortTitle: "Transporte",
    description:
      "Especialistas en el transporte de taladros (RIGs), maquinaria pesada, tuberías, bombas y contenedores secos y refrigerados.",
    capacity: "Extrapesada certificada",
    icon: "truck" as const,
  },
  {
    id: "izaje",
    title: "Izaje y Montaje",
    shortTitle: "Izaje",
    description:
      "Grúas de hasta 120 toneladas para maniobras de izaje seguras y precisas. Levantamiento de equipos industriales y estructuras.",
    capacity: "Hasta 120 toneladas",
    icon: "move-vertical" as const,
  },
  {
    id: "talleres",
    title: "Talleres y Mantenimiento",
    shortTitle: "Talleres",
    description:
      "Talleres propios con mantenimiento preventivo y correctivo. Repuestos certificados y tecnología de última generación.",
    capacity: "Infraestructura propia",
    icon: "wrench" as const,
  },
] as const;

export const STATS = [
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 50, suffix: "+", label: "Vehículos y equipos" },
  { value: 500, suffix: "+", label: "Proyectos completados" },
  { value: 99.5, suffix: "%", label: "Cumplimiento de entregas" },
] as const;

export const SCROLL_SECTIONS = [
  { id: "hero", label: "Inicio", range: [0, 0.05] },
  { id: "orbit", label: "Presentación", range: [0.05, 0.15] },
  { id: "tech", label: "Tecnología", range: [0.15, 0.25] },
  { id: "services", label: "Servicios", range: [0.25, 0.40] },
  { id: "workshop", label: "Talleres", range: [0.40, 0.50] },
  { id: "stats", label: "Cifras", range: [0.50, 0.60] },
  { id: "company", label: "Empresa", range: [0.60, 0.70] },
  { id: "projects", label: "Proyectos", range: [0.70, 0.80] },
  { id: "fleet", label: "Flota", range: [0.80, 0.90] },
  { id: "contact", label: "Contacto", range: [0.90, 0.95] },
  { id: "finale", label: "Finale", range: [0.95, 1.0] },
] as const;

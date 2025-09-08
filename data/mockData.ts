import { Listing, Provider, Review, User, Booking, Conversation, Project, Notification, Transaction, ServiceCategory, Skill } from '../types';

// FIX: Export mockUserClient to be used in other files.
export const mockUserClient: User = {
  id: 'u-client-1',
  name: 'Ana Gómez',
  email: 'ana.gomez@constructora.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=anagomez',
  roles: ['client'],
  status: 'active',
};

// FIX: Export mockUserProvider to be used in other files.
export const mockUserProvider: User = {
  id: 'p1', 
  name: 'Construcciones Rápidas S.A.',
  email: 'carlos@construccionesrapidas.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=p1',
  roles: ['provider', 'client'],
  status: 'active',
};

// FIX: Export mockUserAdmin to be used in other files.
export const mockUserAdmin: User = {
    id: 'u-admin-1',
    name: 'Admin ConectaObra',
    email: 'admin@conectaobra.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin',
    roles: ['admin'],
    status: 'active',
};

export const mockUsers: User[] = [
    mockUserClient,
    mockUserProvider,
    mockUserAdmin
];

export const provincesAndCities = [
    { province: 'Distrito Nacional', cities: ['Distrito Nacional'] },
    { province: 'Santo Domingo', cities: ['Santo Domingo Este', 'Santo Domingo Oeste', 'Santo Domingo Norte', 'Boca Chica'] },
    { province: 'Santiago', cities: ['Santiago de los Caballeros', 'Licey al Medio', 'Villa González'] },
    { province: 'La Altagracia', cities: ['Punta Cana', 'Higüey', 'Bávaro'] },
    { province: 'La Romana', cities: ['La Romana', 'Villa Hermosa', 'Guaymate'] },
];

const initialProviders: Provider[] = [
  { id: 'p1', name: 'Construcciones Rápidas S.A.', province: 'Santo Domingo', city: 'Santo Domingo Este', avatarUrl: 'https://i.pravatar.cc/150?u=p1', rating: 4.8, reviewsCount: 120, verified: true, memberSince: '2020', spotlight: true, bio: 'Líderes en el alquiler de maquinaria pesada y movimiento de tierra en la zona de Santo Domingo. Flota moderna y operadores certificados para garantizar la eficiencia y seguridad en su proyecto.', projectsCompleted: 250, skills: ['Movimiento de Tierra', 'Excavación Profunda', 'Alquiler de Maquinaria', 'Operadores Certificados'], responseTime: 'Menos de 2 horas', completedProjectSamples: [{ name: 'Remoción de Tierra - Nuevo Aeropuerto', category: 'Movimiento de Tierra' }, { name: 'Excavación para Torre Residencial', category: 'Excavación Profunda' }], unavailableDates: [], status: 'active' },
  { id: 'p2', name: 'Arq. Lucía Mendoza', province: 'Santiago', city: 'Santiago de los Caballeros', avatarUrl: 'https://i.pravatar.cc/150?u=p2', rating: 4.9, reviewsCount: 85, verified: true, memberSince: '2019', spotlight: true, bio: 'Estudio de arquitectura especializado en diseño residencial moderno y sostenible. Creamos espacios que inspiran, combinando estética y funcionalidad. 12 años de experiencia.', projectsCompleted: 95, skills: ['Diseño Arquitectónico', 'Renders 3D', 'Supervisión de Obra', 'Diseño Sostenible'], responseTime: 'Menos de 24 horas', completedProjectSamples: [{ name: 'Villa de Lujo en Casa de Campo', category: 'Diseño Residencial' }, { name: 'Edificio de Apartamentos Moderno', category: 'Diseño Comercial' }], unavailableDates: [], status: 'active' },
  { id: 'p3', name: 'Maquinaria Pesada del Este', province: 'La Altagracia', city: 'Punta Cana', avatarUrl: 'https://i.pravatar.cc/150?u=p3', rating: 4.5, reviewsCount: 210, verified: false, memberSince: '2021', bio: 'Ofrecemos una amplia gama de equipos para la construcción en la región Este del país. Precios competitivos y servicio confiable.', projectsCompleted: 310, skills: ['Alquiler de Equipos', 'Transporte de Agregados', 'Logística de Obra'], responseTime: 'Menos de 8 horas', completedProjectSamples: [{ name: 'Suministro de Equipos - Hotel Hyatt', category: 'Alquiler de Flota' }], unavailableDates: [], status: 'active' },
  { id: 'p4', name: 'Plomería y Electricidad Total', province: 'Distrito Nacional', city: 'Distrito Nacional', avatarUrl: 'https://i.pravatar.cc/150?u=p4', rating: 4.7, reviewsCount: 95, verified: true, memberSince: '2018', bio: 'Equipo de técnicos certificados para soluciones integrales en plomería y electricidad. Atendemos emergencias y proyectos nuevos.', projectsCompleted: 180, skills: ['Instalaciones Eléctricas', 'Plomería Residencial', 'Mantenimiento Preventivo', 'Emergencias 24/7'], responseTime: 'Menos de 1 hora', completedProjectSamples: [{ name: 'Instalación Completa - Plaza Comercial', category: 'Electricidad y Plomería' }], unavailableDates: [], status: 'active' },
  { id: 'p5', name: 'Ingeniería Estructural Avanzada', province: 'Distrito Nacional', city: 'Distrito Nacional', avatarUrl: 'https://i.pravatar.cc/150?u=p5', rating: 5.0, reviewsCount: 30, verified: true, memberSince: '2022', spotlight: true, bio: 'Firma de ingeniería civil especializada en cálculo y diseño estructural sismorresistente. Garantizamos la seguridad e integridad de su edificación.', projectsCompleted: 45, skills: ['Cálculo Estructural', 'Diseño Sismorresistente', 'Revisión de Planos', 'Consultoría'], responseTime: 'Menos de 48 horas', completedProjectSamples: [{ name: 'Diseño Estructural - Torre Corporativa', category: 'Ingeniería Civil' }], unavailableDates: [], status: 'active' },
  { id: 'p6', name: 'TodoHerramientas RD', province: 'Santiago', city: 'Santiago de los Caballeros', avatarUrl: 'https://i.pravatar.cc/150?u=p6', rating: 4.6, reviewsCount: 150, verified: true, memberSince: '2017', bio: 'El más completo centro de alquiler de herramientas eléctricas y manuales para profesionales y aficionados. Equipos de las mejores marcas.', projectsCompleted: 500, skills: ['Herramientas Eléctricas', 'Equipos de Medición', 'Seguridad Industrial'], responseTime: 'Menos de 4 horas', completedProjectSamples: [{ name: 'Suministro Herramientas - Remodelación', category: 'Alquiler de Herramientas' }], unavailableDates: [], status: 'active' },
  { id: 'p7', name: 'Pintura y Acabados Pro', province: 'Santo Domingo', city: 'Santo Domingo Oeste', avatarUrl: 'https://i.pravatar.cc/150?u=p7', rating: 4.8, reviewsCount: 65, verified: true, memberSince: '2020', bio: 'Servicio profesional de pintura y acabados para interiores y exteriores. Utilizamos materiales de alta calidad para un resultado duradero y estético.', projectsCompleted: 88, skills: ['Pintura de Interiores', 'Pintura de Exteriores', 'Acabados Decorativos', 'Impermeabilización'], responseTime: 'Menos de 12 horas', completedProjectSamples: [{ name: 'Pintura Completa - Hotel Embajador', category: 'Acabados' }], unavailableDates: [], status: 'active' },
  { id: 'p8', name: 'Grúas y Elevadores Cibao', province: 'Santiago', city: 'Santiago de los Caballeros', avatarUrl: 'https://i.pravatar.cc/150?u=p8', rating: 4.7, reviewsCount: 40, verified: true, memberSince: '2019', bio: 'Soluciones para trabajos en altura. Alquiler de grúas telescópicas, camiones canasta y plataformas elevadoras en toda la región del Cibao.', projectsCompleted: 112, skills: ['Izaje de Cargas', 'Trabajos en Altura', 'Alquiler de Grúas'], responseTime: 'Menos de 6 horas', completedProjectSamples: [{ name: 'Montaje de Estructura Metálica', category: 'Izaje Pesado' }], unavailableDates: [], status: 'active' },
  { id: 'p9', name: 'Topografía Digital Dominicana', province: 'La Altagracia', city: 'Punta Cana', avatarUrl: 'https://i.pravatar.cc/150?u=p9', rating: 4.9, reviewsCount: 55, verified: true, memberSince: '2021', spotlight: true, bio: 'Precisión y tecnología en cada levantamiento. Utilizamos drones y equipos de última generación para topografía, agrimensura y geodesia.', projectsCompleted: 75, skills: ['Levantamiento con Dron', 'Topografía GPS', 'Cálculo de Volumen', 'Agrimensura'], responseTime: 'Menos de 24 horas', completedProjectSamples: [{ name: 'Levantamiento para Desarrollo Turístico', category: 'Topografía' }], unavailableDates: [], status: 'active' },
  { id: 'p10', name: 'Alquileres de Andamios Seguros', province: 'Santo Domingo', city: 'Santo Domingo Norte', avatarUrl: 'https://i.pravatar.cc/150?u=p10', rating: 4.6, reviewsCount: 88, verified: false, memberSince: '2022', bio: 'Proveemos andamios que cumplen con todas las normas de seguridad industrial. Su seguridad en las alturas es nuestra prioridad.', projectsCompleted: 200, skills: ['Andamios Certificados', 'Montaje y Desmontaje', 'Asesoría en Seguridad'], responseTime: 'Menos de 8 horas', completedProjectSamples: [{ name: 'Fachada Edificio Corporativo', category: 'Andamiaje' }], unavailableDates: [], status: 'active' },
  { id: 'p11', name: 'Soluciones en Concreto bombeado', province: 'La Romana', city: 'La Romana', avatarUrl: 'https://i.pravatar.cc/150?u=p11', rating: 4.8, reviewsCount: 110, verified: true, memberSince: '2018', bio: 'Servicio de bombeo de concreto para losas, techos y estructuras. Llegamos a donde otros no pueden, optimizando el tiempo de vaciado.', projectsCompleted: 160, skills: ['Bombeo de Concreto', 'Concreto Premezclado', 'Logística de Vaciado'], responseTime: 'Menos de 4 horas', completedProjectSamples: [{ name: 'Vaciado de Losa - Centro Comercial', category: 'Bombeo de Concreto' }], unavailableDates: [], status: 'active' },
];
export const providers = initialProviders;

const reviews: Review[] = [
    { id: 'r1', author: 'Carlos Pérez', authorAvatarUrl: 'https://i.pravatar.cc/150?u=carlosperez', date: 'hace 2 semanas', rating: 5, comment: 'Excelente servicio, el equipo llegó a tiempo y en perfectas condiciones. Muy profesionales.' },
    { id: 'r2', author: 'Ana Gómez', authorAvatarUrl: 'https://i.pravatar.cc/150?u=anagomez', date: 'hace 1 mes', rating: 4, comment: 'La arquitecta Mendoza es increíble. Sus diseños son innovadores y funcionales. La recomiendo totalmente.' },
    { id: 'r3', author: 'Constructora XYZ', authorAvatarUrl: 'https://i.pravatar.cc/150?u=constructoraxyz', date: 'hace 3 meses', rating: 5, comment: 'Siempre alquilamos nuestras excavadoras con ellos. Precios competitivos y maquinaria de primera.' },
    { id: 'r4', author: 'Inmobiliaria Segura', authorAvatarUrl: 'https://i.pravatar.cc/150?u=inmobiliariasegura', date: 'hace 1 semana', rating: 5, comment: 'El cálculo estructural fue impecable. El Ing. Batista es un experto en la materia. Entrega a tiempo y con un nivel de detalle impresionante.' },
    { id: 'r5', author: 'Juan "El Maestro" Arias', authorAvatarUrl: 'https://i.pravatar.cc/150?u=juanarias', date: 'hace 2 días', rating: 4, comment: 'La mezcladora de concreto funcionó perfecto para la placa que vaciamos. El proceso de alquiler fue rápido y sin complicaciones.' },
    { id: 'r6', author: 'Desarrollos Urbanos SRL', authorAvatarUrl: 'https://i.pravatar.cc/150?u=desarrollosurbanos', date: 'hace 5 días', rating: 5, comment: 'El levantamiento topográfico fue preciso y entregado antes de la fecha límite. Vital para el inicio de nuestro proyecto.' },
    { id: 'r7', author: 'María Rodríguez', authorAvatarUrl: 'https://i.pravatar.cc/150?u=mariarodriguez', date: 'hace 1 mes', rating: 5, comment: 'El equipo de pintores fue muy limpio y profesional. Dejaron mi apartamento como nuevo.' },
    { id: 'r8', author: 'Ferretería Popular', authorAvatarUrl: 'https://i.pravatar.cc/150?u=ferretería', date: 'hace 2 meses', rating: 4, comment: 'El servicio de grúa fue esencial para descargar un contenedor pesado. Operador muy hábil.' },
];

const allListings: Listing[] = [
  { id: 'l1', title: 'Alquiler de Excavadora CAT 320D', category: 'Equipo', type: 'Excavadora', province: 'Santo Domingo', city: 'Santo Domingo Este', packages: [{tier: 'Básico', price: 350, features: ['Alquiler por 1 día (8 horas)', 'Operador certificado', 'Entrega en sitio (costo extra)']}, {tier: 'Estándar', price: 1600, features: ['Alquiler por 5 días', 'Operador certificado', 'Combustible para 40 horas']}, {tier: 'Premium', price: 6000, features: ['Alquiler por 1 mes (22 días)', 'Soporte 24/7', 'Mantenimiento preventivo incluido']}], rating: 4.8, reviewsCount: 75, imageUrl: 'https://picsum.photos/seed/excavator/800/600', gallery: ['https://picsum.photos/seed/excavator1/1200/800', 'https://picsum.photos/seed/excavator2/1200/800', 'https://picsum.photos/seed/excavator3/1200/800'], provider: providers[0], description: 'Potente excavadora CAT 320D ideal para proyectos de mediana a gran escala. Mantenimiento al día y lista para trabajar.', specs: { 'Modelo': 'CAT 320D', 'Capacidad del cucharón': '1.2 m³', 'Peso operativo': '21,000 kg', 'Potencia': '148 hp' }, reviews: reviews.slice(0,2) },
  { id: 'l2', title: 'Servicios de Arquitectura y Diseño', category: 'Profesional', type: 'Arquitecto', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 800, features: ['Diseño conceptual', '2 revisiones', 'Planos arquitectónicos básicos']}, {tier: 'Estándar', price: 2500, features: ['Diseño completo', '5 revisiones', 'Planos constructivos y renders 3D']}, {tier: 'Premium', price: 5000, features: ['Paquete Estándar', 'Supervisión de obra', 'Diseño de interiores incluido']}], rating: 4.9, reviewsCount: 42, imageUrl: 'https://picsum.photos/seed/architect/800/600', gallery: ['https://picsum.photos/seed/blueprint1/1200/800', 'https://picsum.photos/seed/blueprint2/1200/800', 'https://picsum.photos/seed/blueprint3/1200/800'], provider: providers[1], description: 'Ofrecemos servicios completos de arquitectura, desde el diseño conceptual hasta los planos constructivos finales. Especializados en residencias modernas y comerciales.', specs: { 'Especialidad': 'Diseño residencial y comercial', 'Software': 'AutoCAD, Revit, SketchUp', 'Experiencia': '12 años', 'Colegiatura': 'CODIA #12345' }, reviews: [reviews[1]] },
  { id: 'l3', title: 'Alquiler de Camión de Volteo 16m³', category: 'Equipo', type: 'Camión de Volteo', province: 'La Altagracia', city: 'Punta Cana', packages: [{tier: 'Básico', price: 200, features: ['Alquiler por 1 día', 'Conductor incluido']}, {tier: 'Estándar', price: 950, features: ['Alquiler por 5 días', 'Conductor incluido', 'Tarifa preferencial']}], rating: 4.6, reviewsCount: 58, imageUrl: 'https://picsum.photos/seed/dumptruck/800/600', gallery: ['https://picsum.photos/seed/dumptruck1/1200/800', 'https://picsum.photos/seed/dumptruck2/1200/800'], provider: providers[2], description: 'Camión de volteo de alta capacidad para movimiento de tierra, escombros y agregados. Disponible para proyectos a corto y largo plazo.', specs: { 'Capacidad': '16 m³', 'Marca': 'Mercedes-Benz', 'Tracción': '6x4', 'Disponibilidad': 'Inmediata' }, reviews: [reviews[2], reviews[0]] },
  { id: 'l4', title: 'Instalaciones Eléctricas y Plomería', category: 'Profesional', type: 'Electricista / Plomero', province: 'Distrito Nacional', city: 'Distrito Nacional', packages: [{tier: 'Básico', price: 50, features: ['Visita y diagnóstico', 'Reparaciones menores (hasta 1 hora)']}, {tier: 'Estándar', price: 200, features: ['Instalación de punto eléctrico/plomería', 'Materiales básicos incluidos']}, {tier: 'Premium', price: 800, features: ['Día completo de trabajo (8 horas)', 'Para proyectos o remodelaciones']}], rating: 4.7, reviewsCount: 95, imageUrl: 'https://picsum.photos/seed/plumber/800/600', gallery: ['https://picsum.photos/seed/plumber1/1200/800', 'https://picsum.photos/seed/electrician/1200/800'], provider: providers[3], description: 'Equipo de profesionales certificados para todo tipo de trabajos de plomería y electricidad en proyectos residenciales y comerciales. Garantizamos un trabajo seguro y de alta calidad.', specs: { 'Servicios': 'Instalaciones nuevas, reparaciones, mantenimiento', 'Certificaciones': 'SEC, ITLA', 'Area de Cobertura': 'Distrito Nacional y SDO', 'Garantía': '6 meses en todos los trabajos' }, reviews: reviews },
  { id: 'l5', title: 'Consultoría en Ingeniería Civil', category: 'Profesional', type: 'Ingeniero Civil', province: 'La Romana', city: 'La Romana', packages: [{tier: 'Básico', price: 120, features: ['Consulta por hora', 'Revisión de planos']}, {tier: 'Estándar', price: 500, features: ['Visita a obra y reporte técnico', 'Hasta 4 horas de consultoría']}], rating: 5.0, reviewsCount: 30, imageUrl: 'https://picsum.photos/seed/engineer/800/600', gallery: ['https://picsum.photos/seed/engineer1/1200/800', 'https://picsum.photos/seed/structure/1200/800'], provider: providers[4], description: 'Análisis y diseño estructural para todo tipo de edificaciones. Supervisión de obras y consultorías especializadas para garantizar la seguridad y eficiencia de su proyecto.', specs: { 'Especialidad': 'Diseño sísmico, Edificios de gran altura', 'Software': 'SAP2000, ETABS, SAFE', 'Experiencia': '20 años', 'Colegiatura': 'CODIA #54321' }, reviews: [reviews[3]] },
  { id: 'l6', title: 'Alquiler de Mezcladora de Concreto', category: 'Equipo', type: 'Herramienta', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 80, features: ['Alquiler por 1 día']}, {tier: 'Estándar', price: 350, features: ['Alquiler por 1 semana']}], rating: 4.6, reviewsCount: 150, imageUrl: 'https://picsum.photos/seed/mixer/800/600', gallery: ['https://picsum.photos/seed/mixer1/1200/800'], provider: providers[5], description: 'Mezcladora de concreto de 1.5 sacos, motor a gasolina. Ideal para pequeñas y medianas obras, vaciado de pisos, columnas y más.', specs: { 'Capacidad': '1.5 sacos', 'Motor': 'Gasolina 6.5 hp', 'Portabilidad': 'Ruedas neumáticas', 'Condición': 'Excelente' }, reviews: [reviews[4]] },
  { id: 'l7', title: 'Servicios de Pintura Profesional', category: 'Profesional', type: 'Pintor', province: 'Santo Domingo', city: 'Santo Domingo Oeste', packages: [{tier: 'Básico', price: 250, features: ['Pintura de 1 habitación (hasta 15m²)', 'Mano de obra']}, {tier: 'Estándar', price: 800, features: ['Pintura de apartamento completo (2 hab)', 'Mano de obra y reparaciones menores']}, {tier: 'Premium', price: 1500, features: ['Pintura de exterior de vivienda', 'Incluye preparación de superficies']}], rating: 4.8, reviewsCount: 65, imageUrl: 'https://picsum.photos/seed/painter/800/600', gallery: [], provider: providers[6], description: 'Servicios de pintura interior y exterior. Acabados de alta calidad, limpieza y puntualidad garantizadas.', specs: { 'Tipo de pintura': 'Acrílica, aceite, epóxica', 'Acabados': 'Mate, satinado, brillante' }, reviews: [reviews[6]] },
  { id: 'l8', title: 'Alquiler de Grúa Telescópica 30 Ton', category: 'Equipo', type: 'Grúa', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 500, features: ['Alquiler por 1 día (8 horas)', 'Operador certificado']}, {tier: 'Estándar', price: 2400, features: ['Alquiler por 1 semana (5 días)']}], rating: 4.7, reviewsCount: 40, imageUrl: 'https://picsum.photos/seed/crane/800/600', gallery: [], provider: providers[7], description: 'Grúa telescópica con capacidad de 30 toneladas, ideal para montaje de estructuras, carga y descarga de materiales pesados.', specs: { 'Capacidad': '30 Toneladas', 'Alcance': '40 metros', 'Marca': 'Grove' }, reviews: [reviews[7]] },
  { id: 'l9', title: 'Levantamiento Topográfico con Dron', category: 'Profesional', type: 'Topógrafo', province: 'La Altagracia', city: 'Punta Cana', packages: [{tier: 'Básico', price: 800, features: ['Terrenos de hasta 5,000 m²', 'Entrega de planos 2D']}, {tier: 'Estándar', price: 1500, features: ['Terrenos de hasta 20,000 m²', 'Planos 2D y curvas de nivel']}, {tier: 'Premium', price: 2800, features: ['Paquete Estándar', 'Modelo 3D del terreno', 'Cálculo de volumen']}], rating: 4.9, reviewsCount: 55, imageUrl: 'https://picsum.photos/seed/surveyor/800/600', gallery: [], provider: providers[8], description: 'Realizamos levantamientos topográficos de alta precisión utilizando drones y tecnología GPS.', specs: { 'Equipo': 'DJI Phantom 4 RTK', 'Precisión': '2-3 cm', 'Entregables': 'DWG, PDF, Nube de puntos' }, reviews: [reviews[5]] },
  { id: 'l10', title: 'Alquiler de Andamios Certificados', category: 'Equipo', type: 'Andamio', province: 'Santo Domingo', city: 'Santo Domingo Norte', packages: [{tier: 'Básico', price: 10, features: ['Precio por cuerpo de andamio por día']}, {tier: 'Estándar', price: 150, features: ['Paquete 10 cuerpos por 1 semana']}], rating: 4.6, reviewsCount: 88, imageUrl: 'https://picsum.photos/seed/scaffold/800/600', gallery: [], provider: providers[9], description: 'Alquiler de andamios tubulares tipo marco. Cumplen con todas las normativas de seguridad. Transporte e instalación opcional.', specs: { 'Tipo': 'Marco tubular', 'Material': 'Acero', 'Medidas': '1.5m x 1.5m' }, reviews: [] },
  { id: 'l11', title: 'Servicio de Bomba de Concreto', category: 'Equipo', type: 'Bomba de concreto', province: 'La Romana', city: 'La Romana', packages: [{tier: 'Básico', price: 300, features: ['Alquiler por día', 'Incluye 50m de tubería']}, {tier: 'Estándar', price: 450, features: ['Paquete Básico', 'Personal de operación incluido']}], rating: 4.8, reviewsCount: 110, imageUrl: 'https://picsum.photos/seed/pump/800/600', gallery: [], provider: providers[10], description: 'Bomba de concreto estacionaria para vaciado de losas, techos y estructuras en lugares de difícil acceso.', specs: { 'Capacidad': '40 m³/hora', 'Alcance horizontal': '120 metros' }, reviews: [] },
  { id: 'l12', title: 'Diseño de Interiores', category: 'Profesional', type: 'Diseñador de Interiores', province: 'Distrito Nacional', city: 'Distrito Nacional', packages: [{tier: 'Básico', price: 1200, features: ['Diseño conceptual 1 espacio', 'Moodboard y paleta de colores']}, {tier: 'Estándar', price: 3000, features: ['Diseño completo 1 espacio', 'Renders 3D y planos de mobiliario']}, {tier: 'Premium', price: 7000, features: ['Diseño de apartamento completo', 'Supervisión de ejecución']}], rating: 4.9, reviewsCount: 35, imageUrl: 'https://picsum.photos/seed/interiordesign/800/600', gallery: [], provider: providers[1], description: 'Transformamos tus espacios. Servicio completo de diseño de interiores.', specs: { 'Estilos': 'Moderno, minimalista, industrial', 'Software': '3ds Max, V-Ray' }, reviews: [] },
  { id: 'l13', title: 'Alquiler de Retroexcavadora (Pala)', category: 'Equipo', type: 'Retroexcavadora', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 280, features: ['Alquiler por 1 día', 'Operador incluido']}, {tier: 'Estándar', price: 1300, features: ['Alquiler por 5 días', 'Tarifa reducida']}], rating: 4.7, reviewsCount: 92, imageUrl: 'https://picsum.photos/seed/backhoe/800/600', gallery: [], provider: providers[0], description: 'Retroexcavadora versátil para excavación, zanjas y movimiento de materiales. Ideal para proyectos de construcción y agricultura.', specs: { 'Marca': 'John Deere', 'Modelo': '310L' }, reviews: [] },
  { id: 'l14', title: 'Alquiler de Compactadora (Rolillo)', category: 'Equipo', type: 'Compactadora', province: 'La Altagracia', city: 'Punta Cana', packages: [{tier: 'Básico', price: 150, features: ['Alquiler por 1 día']}, {tier: 'Estándar', price: 650, features: ['Alquiler por 1 semana']}], rating: 4.5, reviewsCount: 66, imageUrl: 'https://picsum.photos/seed/compactor/800/600', gallery: [], provider: providers[2], description: 'Compactadora de rodillo vibratorio para trabajos de asfaltado y compactación de suelos.', specs: { 'Tipo': 'Doble rodillo', 'Peso': '2.5 Ton' }, reviews: [] },
  { id: 'l15', title: 'Ebanistería y Carpintería a Medida', category: 'Profesional', type: 'Carpintero', province: 'Distrito Nacional', city: 'Distrito Nacional', packages: [{tier: 'Básico', price: 500, features: ['Diseño y fabricación de mueble pequeño', '(ej. mesa de noche)']}, {tier: 'Estándar', price: 2500, features: ['Diseño y fabricación de clóset mediano']}, {tier: 'Premium', price: 8000, features: ['Diseño y fabricación de cocina completa']}], rating: 4.9, reviewsCount: 78, imageUrl: 'https://picsum.photos/seed/carpenter/800/600', gallery: [], provider: providers[6], description: 'Fabricación de cocinas, closets, puertas y muebles a medida.', specs: { 'Especialidad': 'Cocinas modulares, muebles personalizados' }, reviews: [] },
  { id: 'l16', title: 'Alquiler de Generador Eléctrico 60KW', category: 'Equipo', type: 'Generador', province: 'Santo Domingo', city: 'Santo Domingo Este', packages: [{tier: 'Básico', price: 180, features: ['Alquiler por día']}, {tier: 'Estándar', price: 1000, features: ['Alquiler por semana', 'Incluye combustible inicial']}], rating: 4.8, reviewsCount: 105, imageUrl: 'https://picsum.photos/seed/generator/800/600', gallery: [], provider: providers[3], description: 'Generador eléctrico diésel insonorizado de 60KW. Ideal para eventos, construcciones o como respaldo energético.', specs: { 'Potencia': '60 KW', 'Fase': 'Trifásico', 'Marca': 'Cummins' }, reviews: [] },
  { id: 'l17', title: 'Supervisión de Obras Civiles', category: 'Profesional', type: 'Ingeniero Civil', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 100, features: ['Visita de supervisión por hora']}, {tier: 'Estándar', price: 1200, features: ['Paquete de 15 horas de supervisión mensual']}], rating: 5.0, reviewsCount: 25, imageUrl: 'https://picsum.photos/seed/supervisor/800/600', gallery: [], provider: providers[4], description: 'Supervisión y control de calidad en todas las fases de su proyecto de construcción, garantizando el cumplimiento de los planos y normativas vigentes.', specs: { 'Experiencia': '18 años', 'Reportes': 'Diarios y semanales' }, reviews: [] },
  { id: 'l18', title: 'Alquiler de Martillo Demoledor Eléctrico', category: 'Equipo', type: 'Herramienta', province: 'La Romana', city: 'La Romana', packages: [{tier: 'Básico', price: 50, features: ['Alquiler por 1 día']}, {tier: 'Estándar', price: 220, features: ['Alquiler por 1 semana']}], rating: 4.7, reviewsCount: 130, imageUrl: 'https://picsum.photos/seed/demolition/800/600', gallery: [], provider: providers[5], description: 'Potente martillo demoledor eléctrico para romper concreto, asfalto y roca. Incluye cincel y puntero.', specs: { 'Marca': 'Bosch', 'Potencia': '1750W' }, reviews: [] },
  { id: 'l19', title: 'Instalación de Sheetrock y Techos', category: 'Profesional', type: 'Instalador', province: 'La Altagracia', city: 'Punta Cana', packages: [{tier: 'Básico', price: 8, features: ['Instalación de material (precio por m²)']}, {tier: 'Estándar', price: 15, features: ['Instalación y acabado (masilla, lijado)']}], rating: 4.8, reviewsCount: 82, imageUrl: 'https://picsum.photos/seed/sheetrock/800/600', gallery: [], provider: providers[6], description: 'Instalación profesional de paredes de sheetrock, techos de PVC y plafones comerciales. Trabajo rápido y con acabados limpios.', specs: { 'Servicios': 'Paredes, techos, cornisas, diseños' }, reviews: [] },
  { id: 'l20', title: 'Alquiler de Miniexcavadora Bobcat', category: 'Equipo', type: 'Miniexcavadora', province: 'Santo Domingo', city: 'Santo Domingo Oeste', packages: [{tier: 'Básico', price: 250, features: ['Alquiler por 1 día', 'Operador incluido']}, {tier: 'Estándar', price: 1150, features: ['Alquiler por 5 días', 'Tarifa reducida']}], rating: 4.9, reviewsCount: 98, imageUrl: 'https://picsum.photos/seed/bobcat/800/600', gallery: [], provider: providers[0], description: 'Miniexcavadora ideal para trabajos en espacios reducidos, jardinería, zanjas para tuberías y demoliciones pequeñas.', specs: { 'Marca': 'Bobcat', 'Modelo': 'E35', 'Ancho': '1.5 m' }, reviews: [] },
  { id: 'l21', title: 'Planos Estructurales y Cálculo', category: 'Profesional', type: 'Ingeniero Estructural', province: 'Distrito Nacional', city: 'Distrito Nacional', packages: [{tier: 'Básico', price: 2000, features: ['Vivienda unifamiliar hasta 200 m²']}, {tier: 'Estándar', price: 4500, features: ['Edificio de apartamentos hasta 4 niveles']}, {tier: 'Premium', price: 9000, features: ['Proyectos comerciales o naves industriales']}], rating: 5.0, reviewsCount: 32, imageUrl: 'https://picsum.photos/seed/structural/800/600', gallery: [], provider: providers[4], description: 'Realizamos el cálculo y diseño de los planos estructurales para su proyecto, cumpliendo con las normativas sísmicas locales.', specs: { 'Software': 'ETABS, SAP2000', 'Normativa': 'Reglamento MOPC' }, reviews: [] },
  { id: 'l22', title: 'Alquiler de Torre de Iluminación', category: 'Equipo', type: 'Iluminación', province: 'La Altagracia', city: 'Bávaro', packages: [{tier: 'Básico', price: 100, features: ['Alquiler por día/noche']}, {tier: 'Estándar', price: 500, features: ['Alquiler por 1 semana']}], rating: 4.7, reviewsCount: 45, imageUrl: 'https://picsum.photos/seed/lighttower/800/600', gallery: [], provider: providers[2], description: 'Torre de iluminación con generador propio para trabajos nocturnos o en zonas sin energía eléctrica.', specs: { 'Focos': '4 x 1000W LED', 'Altura': '9 metros' }, reviews: [] },
  { id: 'l23', title: 'Servicios de Impermeabilización', category: 'Profesional', type: 'Impermeabilizador', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 12, features: ['Aplicación de sistema acrílico (precio por m²)']}, {tier: 'Estándar', price: 20, features: ['Aplicación de manto asfáltico (precio por m²)']}], rating: 4.8, reviewsCount: 70, imageUrl: 'https://picsum.photos/seed/waterproofing/800/600', gallery: [], provider: providers[6], description: 'Proteja su construcción de filtraciones. Aplicación profesional de sistemas de impermeabilización para techos, cisternas y muros.', specs: { 'Sistemas': 'Manto asfáltico, acrílicos, membranas', 'Garantía': 'Hasta 10 años' }, reviews: [] },
  { id: 'l24', title: 'Alquiler de Cortadora de Concreto', category: 'Equipo', type: 'Herramienta', province: 'Santo Domingo', city: 'Santo Domingo Este', packages: [{tier: 'Básico', price: 60, features: ['Alquiler por 1 día', 'Disco incluido']}, {tier: 'Estándar', price: 280, features: ['Alquiler por 1 semana']}], rating: 4.6, reviewsCount: 115, imageUrl: 'https://picsum.photos/seed/concretesaw/800/600', gallery: [], provider: providers[5], description: 'Cortadora de piso para juntas de dilatación o cortes en concreto y asfalto. Motor a gasolina.', specs: { 'Marca': 'Husqvarna', 'Profundidad de corte': '16 cm' }, reviews: [] },
  { id: 'l25', title: 'Diseño de Paisajismo y Jardinería', category: 'Profesional', type: 'Paisajista', province: 'La Romana', city: 'La Romana', packages: [{tier: 'Básico', price: 700, features: ['Diseño de jardín pequeño (hasta 50m²)']}, {tier: 'Estándar', price: 1800, features: ['Diseño de jardín mediano (hasta 200m²)', 'Incluye selección de plantas y riego']}], rating: 4.9, reviewsCount: 48, imageUrl: 'https://picsum.photos/seed/landscaping/800/600', gallery: [], provider: providers[1], description: 'Diseño y construcción de áreas verdes para proyectos residenciales y turísticos.', specs: { 'Especialidad': 'Jardines tropicales y sostenibles' }, reviews: [] },
  { id: 'l26', title: 'Alquiler de Camión Grúa (Hiab)', category: 'Equipo', type: 'Camión Grúa', province: 'Santiago', city: 'Licey al Medio', packages: [{tier: 'Básico', price: 250, features: ['Alquiler por 1 día', 'Operador incluido']}, {tier: 'Estándar', price: 1100, features: ['Alquiler por 5 días']}], rating: 4.8, reviewsCount: 63, imageUrl: 'https://picsum.photos/seed/hiab/800/600', gallery: [], provider: providers[7], description: 'Camión con brazo articulado para carga, descarga y posicionamiento de materiales en obra.', specs: { 'Capacidad de carga': '5 Toneladas', 'Alcance del brazo': '15 metros' }, reviews: [] },
  { id: 'l27', title: 'Gestión de Permisos de Construcción', category: 'Profesional', type: 'Gestor', province: 'Distrito Nacional', city: 'Distrito Nacional', packages: [{tier: 'Básico', price: 1000, features: ['Gestión para vivienda unifamiliar']}, {tier: 'Estándar', price: 3000, features: ['Gestión para proyecto comercial pequeño']}], rating: 4.9, reviewsCount: 90, imageUrl: 'https://picsum.photos/seed/permits/800/600', gallery: [], provider: providers[1], description: 'Nos encargamos de todo el proceso de tramitación y obtención de los permisos de construcción ante el ayuntamiento y obras públicas.', specs: { 'Gestión': 'Ayuntamientos, MOPC, Medio Ambiente' }, reviews: [] },
  { id: 'l28', title: 'Alquiler de Dumper o Carretilla Motorizada', category: 'Equipo', type: 'Dumper', province: 'La Altagracia', city: 'Bávaro', packages: [{tier: 'Básico', price: 90, features: ['Alquiler por 1 día']}, {tier: 'Estándar', price: 400, features: ['Alquiler por 1 semana']}], rating: 4.7, reviewsCount: 52, imageUrl: 'https://picsum.photos/seed/dumper/800/600', gallery: [], provider: providers[2], description: 'Dumper para transporte de materiales a corta distancia dentro de la obra. Ideal para espacios reducidos.', specs: { 'Capacidad': '1,500 kg', 'Tracción': '4x4' }, reviews: [] },
  { id: 'l29', title: 'Alquiler de Plataforma Elevadora (Tijera)', category: 'Equipo', type: 'Plataforma Elevadora', province: 'Santiago', city: 'Santiago de los Caballeros', packages: [{tier: 'Básico', price: 120, features: ['Alquiler por 1 día']}, {tier: 'Estándar', price: 550, features: ['Alquiler por 1 semana']}], rating: 4.8, reviewsCount: 77, imageUrl: 'https://picsum.photos/seed/lift/800/600', gallery: [], provider: providers[7], description: 'Plataforma elevadora tipo tijera eléctrica para trabajos en altura en interiores o superficies planas.', specs: { 'Altura de trabajo': '10 metros', 'Capacidad': '230 kg' }, reviews: [] },
  { id: 'l30', title: 'Instalación de Pisos y Revestimientos', category: 'Profesional', type: 'Instalador', province: 'Santo Domingo', city: 'Santo Domingo Oeste', packages: [{tier: 'Básico', price: 10, features: ['Instalación de cerámica/porcelanato (m²)']}, {tier: 'Estándar', price: 18, features: ['Instalación de mármol o formatos grandes (m²)']}], rating: 4.9, reviewsCount: 110, imageUrl: 'https://picsum.photos/seed/flooring/800/600', gallery: [], provider: providers[6], description: 'Instalación experta de todo tipo de pisos: porcelanato, cerámica, mármol, laminados y vinílicos. Precio por m²', specs: { 'Tipos': 'Porcelanato, cerámica, vinilo', 'Servicios': 'Instalación, nivelación, remoción' }, reviews: [] },
  { id: 'l31', title: 'Servicio de Soldadura Especializada', category: 'Profesional', type: 'Soldador', province: 'La Romana', city: 'La Romana', packages: [{tier: 'Básico', price: 55, features: ['Servicio por hora en taller']}, {tier: 'Estándar', price: 70, features: ['Servicio por hora en sitio del proyecto']}], rating: 4.8, reviewsCount: 68, imageUrl: 'https://picsum.photos/seed/welder/800/600', gallery: [], provider: providers[3], description: 'Soldador certificado para trabajos en estructuras metálicas, tuberías y reparaciones industriales.', specs: { 'Certificación': 'AWS D1.1', 'Materiales': 'Acero al carbono, inoxidable' }, reviews: [] },
];

export const mockListings = allListings;

export const mockBookings: Booking[] = [
    {
        id: 'b1',
        listing: allListings[2], // Camión de Volteo
        package: allListings[2].packages[1], // Estándar
        bookingDate: '2024-05-10',
        status: 'Completada',
        projectId: 'proj1',
    },
    {
        id: 'b2',
        listing: allListings[4], // Ingeniería Civil
        package: allListings[4].packages[0], // Básico
        bookingDate: '2024-06-20',
        status: 'Confirmada',
        projectId: 'proj1',
    }
];

export const mockTransactions: Transaction[] = [
    { id: 't1', booking: mockBookings[0], amount: mockBookings[0].package.price, date: '2024-05-10', status: 'Pagado' },
    { id: 't2', booking: mockBookings[1], amount: mockBookings[1].package.price, date: '2024-06-20', status: 'Pendiente de Liberación' },
];

export const mockProjects: Project[] = [
    {
        id: 'proj1',
        name: 'Construcción Villa Vista Hermosa',
        userId: 'u-client-1',
        bookings: mockBookings,
    }
];

export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        message: 'Tu pago por "Servicios de Arquitectura" ha sido procesado.',
        date: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        read: false,
    },
    {
        id: 'n2',
        message: 'Nuevo mensaje de Arq. Lucía Mendoza.',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        read: false,
    },
    {
        id: 'n3',
        message: 'Bienvenido a ConectaObra. ¡Completa tu perfil para empezar!',
        date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        read: true,
    }
];

export const mockConversations: Conversation[] = [
    {
        id: 'c1',
        client: mockUserProvider, // Provider can also be a client
        provider: providers[1], // Arq. Lucía Mendoza
        listing: allListings[1],
        messages: [
            { from: 'client', text: 'Hola Lucía, estoy interesado en tus servicios para una remodelación. ¿Podríamos conversar?', timestamp: '2024-07-20T10:00:00Z' },
            { from: 'provider', text: '¡Hola! Claro que sí. Con gusto te ayudo. ¿Qué tienes en mente?', timestamp: '2024-07-20T10:05:00Z' }
        ],
    },
    {
        id: 'c2',
        client: mockUserClient,
        provider: providers[0], // Construcciones Rápidas S.A.
        listing: allListings[0],
        messages: [
            { from: 'client', text: 'Buenos días, necesito alquilar la excavadora para la próxima semana. ¿Está disponible?', timestamp: '2024-07-19T09:30:00Z' },
        ],
    }
];

export const mockCategories: ServiceCategory[] = [
    { id: 'cat1', name: 'Maquinaria Pesada' },
    { id: 'cat2', name: 'Diseño y Planificación' },
    { id: 'cat3', name: 'Construcción y Oficios' },
    { id: 'cat4', name: 'Herramientas y Equipos' }
];

export const mockSkills: Skill[] = [
    { id: 'skill1', name: 'Diseño Arquitectónico' },
    { id: 'skill2', name: 'Renders 3D' },
    { id: 'skill3', name: 'Movimiento de Tierra' },
    { id: 'skill4', name: 'Instalaciones Eléctricas' }
];
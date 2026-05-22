import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ArrowUpRight, Star, ChefHat, Instagram, Facebook, Clock, ShoppingBag, CheckCircle2, Heart 
} from 'lucide-react';


const features = [
  {
    title: "Red Velvet Royal",
    description: "Capas esponjosas de cacao rojo profundo con nuestro frosting secreto de queso crema y vainilla.",
    price: "$65",
    img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=1000&auto=format&fit=crop", 
    color: "#fff1f2", 
    rotation: -2,
    floatingDelay: 0
  },
  {
    title: "Pistacho & Frambuesa",
    description: "Equilibrio perfecto. Mousse de pistacho siciliano con corazón vibrante de frambuesa fresca.",
    price: "$72",
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1000&auto=format&fit=crop", 
    color: "#f0fdf4", 
    rotation: 2,
    floatingDelay: 0.2
  },
  {
    title: "Triple Chocolate Noir",
    description: "Para los verdaderos amantes del cacao. 70% Cacao belga, bizcocho húmedo y ganache artesanal.",
    price: "$68",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop", 
    color: "#f8fafc", 
    rotation: -1.5,
    floatingDelay: 0.4
  },
  {
    title: "Colección Macarons",
    description: "Joyas comestibles en caja de colección. Sabores de Lavanda, Rosa, Limón Eureka y Caramelo Salado.",
    price: "$45",
    img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=1000&auto=format&fit=crop", 
    color: "#fff7ed", 
    rotation: 1.5,
    floatingDelay: 0.6
  }
];

const historySlides = [
  {
    year: "Desde 2015",
    title: "La Ciencia del Sabor",
    description: "Comenzamos en una pequeña cocina experimentando con texturas. Hoy, somos un laboratorio de sabores únicos.",
    img: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?q=80&w=800&auto=format&fit=crop"
  },
  {
    year: "Innovación Constante",
    title: "Texturas Infinitas",
    description: "Cada ingrediente es analizado para crear contrastes que desafían al paladar tradicional. Usamos técnicas de vanguardia.",
    img: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop"
  },
  {
    year: "Nuestro Legado",
    title: "Pasión Artesanal",
    description: "Fusionamos la precisión de la arquitectura con la calidez de la repostería clásica. Tradición que perdura.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
  }
];

// --- COMPONENTES ---

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 inset-x-0 z-50 p-6 flex justify-between items-center pointer-events-none text-rose-950"
    >
      <div className="pointer-events-auto font-display font-bold text-2xl tracking-tight">
        DULCE<span className="text-pink-500">.</span>
      </div>
      <div className="pointer-events-auto hidden md:flex gap-8 font-medium bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full shadow-sm border border-white/50">
        {['Menú', 'Historia', 'Ubicación'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} 
            className="hover:text-pink-600 transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>
      <div className="pointer-events-auto">
        <button className="bg-rose-950 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-pink-600 transition-all shadow-lg">
          <ShoppingBag size={18} /> Pedir
        </button>
      </div>
    </motion.nav>
  );
};

const Card = ({ i, title, description, price, img, color, rotation, progress, range, targetScale, floatingDelay }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'start start'] });
  const [isHovered, setIsHovered] = useState(false);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-4 snap-center perspective-[2000px]">
      <motion.div 
        initial={{ y: 200, opacity: 0, rotateX: 15 }}
        whileInView={{ 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          transition: { type: "spring", stiffness: 35, damping: 20, mass: 2 } 
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [rotation - 0.5, rotation + 0.5, rotation - 0.5],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatingDelay || i * 0.4,
          },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatingDelay || i * 0.4,
          }
        }}
        viewport={{ once: true, amount: 0.2 }}
        style={{ 
          scale, 
          backgroundColor: color, 
          top: `${60 + (i * 35)}px`, 
          transformStyle: "preserve-3d" 
        }} 
        className="relative flex flex-col md:flex-row h-[65vh] md:h-[550px] w-full max-w-6xl rounded-[3rem] p-6 md:p-12 origin-top shadow-2xl border border-white/80 overflow-hidden"
      >

        <motion.div 
          className="w-full md:w-1/2 h-1/2 md:h-full rounded-[2rem] overflow-hidden relative shadow-inner bg-white"
          style={{ transform: "translateZ(40px)" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            style={{ y: imageY, scale: 1.1 }} 
            animate={{
              scale: isHovered ? 1.25 : [1.1, 1.15, 1.1],
            }}
            transition={{
              scale: {
                duration: isHovered ? 0.7 : 3,
                ease: isHovered ? "easeOut" : "easeInOut",
                delay: isHovered ? 0 : floatingDelay || i * 0.4,
              }
            }}
            className="w-full h-[120%] -mt-[10%]"
          >
            <img 
              src={img} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
          />
          
          <motion.div 
            animate={{
              y: [0, -3, 0],
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatingDelay || i * 0.4,
              },
              scale: {
                duration: 0.3,
              }
            }}
            className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full font-display font-bold text-xl text-rose-600 shadow-sm z-10"
          >
            {price}
          </motion.div>
          

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg z-10"
          >
            <ArrowUpRight size={20} className="text-rose-600" />
          </motion.div>
        </motion.div>

        {/* Info con profundidad 3D */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:pl-16 space-y-6 md:space-y-8 text-rose-950" style={{ transform: "translateZ(70px)" }}>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.9]">
            {title}
          </h2>
          <p className="text-lg opacity-70 font-medium leading-relaxed">
            {description}
          </p>
          <div className="flex gap-4">
            <motion.button 
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (floatingDelay || i * 0.4) + 0.2,
                }
              }}
              className="bg-rose-950 text-white px-8 py-4 rounded-full font-bold hover:bg-pink-600 transition-colors flex items-center gap-2 group shadow-lg shadow-rose-900/10"
            >
              Ordenar Ahora <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
            </motion.button>
            <motion.button 
              animate={{
                y: [0, -6, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (floatingDelay || i * 0.4) + 0.3,
                },
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (floatingDelay || i * 0.4) + 0.3,
                }
              }}
              className="w-12 h-12 rounded-full border border-rose-200 flex items-center justify-center hover:bg-rose-100 hover:text-pink-600 transition-colors text-rose-300"
            >
              <Heart size={20} />
            </motion.button>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute w-1 h-1 rounded-full bg-pink-300/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: [null, `-${Math.random() * 50 + 20}px`],
                opacity: [0, 0.5, 0],
                x: [null, `calc(${Math.random() * 20 - 10}px + ${Math.random() * 100}%)`],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: idx * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const MapCard = () => (
  <div className="relative w-full h-[400px] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-inner border border-white/50 group">
    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Mapa" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
       <div className="relative group-hover:-translate-y-2 transition-transform duration-500">
         <span className="absolute -inset-6 bg-pink-500/20 rounded-full animate-ping"></span>
         <div className="bg-rose-600 text-white p-4 rounded-full shadow-2xl relative z-10">
           <MapPin size={28} />
         </div>
       </div>
    </div>
  </div>
);


const App = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % historySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div className="relative selection:bg-pink-200 selection:text-rose-900">

      <div className="noise-overlay"></div>
      
      <Navbar />

      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-pink-100/50 to-transparent rounded-full blur-[100px] -z-10"></div>
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center z-10 max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <span className="glass-panel px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-pink-600 flex items-center gap-2 shadow-sm">
                <Star size={12} className="fill-pink-600"/> Repostería de Autor
              </span>
            </div>
            <h1 className="text-[15vw] md:text-[11vw] leading-[0.85] font-black font-display tracking-tighter text-rose-950 mb-6 select-none uppercase">
              ARTE <br/> <span className="text-gradient">DULCE</span>
            </h1>
            <p className="text-xl md:text-2xl text-rose-900/60 font-medium max-w-xl mx-auto mb-12 italic">
              Donde la arquitectura se encuentra con el azúcar.
            </p>
            <div className="flex justify-center">
              <a href="#menu" className="bg-rose-950 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-600 transition-all shadow-xl flex items-center gap-2 group">
                Explorar Menú <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
              </a>
            </div>
         </motion.div>
      </header>

      <div className="py-10 bg-white/40 border-y border-white/60 backdrop-blur-sm overflow-hidden relative z-20">
        <div className="marquee-container">
          <motion.div 
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            className="marquee-content font-display text-3xl md:text-5xl font-medium tracking-wide text-rose-900/30 italic"
          >
             <span className="flex items-center gap-6">Recién Horneado <Star size={20} className="text-pink-300 fill-pink-300"/></span>
             <span className="flex items-center gap-6">Ingredientes 100% Orgánicos <Star size={20} className="text-pink-300 fill-pink-300"/></span>
             <span className="flex items-center gap-6">Arte Comestible <Star size={20} className="text-pink-300 fill-pink-300"/></span>
          </motion.div>
          <motion.div 
            animate={{
              x: ["100%", "0%"],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            className="marquee-content font-display text-3xl md:text-5xl font-medium tracking-wide text-rose-900/30 italic" 
            aria-hidden="true"
          >
             <span className="flex items-center gap-6">Recién Horneado <Star size={20} className="text-pink-300 fill-pink-300"/></span>
             <span className="flex items-center gap-6">Ingredientes 100% Orgánicos <Star size={20} className="text-pink-300 fill-pink-300"/></span>
             <span className="flex items-center gap-6">Arte Comestible <Star size={20} className="text-pink-300 fill-pink-300"/></span>
          </motion.div>
        </div>
      </div>

      <section id="historia" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-20 items-center min-h-[600px]">
          <div className="relative group h-[500px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentSlide} 
                initial={{ opacity: 0, scale: 1.1, x: -20 }} 
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: 0,
                }} 
                exit={{ opacity: 0, scale: 0.9, x: 20 }} 
                transition={{ 
                  duration: 0.8,
                }} 
                className="absolute inset-0"
              >
                <div className="absolute -inset-4 border border-rose-900/10 rounded-[2.5rem] rotate-3 transition-transform group-hover:rotate-0 duration-700"></div>
                <div className="h-full rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
                  <img src={historySlides[currentSlide].img} alt="Historia" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute -bottom-10 left-0 flex gap-2">
              {historySlides.map((_, idx) => ( 
                <div 
                  key={idx} 
                  className={`h-1 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-12 bg-pink-500' : 'w-4 bg-rose-200'}`} 
                /> 
              ))}
            </div>
          </div>
          
          <div className="space-y-8 relative">
            <div key={`text-${currentSlide}`} className="relative">
              <span className="text-pink-600 font-bold tracking-widest uppercase text-sm bg-pink-100 px-3 py-1 rounded-full w-fit block mb-4">
                {historySlides[currentSlide].year}
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-rose-950 leading-tight mb-6 uppercase">
                {historySlides[currentSlide].title.split(' ')[0]} <br/> 
                <span className="text-gradient italic">{historySlides[currentSlide].title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-xl text-rose-800/70 leading-relaxed max-w-md italic">
                {historySlides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* (STACKING CARDS)  */}
      <section id="menu" className="py-20 relative">
        <div className="text-center mb-4 px-4">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-rose-950 mb-2 uppercase">Obras Maestras</h2>
          <p className="text-xl text-rose-800/60 italic font-medium tracking-wide">Desliza para descubrir nuestra colección</p>
        </div>

        <div ref={container} className="relative pb-64 snap-y snap-mandatory h-full -mt-16">
          {features.map((feature, i) => {
            const targetScale = 1 - ((features.length - i) * 0.05); 
            return ( <Card key={i} i={i} {...feature} progress={scrollYProgress} range={[i * 0.25, 1]} targetScale={targetScale} /> )
          })}
        </div>
      </section>


      <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <h3 className="text-4xl font-display font-bold text-rose-950 uppercase">Favoritos Diarios</h3>
             <a href="#" className="text-pink-600 font-bold border-b-2 border-pink-200 hover:border-pink-600 transition-colors pb-1">Ver Menú Completo</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
             {[
               {name: "Croissant Almendra", price: "$45", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400"},
               {name: "Latte de Rosas", price: "$55", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400"},
               {name: "Tartaleta Frutal", price: "$60", img: "https://imgs.search.brave.com/D6G2Jd6v7uOnh62HVGGg0pEgF3pw8v1-FZIbXoVzXIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGVtb3NsYXZ1ZWx0/YWFsZGlhLmNvbS9z/aXRlcy9kZWZhdWx0/L2ZpbGVzL3RhcnRh/LWZydXRhbC5qcGc"},
               {name: "Cheesecake NY", price: "$75", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400"},
             ].map((item, idx) => (
               <div 
                 key={idx} 
                 className="group cursor-pointer relative"
                 onMouseEnter={() => setHoveredImageIndex(idx)}
                 onMouseLeave={() => setHoveredImageIndex(null)}
               >
                 <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-gray-100 relative shadow-sm">
                   <motion.img 
                     src={item.img} 
                     alt={item.name} 
                     className="w-full h-full object-cover"
                     animate={{
                       scale: hoveredImageIndex === idx ? 1.15 : 1,
                     }}
                     transition={{
                       duration: 0.7,
                       ease: "easeOut"
                     }}
                   />
                   
                   {/* Overlay de zoom */}
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: hoveredImageIndex === idx ? 1 : 0 }}
                     transition={{ duration: 0.3 }}
                     className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"
                   />
                   
                   <button className="absolute bottom-3 right-3 bg-white text-rose-950 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg transform translate-y-2 group-hover:translate-y-0 z-10">
                     <ArrowUpRight size={16} />
                   </button>
                 </div>
                 <div className="flex justify-between items-start">
                   <p className="font-bold text-rose-950 text-lg leading-tight uppercase">{item.name}</p>
                   <span className="text-sm bg-rose-100 px-2 py-1 rounded-lg text-rose-700 font-bold">{item.price}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
         <div className="grid lg:grid-cols-2 gap-8 md:gap-16 bg-white p-12 rounded-[3rem] shadow-xl border border-rose-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
           <div className="space-y-8 z-10 text-rose-950">
             <h2 className="text-5xl font-display font-bold uppercase tracking-tight leading-none">Visítanos <br/><span className="text-pink-500 italic lowercase font-medium">tu rincón favorito</span></h2>
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="bg-rose-50 p-4 rounded-2xl group-hover:bg-pink-100 transition-colors">
                    <MapPin size={24} className="text-pink-600"/>
                  </div>
                  <div>
                    <p className="font-bold uppercase text-sm tracking-widest mb-1">Dirección</p>
                    <p className="text-rose-800/70 font-medium">Av. Paseo de la Reforma 222, CDMX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="bg-rose-50 p-4 rounded-2xl group-hover:bg-pink-100 transition-colors">
                    <Clock size={24} className="text-pink-600"/>
                  </div>
                  <div>
                    <p className="font-bold uppercase text-sm tracking-widest mb-1">Horario</p>
                    <p className="text-rose-800/70 font-medium">Lun - Dom: 9:00 AM - 9:00 PM</p>
                  </div>
                </div>
             </div>
             <div className="group">
               <MapCard />
             </div>
           </div>
           
           <div className="bg-rose-50/80 backdrop-blur-sm p-12 rounded-[2.5rem] border border-rose-100 z-10">
             <h3 className="text-3xl font-display font-bold mb-6 uppercase">Pedidos Especiales</h3>
             <AnimatePresence mode="wait">
               {formStatus === 'success' ? (
                 <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ 
                   opacity: 1, 
                   scale: 1,
                 }} transition={{ 
                   opacity: { duration: 0.5 },
                   scale: { duration: 0.5 },
                 }} className="h-full flex flex-col items-center justify-center py-12 text-center text-green-600">
                   <CheckCircle2 size={64} className="mb-4" />
                   <h4 className="text-2xl font-bold uppercase">¡Mensaje Recibido!</h4>
                   <p className="mt-2 text-green-800/60 font-medium">Te contactaremos para hornear tus sueños.</p>
                 </motion.div>
               ) : (
                 <motion.form 
                   key="form" 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   onSubmit={handleFormSubmit} 
                   className="space-y-4 text-rose-950"
                 >
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-xs font-bold uppercase ml-1 tracking-widest">Nombre</label>
                       <input type="text" required className="input-field" />
                     </div>
                     <div>
                       <label className="text-xs font-bold uppercase ml-1 tracking-widest">Teléfono</label>
                       <input type="tel" required className="input-field" />
                     </div>
                   </div>
                   <div>
                     <label className="text-xs font-bold uppercase ml-1 tracking-widest">Email</label>
                     <input type="email" required className="input-field" />
                   </div>
                   <div>
                     <label className="text-xs font-bold uppercase ml-1 tracking-widest">Mensaje</label>
                     <textarea rows={4} required className="input-field resize-none"></textarea>
                   </div>
                   <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-rose-950 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all shadow-xl mt-4 uppercase tracking-widest">
                     {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Solicitud'}
                   </button>
                 </motion.form>
               )}
             </AnimatePresence>
           </div>
         </div>
      </section>

      <footer className="bg-rose-950 text-rose-100/80 py-16 border-t border-rose-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 text-center md:text-left">
           <div>
             <span className="font-display font-bold text-3xl text-white uppercase tracking-tighter">DULCE<span className="text-pink-500">.</span></span>
             <p className="mt-4 max-w-sm text-lg mx-auto md:mx-0 font-medium italic">Haciendo del mundo un lugar más dulce, un bocado artesanal a la vez.</p>
           </div>
           <div className="flex justify-center md:justify-end gap-6 items-center">
             <Instagram size={28} className="cursor-pointer hover:text-pink-500 transition-all hover:scale-110" />
             <Facebook size={28} className="cursor-pointer hover:text-pink-500 transition-all hover:scale-110" />
             <div className="bg-white/10 h-10 w-px mx-2"></div>
             <p className="text-xs font-bold uppercase tracking-[0.2em]">Est. 2015</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

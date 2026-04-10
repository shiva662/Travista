import { Link } from 'react-router';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { trips } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useRef } from 'react';
import { fadeInUp, fadeInDown, staggerContainer, staggerItem, popIn } from '../utils/animations';
import { getPointerTiltHandlers } from '../utils/pointerTilt';

export function Home() {
  const weekendTrips = trips.filter(t => t.category === 'weekend');
  const shortTrips = trips.filter(t => t.category === 'short');
  const longTrips = trips.filter(t => t.category === 'long');

  return (
    <div className="w-full">
      {/* Premium Hero Section */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden rounded-3xl mx-4 mt-2 shadow-2xl border border-white/20 group">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-[20s]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80)'
          }}
        ></div>
        {/* Dynamic Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90 backdrop-blur-[2px]"></div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 tracking-tight drop-shadow-2xl"
            variants={fadeInDown}
          >
            Explore <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite]">
              Incredible India
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            variants={fadeInUp}
          >
            Curated premium travel experiences across the diverse landscapes and rich heritage of Bharat
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <motion.a 
              href="#trips"
              variants={popIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-full shadow-[0_12px_28px_rgba(56,189,248,0.35)] hover:shadow-[0_16px_34px_rgba(56,189,248,0.45)] transition-all duration-300 hover:-translate-y-1">
                Begin Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.a>
            <motion.div
              variants={popIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/places">
                <Button size="lg" variant="outline" className="glass border-primary/30 hover:bg-primary/10 text-lg px-8 py-6 rounded-full transition-all duration-300">
                  Explore Places
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-muted-foreground">
          <span className="text-sm font-medium uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Trip Categories */}
      <div id="trips" className="page-container py-24">
        {/* Weekend Trips */}
        <TripSection
          icon="⛺"
          title="Weekend Escapes"
          description="Perfect premium getaways for 2-3 days"
          trips={weekendTrips}
        />

        {/* Short Trips */}
        <TripSection
          icon="🗺️"
          title="Immersive Journeys"
          description="Curated experiences for 4-5 days"
          trips={shortTrips}
        />

        {/* Long Trips */}
        <TripSection
          icon="🏔️"
          title="Grand Expeditions"
          description="Extended adventures for 6-7+ days"
          trips={longTrips}
        />
      </div>
    </div>
  );
}

interface TripSectionProps {
  icon: string;
  title: string;
  description: string;
  trips: typeof trips;
}

function TripSection({ icon, title, description, trips }: TripSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section 
      className="mb-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="flex items-end gap-6 mb-10"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="bg-primary/10 p-4 rounded-2xl border border-primary/20 backdrop-blur-md shadow-[0_10px_24px_rgba(56,189,248,0.18)]"
          variants={popIn}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-4xl drop-shadow-lg">{icon}</span>
        </motion.div>
        <motion.div variants={staggerItem}>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </motion.div>
      </motion.div>

      <div className="relative group">
        {/* Scroll buttons with glassmorphism */}
        <motion.button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-card rounded-full p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-primary/20 -ml-6 border border-white/20 hover:border-primary/50"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </motion.button>
        <motion.button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-card rounded-full p-4 shadow-[0_8px_18px_rgba(0,0,0,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hover:bg-primary/20 -mr-6 border border-white/20 hover:border-primary/50"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Trip cards container */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-8 pt-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

interface TripCardProps {
  trip: typeof trips[0];
}

function TripCard({ trip }: TripCardProps) {
  const tiltHandlers = getPointerTiltHandlers<HTMLDivElement>(8, 1.02);

  return (
    <motion.div 
      className="min-w-[380px] glass-card card-tilt-dynamic card-tilt-gloss rounded-3xl transition-all duration-500 overflow-hidden snap-start group border border-white/10 hover:border-primary/40 relative flex flex-col"
      {...tiltHandlers}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></motion.div>
      
      <motion.div className="relative h-72 overflow-hidden m-3 rounded-2xl card-3d-layer">
        <motion.img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          whileHover={{ scale: 1.12, rotate: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Dynamic Glass Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        ></motion.div>
        <motion.div 
          className="absolute top-4 right-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Badge className="glass border-white/20 text-foreground py-1.5 px-3 backdrop-blur-md font-medium shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
            <Calendar className="w-3 h-3 mr-1.5" />
            {trip.duration}
          </Badge>
        </motion.div>
      </motion.div>

      <motion.div 
        className="p-6 pt-2 flex-grow flex flex-col relative z-10 card-3d-layer"
        variants={staggerItem}
      >
        <motion.h3 
          className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
        >
          {trip.name}
        </motion.h3>
        <motion.p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed flex-grow">{trip.description}</motion.p>

        <Link to={`/trip/${trip.id}`} className="mt-auto block card-3d-deep">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" className="w-full rounded-xl glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn h-12 text-md font-medium shadow-[0_10px_20px_rgba(15,23,42,0.10)] hover:shadow-[0_14px_30px_rgba(56,189,248,0.25)]">
              Explore Details
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.span>
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

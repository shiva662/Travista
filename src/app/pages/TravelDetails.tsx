import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Calendar, Bookmark, Star, MapPin, Utensils } from 'lucide-react';
import { trips, hotels, restaurants, traditionalFoods } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  const [isSaved, setIsSaved] = useState(trip?.saved || false);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-12 text-center rounded-3xl animate-in zoom-in-95 duration-500">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Journey Not Found</h2>
          <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl">
            Return to Explorations
          </Button>
        </div>
      </div>
    );
  }

  const tripHotels = hotels[id || ''] || [];
  const tripRestaurants = restaurants[id || ''] || [];
  const tripFoods = traditionalFoods[id || ''] || [];

  return (
    <div className="min-h-screen pb-20">
      {/* Premium Header Image Gallery */}
      <div className="relative h-[60vh] min-h-[500px] w-full mt-4 max-w-[98%] mx-auto rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group animate-in slide-in-from-top-4 duration-700">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
        
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          title="Go back"
          className="absolute top-8 left-8 glass hover:bg-white/20 rounded-full p-4 shadow-lg transition-all border border-white/30 backdrop-blur-md group/btn"
        >
          <ArrowLeft className="w-6 h-6 text-white group-hover/btn:-translate-x-1 transition-transform" />
        </button>

        {/* Trip Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-foreground">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Badge className="glass bg-primary/20 text-black border-primary/30 mb-6 px-4 py-1.5 backdrop-blur-md text-sm font-bold tracking-wider rounded-full shadow-[0_10px_20px_rgba(56,189,248,0.25)]">
                <Calendar className="w-4 h-4 mr-2" />
                {trip.duration}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black mb-4 text-black">
                {trip.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {trip.description}
              </p>
            </div>
            
            <div className="md:w-72 glass-card p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl shrink-0 animate-in slide-in-from-right-8 duration-700 delay-300">
              <h3 className="text-lg font-bold mb-4 text-foreground text-center">Journey Quick Add</h3>
              <Button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full h-14 text-lg font-medium shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all hover:scale-105 ${
                  isSaved
                    ? 'glass text-primary border-primary/50 bg-primary/10'
                    : 'bg-gradient-to-r from-primary to-secondary text-white border-none'
                }`}
              >
                <Bookmark className={`mr-2 w-5 h-5 ${isSaved ? 'fill-current text-primary' : ''}`} />
                {isSaved ? 'Saved to Collection' : 'Save this Journey'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="glass-card rounded-[2rem] p-8 md:p-10 shadow-xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/20 p-3 rounded-xl border border-primary/30">
                  <Star className="w-6 h-6 text-primary fill-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">The Experience</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">{trip.overview}</p>
            </section>

            {/* Day-wise Itinerary */}
            <section className="glass-card rounded-[2rem] p-8 md:p-10 shadow-xl border border-white/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-secondary/20 p-3 rounded-xl border border-secondary/30">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Itinerary breakdown</h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {trip.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`} className="border border-white/10 bg-background/30 rounded-2xl px-6 mb-4 overflow-hidden shadow-sm data-[state=open]:shadow-md data-[state=open]:border-primary/30 transition-all">
                    <AccordionTrigger className="text-xl font-bold text-foreground hover:text-primary py-6">
                      <div className="flex items-center gap-4">
                        <span className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-sm">
                          D{day.day}
                        </span>
                        {day.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-4 pt-2 ml-[3.5rem] relative before:absolute before:inset-y-0 before:left-[-1.25rem] before:w-px before:bg-border">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-muted-foreground text-lg relative">
                            <span className="absolute left-[-1.5rem] top-2.5 w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(56,189,248,0.55)]"></span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Traditional Food - Glassy themed */}
            {tripFoods.length > 0 && (
              <section className="glass-card bg-gradient-to-br from-secondary/10 to-transparent rounded-[2rem] p-8 md:p-10 shadow-xl border border-secondary/20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-secondary/20 p-3 rounded-xl border border-secondary/40 shadow-[0_0_15px_rgba(244,114,182,0.3)]">
                    <Utensils className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Culinary Delights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tripFoods.map((food) => (
                    <div key={food.id} className="glass border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/40 transition-colors group bg-background/40">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                          <h3 className="font-bold text-xl text-foreground text-glow">{food.name}</h3>
                          <Badge className={food.type === 'veg' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 backdrop-blur-md' : 'bg-destructive/20 text-destructive border-destructive/50 backdrop-blur-md'}>
                            {food.type === 'veg' ? '🥬 Veg' : '🍖 Non-Veg'}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-muted-foreground text-sm leading-relaxed">{food.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Places to Stay & Eat */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Nearby Hotels */}
            {tripHotels.length > 0 && (
              <section className="glass-card rounded-[2rem] p-6 shadow-xl border border-white/10 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Premium Stays</h2>
                </div>
                <div className="space-y-4">
                  {tripHotels.map((hotel) => (
                    <div key={hotel.id} className="bg-background/40 border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group flex flex-col sm:flex-row lg:flex-col group/hotel">
                      <div className="sm:w-1/3 lg:w-full h-32 lg:h-40 overflow-hidden relative">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover group-hover/hotel:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-background/80 text-foreground border-white/10 backdrop-blur-md font-bold text-xs uppercase shadow-lg">
                            {hotel.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 sm:w-2/3 lg:w-full flex flex-col justify-center">
                        <h3 className="font-bold text-lg mb-1 text-foreground group-hover/hotel:text-primary transition-colors">{hotel.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {hotel.location}
                        </p>
                        <div className="flex items-center gap-1.5 mt-auto">
                          <Star className="w-4 h-4 fill-sky-400 text-sky-400" />
                          <span className="font-bold text-sm text-foreground">{hotel.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nearby Restaurants */}
            {tripRestaurants.length > 0 && (
              <section className="glass-card rounded-[2rem] p-6 shadow-xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/20 p-2.5 rounded-xl border border-secondary/30">
                    <Utensils className="w-5 h-5 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Top Restaurants</h2>
                </div>
                <div className="space-y-4">
                  {tripRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-background/40 border border-border rounded-xl p-4 hover:border-secondary/40 transition-colors flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold mb-1 text-foreground text-sm md:text-base">{restaurant.name}</h3>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-secondary/30 text-secondary">{restaurant.cuisine}</Badge>
                          <div className="flex items-center gap-1 text-sm bg-muted/50 px-2 py-0.5 rounded-md">
                            <Star className="w-3 h-3 fill-sky-400 text-sky-400" />
                            <span className="font-medium text-foreground">{restaurant.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
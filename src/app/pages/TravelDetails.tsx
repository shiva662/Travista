import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Bookmark, Star, MapPin, Utensils } from 'lucide-react';
import {
  trips,
  hotels,
  restaurants,
  traditionalFoods,
  combinedDestinationContentByKey,
  tripCombinedDestinationMap,
  type Food,
  type Hotel,
  type Restaurant,
} from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { savedTripsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

interface CulinaryCardProps {
  food: Food;
  onClick: (label: string) => void;
}

interface RestaurantCompactCardProps {
  restaurant: Restaurant;
  onClick: (label: string) => void;
}

interface HotelStayCardProps {
  hotel: Hotel;
  onClick: (label: string) => void;
}

const getFoodBadgeClass = (food: Food) => {
  const tag = String(food.category || '').toLowerCase();

  if (tag.includes('dessert')) {
    return 'bg-amber-500/20 text-amber-300 border-amber-500/50 backdrop-blur-md';
  }

  if (tag.includes('snack')) {
    return 'bg-orange-500/20 text-orange-300 border-orange-500/50 backdrop-blur-md';
  }

  return food.type === 'veg'
    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 backdrop-blur-md'
    : 'bg-destructive/20 text-destructive border-destructive/50 backdrop-blur-md';
};

function CulinaryCard({ food, onClick }: CulinaryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(food.name)}
      className="w-full text-left glass border border-white/10 rounded-2xl overflow-hidden hover:border-secondary/40 hover:shadow-[0_0_22px_rgba(56,189,248,0.18)] hover:-translate-y-0.5 transition-all duration-300 group bg-background/40 cursor-pointer"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-foreground text-glow">{food.name}</h3>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-muted-foreground text-sm leading-relaxed">{food.description}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge className={getFoodBadgeClass(food)}>
            {food.category || (food.type === 'veg' ? 'Veg' : 'Non-Veg')}
          </Badge>
          {food.locationTag && (
            <Badge
              variant="outline"
              className="text-[10px] uppercase tracking-wider border-primary/30 text-primary bg-primary/10"
            >
              {food.locationTag}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}

function RestaurantCompactCard({ restaurant, onClick }: RestaurantCompactCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(restaurant.name)}
      className="w-full text-left bg-background/40 border border-border rounded-xl p-4 hover:border-secondary/40 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)] transition-all duration-300 flex gap-4 items-center cursor-pointer"
    >
      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-secondary/25">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="font-bold mb-2 text-foreground text-sm md:text-base truncate">{restaurant.name}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider border-primary/30 text-primary bg-primary/10"
          >
            {restaurant.location}
          </Badge>
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-secondary/30 text-secondary">
            {restaurant.cuisine}
          </Badge>
          <div className="ml-auto flex items-center gap-1 text-sm bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-sky-400 text-sky-400" />
            <span className="font-semibold text-foreground">{restaurant.rating}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function HotelStayCard({ hotel, onClick }: HotelStayCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(hotel.name)}
      className="w-full text-left bg-background/40 border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col sm:flex-row lg:flex-col group/hotel cursor-pointer"
    >
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
      <div className="p-4 sm:w-2/3 lg:w-full flex flex-col justify-center gap-2">
        <h3 className="font-bold text-lg text-foreground group-hover/hotel:text-primary transition-colors">{hotel.name}</h3>
        <Badge
          variant="outline"
          className="text-[10px] uppercase tracking-wider border-primary/30 text-primary bg-primary/10 w-fit"
        >
          <MapPin className="w-3 h-3 mr-1" />
          {hotel.location}
        </Badge>
        <div className="flex items-center gap-1.5 mt-1 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full w-fit">
          <Star className="w-4 h-4 fill-sky-400 text-sky-400" />
          <span className="font-bold text-sm text-foreground">{hotel.rating}</span>
        </div>
      </div>
    </button>
  );
}

export function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const trip = trips.find(t => t.id === id);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingSaved, setIsCheckingSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isAuthFailure = (message?: string) => {
    const text = String(message || '').toLowerCase();
    return (
      text.includes('invalid or expired token') ||
      text.includes('no token provided') ||
      text.includes('authentication required')
    );
  };

  const handleAuthFailure = (message?: string) => {
    if (!isAuthFailure(message)) return false;
    toast.error('Session expired. Please log in again.');
    logout();
    navigate('/login', { replace: true });
    return true;
  };

  useEffect(() => {
    if (!trip || !isLoggedIn) {
      setIsSaved(false);
      return;
    }

    const checkSavedStatus = async () => {
      setIsCheckingSaved(true);
      try {
        const response = await savedTripsAPI.getMySavedTrips();
        if (handleAuthFailure(response?.message)) return;

        if (response.success) {
          const savedIds = Array.isArray(response.savedTrips)
            ? response.savedTrips.map((item: { tripId: string }) => String(item.tripId))
            : [];
          setIsSaved(savedIds.includes(trip.id));
        }
      } catch (_) {
        // Keep the page usable even if status check fails.
      } finally {
        setIsCheckingSaved(false);
      }
    };

    void checkSavedStatus();
  }, [isLoggedIn, trip?.id]);

  const handleToggleSavedTrip = async () => {
    if (!trip || isSaving) return;

    if (!isLoggedIn) {
      toast.error('Please log in to save this trip.');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        const response = await savedTripsAPI.deleteTrip(trip.id);
        if (handleAuthFailure(response?.message)) return;

        if (response.success || response.status === 404) {
          setIsSaved(false);
          toast.success(response.status === 404 ? 'Trip already removed.' : 'Trip removed from My Trips.');
          return;
        }

        toast.error(response.message || 'Failed to remove trip.');
        return;
      }

      const response = await savedTripsAPI.saveTrip(trip.id);
      if (handleAuthFailure(response?.message)) return;

      if (response.success) {
        setIsSaved(true);
        toast.success('Trip saved to My Trips.');
        return;
      }

      if (response.status === 409) {
        setIsSaved(true);
        toast.info(response.message || 'Trip already saved.');
        return;
      }

      toast.error(response.message || 'Failed to save trip.');
    } catch (_) {
      toast.error('Network error while saving trip. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCardClick = (label: string) => {
    toast.info(`${label} details coming soon.`);
  };

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

  const combinedDestinationKey = id ? tripCombinedDestinationMap[id] : undefined;
  const combinedDestinationContent = combinedDestinationKey
    ? combinedDestinationContentByKey[combinedDestinationKey]
    : undefined;
  const tripHotels = combinedDestinationContent?.premiumStays ?? hotels[id || ''] ?? [];
  const tripRestaurants = combinedDestinationContent?.restaurants ?? restaurants[id || ''] ?? [];
  const tripFoods = combinedDestinationContent?.culinaryDelights ?? traditionalFoods[id || ''] ?? [];

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
                onClick={handleToggleSavedTrip}
                disabled={isSaving || isCheckingSaved}
                className={`w-full h-14 text-lg font-medium shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all hover:scale-105 ${
                  isSaved
                    ? 'glass text-primary border-primary/50 bg-primary/10'
                    : 'bg-gradient-to-r from-primary to-secondary text-white border-none'
                }`}
              >
                <Bookmark className={`mr-2 w-5 h-5 ${isSaved ? 'fill-current text-primary' : ''}`} />
                {isCheckingSaved ? 'Checking...' : isSaving ? 'Updating...' : isSaved ? 'Saved to Collection' : 'Save this Journey'}
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
                <h2 className="text-3xl font-bold text-foreground">Itinerary Breakdown</h2>
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
                    <CulinaryCard key={food.id} food={food} onClick={handleCardClick} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Places to Stay & Eat */}
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:sticky lg:top-24">
            
            {/* Nearby Hotels */}
            {tripHotels.length > 0 && (
              <section className="glass-card rounded-[2rem] p-6 shadow-xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/20 p-2.5 rounded-xl border border-primary/30">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Premium Stays</h2>
                </div>
                <div className="space-y-4">
                  {tripHotels.map((hotel) => (
                    <HotelStayCard
                      key={hotel.id}
                      hotel={hotel}
                      onClick={handleCardClick}
                    />
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
                    <RestaurantCompactCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      onClick={handleCardClick}
                    />
                  ))}
                </div>
              </section>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
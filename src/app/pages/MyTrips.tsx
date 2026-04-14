import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Calendar, ArrowRight, Bookmark, CheckCircle2, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { trips } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { savedTripsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface SavedTripRecord {
  tripId: string;
  timestamp: string;
}

export function MyTrips() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const [savedTripIds, setSavedTripIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [removingTripId, setRemovingTripId] = useState<string | null>(null);

  const cardDelayClasses = [
    'my-trips-delay-0',
    'my-trips-delay-100',
    'my-trips-delay-200',
    'my-trips-delay-300',
    'my-trips-delay-400',
    'my-trips-delay-500',
  ];

  const savedTrips = useMemo(() => {
    return trips.filter((trip) => savedTripIds.includes(trip.id));
  }, [savedTripIds]);

  const completedTrips = useMemo(() => {
    return savedTrips.filter((trip) => Boolean(trip.completed));
  }, [savedTrips]);

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

  const fetchSavedTrips = async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    setError('');

    try {
      const response = await savedTripsAPI.getMySavedTrips();
      if (handleAuthFailure(response?.message)) return;

      if (response.success) {
        const ids = Array.isArray(response.savedTrips)
          ? (response.savedTrips as SavedTripRecord[]).map((item) => String(item.tripId))
          : [];
        setSavedTripIds(ids);
        return;
      }

      setError(response.message || 'Failed to load My Trips');
    } catch (_) {
      setError('Unable to load trips right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setSavedTripIds([]);
      return;
    }

    void fetchSavedTrips();
  }, [isLoggedIn]);

  const handleRemoveTrip = async (tripId: string) => {
    if (removingTripId) return;

    const previousIds = [...savedTripIds];
    setRemovingTripId(tripId);
    setSavedTripIds((current) => current.filter((id) => id !== tripId));

    try {
      const response = await savedTripsAPI.deleteTrip(tripId);
      if (handleAuthFailure(response?.message)) return;

      if (response.success || response.status === 404) {
        toast.success(response.status === 404 ? 'Trip already removed.' : 'Trip removed from My Trips.');
        return;
      }

      setSavedTripIds(previousIds);
      setError(response.message || 'Failed to remove trip');
      toast.error(response.message || 'Failed to remove trip');
    } catch (_) {
      setSavedTripIds(previousIds);
      setError('Network error while removing trip');
      toast.error('Network error while removing trip');
    } finally {
      setRemovingTripId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="glass-card rounded-3xl p-10 border border-white/10 text-center max-w-xl w-full">
          <h2 className="text-3xl font-bold text-foreground mb-4">Please log in to view My Trips</h2>
          <p className="text-muted-foreground mb-8">Your saved journeys are available after login.</p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground h-12 px-8 rounded-xl">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen py-16">
      <div className="mb-12 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          My Journeys
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Track your saved inspiration and completed adventures across Incredible India
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 glass border-l-4 border-destructive text-destructive rounded-xl shadow-lg max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-5" />
          <p className="text-lg text-primary font-medium">Loading your saved trips...</p>
        </div>
      )}

      {!loading && (
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 glass h-auto p-1.5 rounded-2xl border border-white/10">
              <TabsTrigger
                value="saved"
                className="flex min-w-0 h-auto min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm leading-tight data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
              >
                <Bookmark className="w-4 h-4" />
                Saved Trips ({savedTrips.length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="flex min-w-0 h-auto min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm leading-tight data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Completed ({completedTrips.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="animate-in fade-in zoom-in-95 duration-500">
              {savedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {savedTrips.map((trip, index) => (
                    <div key={trip.id} className={`animate-in fade-in slide-in-from-bottom-8 ${cardDelayClasses[index % cardDelayClasses.length]}`}>
                      <TripCard
                        trip={trip}
                        status="saved"
                        isRemoving={removingTripId === trip.id}
                        onRemove={() => handleRemoveTrip(trip.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Bookmark className="w-16 h-16 text-primary" />}
                  title="No saved trips yet"
                  description="Save a trip from the trip details page and it will appear here instantly."
                  actionLabel="Explore Trips"
                  actionLink="/"
                />
              )}
            </TabsContent>

            <TabsContent value="completed" className="animate-in fade-in zoom-in-95 duration-500">
              {completedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedTrips.map((trip, index) => (
                    <div key={trip.id} className={`animate-in fade-in slide-in-from-bottom-8 ${cardDelayClasses[index % cardDelayClasses.length]}`}>
                      <TripCard
                        trip={trip}
                        status="completed"
                        isRemoving={removingTripId === trip.id}
                        onRemove={() => handleRemoveTrip(trip.id)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<CheckCircle2 className="w-16 h-16 text-primary" />}
                  title="No completed trips yet"
                  description="Trips marked completed in your saved list will appear here."
                  actionLabel="Explore Trips"
                  actionLink="/"
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

interface TripCardProps {
  trip: typeof trips[0];
  status: 'saved' | 'completed';
  onRemove: () => void;
  isRemoving: boolean;
}

function TripCard({ trip, status, onRemove, isRemoving }: TripCardProps) {
  return (
    <div className="glass-card rounded-3xl transition-all duration-500 overflow-hidden group border border-white/10 hover:border-primary/40 hover:-translate-y-2 relative flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

      <div className="relative h-64 overflow-hidden m-3 rounded-2xl">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        <div className="absolute top-4 left-4">
          <Badge
            className={
              status === 'saved'
                ? 'bg-primary/90 hover:bg-primary shadow-[0_10px_20px_rgba(56,189,248,0.30)] text-primary-foreground border-none font-medium px-3 py-1.5 backdrop-blur-md'
                : 'bg-emerald-500/90 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] text-white border-none font-medium px-3 py-1.5 backdrop-blur-md'
            }
          >
            {status === 'saved' ? (
              <>
                <Bookmark className="w-3.5 h-3.5 mr-1.5 fill-current" />
                Saved
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Completed
              </>
            )}
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          <Badge className="glass border-white/20 text-foreground py-1.5 px-3 backdrop-blur-md font-medium shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
            <Calendar className="w-3 h-3 mr-1.5" />
            {trip.duration}
          </Badge>
        </div>
      </div>

      <div className="p-6 pt-2 flex flex-col flex-grow relative z-10">
        <div className="mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wider">
            {trip.category.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">{trip.name}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed flex-grow">{trip.description}</p>

        <div className="mt-auto flex items-center gap-3">
          <Link to={`/trip/${trip.id}`} className="flex-1">
            <Button variant="outline" className="w-full rounded-xl glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn h-12 text-md font-medium shadow-[0_10px_20px_rgba(15,23,42,0.10)] hover:shadow-[0_14px_30px_rgba(56,189,248,0.25)]">
              Explore Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            onClick={onRemove}
            disabled={isRemoving}
            className="h-12 px-4 rounded-xl border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
            title="Remove from My Trips"
          >
            {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionLink: string;
}

function EmptyState({ icon, title, description, actionLabel, actionLink }: EmptyStateProps) {
  return (
    <div className="glass-card rounded-3xl p-16 text-center border border-white/10 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/20 rounded-full blur-[40px]"></div>
      <div className="flex justify-center mb-8 relative z-10">
        <div className="bg-primary/20 p-6 rounded-3xl border border-primary/30 shadow-[0_12px_26px_rgba(56,189,248,0.22)]">
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-foreground mb-4 relative z-10">{title}</h3>
      <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed relative z-10">{description}</p>
      <Link to={actionLink} className="relative z-10">
        <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-[0_14px_30px_rgba(56,189,248,0.35)] text-primary-foreground h-14 px-8 rounded-xl text-lg font-medium transition-all hover:-translate-y-1">
          {actionLabel}
          <ArrowRight className="ml-2 w-5 h-5 animate-pulse" />
        </Button>
      </Link>
    </div>
  );
}

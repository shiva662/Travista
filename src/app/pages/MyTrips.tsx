import { Link } from 'react-router';
import { Calendar, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { trips } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function MyTrips() {
  const savedTrips = trips.filter(t => t.saved);
  const completedTrips = trips.filter(t => t.completed);

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

      <div className="max-w-7xl mx-auto">
        {/* Tabs with Glassmorphic theme */}
        <Tabs defaultValue="saved" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 glass p-1.5 rounded-2xl border border-white/10">
            <TabsTrigger 
              value="saved" 
              className="flex items-center gap-2 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
            >
              <Bookmark className="w-4 h-4" />
              Saved Trips ({savedTrips.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="flex items-center gap-2 rounded-xl py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed ({completedTrips.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="animate-in fade-in zoom-in-95 duration-500">
            {savedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedTrips.map((trip, index) => (
                  <div key={trip.id} className="animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 100}ms` }}>
                    <TripCard trip={trip} status="saved" />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Bookmark className="w-16 h-16 text-primary" />}
                title="No saved trips yet"
                description="Browse our trip catalog and save your favorites to start planning your Indian adventures!"
                actionLabel="Explore Trips"
                actionLink="/"
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="animate-in fade-in zoom-in-95 duration-500">
            {completedTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedTrips.map((trip, index) => (
                  <div key={trip.id} className="animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 100}ms` }}>
                    <TripCard trip={trip} status="completed" />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<CheckCircle2 className="w-16 h-16 text-primary" />}
                title="No completed trips yet"
                description="Mark your trips as completed to keep track of all the amazing places you've visited in India!"
                actionLabel="Discover Trips"
                actionLink="/"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface TripCardProps {
  trip: typeof trips[0];
  status: 'saved' | 'completed';
}

function TripCard({ trip, status }: TripCardProps) {
  return (
    <div className="glass-card rounded-3xl transition-all duration-500 overflow-hidden group border border-white/10 hover:border-primary/40 hover:-translate-y-2 relative flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
      
      <div className="relative h-64 overflow-hidden m-3 rounded-2xl">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Dynamic Overlay */}
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
        
        {status === 'completed' && (
          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center animate-in fade-in duration-500">
            <div className="glass rounded-full p-4 shadow-[0_0_30px_rgba(16,185,129,0.5)] border-2 border-emerald-400/50">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-2 flex flex-col flex-grow relative z-10">
        <div className="mb-3">
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wider">
            {trip.category.replace('-', ' ').toUpperCase()}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">{trip.name}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed flex-grow">{trip.description}</p>

        <Link to={`/trip/${trip.id}`} className="mt-auto block">
          <Button variant="outline" className="w-full rounded-xl glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn h-12 text-md font-medium shadow-[0_10px_20px_rgba(15,23,42,0.10)] hover:shadow-[0_14px_30px_rgba(56,189,248,0.25)]">
            Explore Journey
            <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
          </Button>
        </Link>
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
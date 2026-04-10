import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { placesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { MapPin, User } from 'lucide-react';

interface Place {
  _id: string;
  title: string;
  description: string;
  city: string;
  state: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  imageUrl?: string;
  createdAt: string;
}

export function SavedPlaces() {
  const navigate = useNavigate();
  const { isLoggedIn, user, token, setSaved } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) fetchSaved();
  }, [isLoggedIn]);

  const fetchSaved = async () => {
    setLoading(true);
    setError('');
    try {
      const url = 'http://localhost:5000/api/users/saved';
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      const contentType = res.headers.get('content-type') || '';

      if (!res.ok) {
        if (contentType.includes('application/json')) {
          const body = await res.json();
          setError(body.message || 'Failed to load saved places');
        } else {
          setError(`Server error: ${res.status} ${res.statusText}`);
        }
        setPlaces([]);
        return;
      }

      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          setPlaces(data.savedPlaces || []);
        } else {
          setError(data.message || 'Failed to load saved places');
        }
      } else {
        setError('Unexpected server response');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading saved places');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (placeId: string, saved: boolean) => {
    if (!token) return;
    if (saved) {
      await placesAPI.unsavePlace(placeId);
      setSaved(placeId, false);
    } else {
      await placesAPI.savePlace(placeId);
      setSaved(placeId, true);
    }
    fetchSaved();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <p className="glass-card p-8 rounded-xl text-xl text-muted-foreground w-full max-w-md text-center border-white/10">
          Please log in to view your saved places.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen py-16">
      <div className="mb-12 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          My Saved Places
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your personal collection of Indian wonders waiting to be explored.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 glass border-l-4 border-destructive text-destructive rounded-xl shadow-lg max-w-7xl mx-auto animate-in fade-in slide-in-from-top-4">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xl text-primary font-medium animate-pulse">Loading collection...</p>
        </div>
      )}

      {!loading && places.length === 0 && (
        <div className="glass-card rounded-3xl p-16 text-center border border-white/10 mt-8 max-w-3xl mx-auto">
          <div className="bg-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🤍</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">No places saved yet</h3>
          <p className="text-muted-foreground text-lg">Explore places and click the heart icon to start building your collection.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place, index) => {
          const isSaved = user?.savedPlaces?.includes(place._id);
          return (
            <div 
              key={place._id} 
              className="glass-card rounded-3xl overflow-hidden group border border-white/10 hover:border-primary/40 hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 flex flex-col cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/places/${place._id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate(`/places/${place._id}`);
                }
              }}
              aria-label={`Open details for ${place.title}`}
            >
              <div className="h-48 relative overflow-hidden bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-700">
                  {place.imageUrl ? (
                    <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" />
                  ) : (
                    '📍'
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleToggle(place._id, !!isSaved);
                  }}
                  className="absolute top-4 right-4 z-10 p-3 rounded-full glass border border-white/20 hover:scale-110 shadow-lg transition-all duration-300"
                  title={isSaved ? 'Unsave' : 'Save'}
                >
                  <HeartIcon filled={!!isSaved} />
                </button>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">{place.title}</h3>
                
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4 bg-muted/30 w-fit px-3 py-1.5 rounded-lg border border-border">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{place.city}, {place.state}</span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{place.description}</p>
                
                <div className="pt-4 border-t border-border flex items-center gap-2 text-muted-foreground text-xs font-medium mt-auto">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                    <User className="w-3 h-3" />
                  </div>
                  Added by {place.createdBy.name.split(' ')[0]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill={filled ? "#f472b6" : "none"} 
      stroke={filled ? "#f472b6" : "currentColor"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`w-5 h-5 transition-colors ${filled ? 'drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]' : ''}`}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

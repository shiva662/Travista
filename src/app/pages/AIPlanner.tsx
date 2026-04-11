import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, MapPin, Wallet, Compass, RefreshCcw, Save } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { aiAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

type Budget = 'low' | 'medium' | 'high';
type TravelType = 'adventure' | 'cultural' | 'relaxation' | 'mixed';

interface DayPlan {
  day: number;
  title: string;
  activities: string[];
}

interface TripPlan {
  destination: string;
  days: DayPlan[];
}

interface MatchedPlace {
  title: string;
  city: string;
  state: string;
}

const dayOptions = [2, 3, 4, 5, 6, 7];
const budgetOptions: Budget[] = ['low', 'medium', 'high'];
const typeOptions: TravelType[] = ['adventure', 'cultural', 'relaxation', 'mixed'];

export function AIPlanner() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const pageTopRef = useRef<HTMLDivElement | null>(null);

  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState<Budget>('medium');
  const [travelType, setTravelType] = useState<TravelType>('mixed');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [source, setSource] = useState<'ai' | 'cache' | ''>('');

  const [matchedPlaces, setMatchedPlaces] = useState<MatchedPlace[]>([]);
  const [plan, setPlan] = useState<TripPlan | null>(null);

  const knownTitles = useMemo(() => new Set(matchedPlaces.map((p) => p.title.toLowerCase())), [matchedPlaces]);

  const generatePlan = async (regenerate = false) => {
    setError('');
    setMessage('');

    if (!isLoggedIn) {
      setError('Please log in to generate AI plans.');
      pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    if (!destination.trim()) {
      setError('Destination is required.');
      pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setLoading(true);
    try {
      const response = await aiAPI.generatePlan({
        destination: destination.trim(),
        days,
        budget,
        travelType,
        regenerate
      });

      if (!response.success || !response.plan) {
        setPlan(null);
        setMatchedPlaces([]);
        setError(response.message || 'Could not generate trip plan');
        pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      setPlan(response.plan);
      setMatchedPlaces(response.matchedPlaces || []);
      setSource(response.source || 'ai');
    } catch (e: any) {
      setPlan(null);
      setMatchedPlaces([]);

      const authExpired = e?.status === 401 || e?.status === 403 || String(e?.message || '').toLowerCase().includes('expired token') || String(e?.message || '').toLowerCase().includes('invalid or expired token');
      if (authExpired) {
        logout();
        setError('Your session expired. Please log in again.');
        pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => navigate('/login'), 500);
        return;
      }

      setError(e.message || 'Failed to generate trip plan');
      pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = () => {
    if (!plan) return;

    const key = 'travista_saved_ai_trips';
    const existingRaw = localStorage.getItem(key);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    const entry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      budget,
      travelType,
      plan
    };

    localStorage.setItem(key, JSON.stringify([entry, ...existing].slice(0, 20)));
    setMessage('Trip plan saved successfully.');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <div ref={pageTopRef} />
      <div className="mb-10 text-center pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mb-4">
          AI Trip Planner
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practical, day-wise itineraries for India powered by AI + real places from your database.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
          {message}
        </div>
      )}

      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Destination
            </Label>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Jaipur, Rajasthan"
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="days">Days</Label>
            <select
              id="days"
              title="Select number of days"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-12 rounded-xl border border-border bg-background/50 px-3"
            >
              {dayOptions.map((d) => (
                <option key={d} value={d}>{d} days</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              Budget
            </Label>
            <select
              id="budget"
              title="Select budget level"
              value={budget}
              onChange={(e) => setBudget(e.target.value as Budget)}
              className="w-full h-12 rounded-xl border border-border bg-background/50 px-3"
            >
              {budgetOptions.map((b) => (
                <option key={b} value={b}>{b.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="travelType" className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              Travel Type
            </Label>
            <select
              id="travelType"
              title="Select travel type"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value as TravelType)}
              className="w-full h-12 rounded-xl border border-border bg-background/50 px-3"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2 flex items-end gap-3">
            <Button
              onClick={() => generatePlan(false)}
              disabled={loading}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {loading ? 'Generating Plan...' : 'Generate Plan'}
            </Button>

            <Button
              onClick={() => generatePlan(true)}
              disabled={loading || !plan}
              variant="outline"
              className="h-12 rounded-xl"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {Array.from({ length: Math.max(2, days) }).map((_, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="h-5 bg-muted/60 rounded w-40 mb-4" />
              <div className="h-4 bg-muted/50 rounded mb-2" />
              <div className="h-4 bg-muted/50 rounded mb-2" />
              <div className="h-4 bg-muted/50 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {plan && !loading && (
        <div className="mt-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/20 text-primary border border-primary/30">{plan.destination}</Badge>
            <Badge variant="outline" className="border-border">{days} days</Badge>
            <Badge variant="outline" className="border-border">{budget}</Badge>
            <Badge variant="outline" className="border-border">{travelType}</Badge>
            {source && (
              <Badge variant="outline" className="border-border">Source: {source.toUpperCase()}</Badge>
            )}
            <Button onClick={saveTrip} variant="outline" className="ml-auto rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              Save Trip
            </Button>
          </div>

          {!!matchedPlaces.length && (
            <div className="glass-card rounded-2xl p-4 border border-white/10">
              <h3 className="font-semibold text-foreground mb-3">Important Places</h3>
              <div className="flex flex-wrap gap-2">
                {matchedPlaces.slice(0, 14).map((p, idx) => (
                  <Badge key={`${p.title}-${idx}`} variant="outline" className="border-primary/30 text-primary">
                    {p.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Accordion type="single" collapsible className="glass-card rounded-2xl px-6 border border-white/10">
            {plan.days.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`}>
                <AccordionTrigger className="text-base font-semibold hover:no-underline">
                  <span>
                    Day {day.day}: {day.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {day.activities.map((activity, idx) => {
                      const normalizedActivity = activity.toLowerCase();
                      const isImportant = Array.from(knownTitles).some((name) => normalizedActivity.includes(name));

                      return (
                        <div key={idx} className="flex items-start gap-3 rounded-lg p-3 bg-background/40 border border-border">
                          <span className="text-primary font-semibold mt-0.5">{idx + 1}.</span>
                          <div className="flex-1 text-sm text-foreground">
                            {activity}
                            {isImportant && (
                              <Badge className="ml-2 bg-secondary/20 text-secondary border border-secondary/30">hotspot</Badge>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}

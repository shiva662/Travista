import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { placesAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Trash2, Edit2, MapPin, User, Search, Map, Plus, ChevronDown } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, popIn } from '../utils/animations';
import { getPointerTiltHandlers } from '../utils/pointerTilt';
import { toast } from 'sonner';

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

interface PlacesResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalPlaces: number;
  placesPerPage: number;
  places: Place[];
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export function Places() {
  const navigate = useNavigate();
  const { isLoggedIn, user, token, setSaved, refreshSaved } = useAuth();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalPlaces, setTotalPlaces] = useState(0);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: '',
    city: '',
    imageUrl: ''
  });
  const tiltHandlers = getPointerTiltHandlers<HTMLDivElement>(7, 1.02);

  useEffect(() => {
    fetchPlaces();
  }, [search, state, currentPage]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setState(stateInput);
      setCurrentPage(1);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, stateInput]);

  useEffect(() => {
    if (isLoggedIn && !user?.savedPlaces) {
      refreshSaved();
    }
  }, [isLoggedIn, user]);

  const fetchPlaces = async () => {
    setLoading(true);
    setError('');
    try {
      const response: PlacesResponse = await placesAPI.getAllPlaces({
        search: search || undefined,
        state: state || undefined,
        page: currentPage
      });

      if (response.success) {
        setPlaces(response.places);
        setTotalPages(response.totalPages);
        setTotalPlaces(response.totalPlaces);
      } else {
        setError('Failed to load places');
        toast.error('Failed to load places');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading places');
      toast.error(err.message || 'Error loading places');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to add a place');
      return;
    }

    if (!formData.title || !formData.description || !formData.state || !formData.city) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await placesAPI.addPlace(
        formData.title,
        formData.description,
        formData.state,
        formData.city,
        formData.imageUrl || undefined
      );

      if (response.place) {
        setMessage('Place added successfully!');
        toast.success('Place added successfully');
        setFormData({ title: '', description: '', state: '', city: '', imageUrl: '' });
        setShowAddForm(false);
        setCurrentPage(1);
        fetchPlaces();
      } else {
        setError(response.message || 'Failed to add place');
        toast.error(response.message || 'Failed to add place');
      }
    } catch (err: any) {
      setError(err.message || 'Error adding place');
      toast.error(err.message || 'Error adding place');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, imageUrl: String(reader.result || '') }));
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePlace = async (placeId: string) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;

    try {
      const response = await placesAPI.deletePlace(placeId);
      if (response.message) {
        setMessage('Place deleted successfully!');
        toast.success('Place deleted successfully');
        fetchPlaces();
      } else {
        setError('Failed to delete place');
        toast.error('Failed to delete place');
      }
    } catch (err: any) {
      setError(err.message || 'Error deleting place');
      toast.error(err.message || 'Error deleting place');
    }
  };

  const applyFilters = () => {
    setSearch(searchInput.trim());
    setState(stateInput);
    setCurrentPage(1);
  };

  return (
    <motion.div 
      className="page-container min-h-screen py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-12 text-center pt-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg"
          variants={fadeInUp}
        >
          Travista India Places
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
        >
          Discover the hidden gems and iconic landmarks of Incredible India, curated by travelers like you.
        </motion.p>
      </motion.div>

      {/* Messages */}
      {error && (
        <motion.div 
          className="mb-8 p-4 glass border-l-4 border-destructive text-destructive rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        </motion.div>
      )}
      {message && (
        <motion.div 
          className="mb-8 p-4 glass border-l-4 border-emerald-500 text-emerald-500 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">✨</span>
            <p className="font-medium">{message}</p>
          </div>
        </motion.div>
      )}

      {/* Add Place Button */}
      {isLoggedIn && (
        <motion.div 
          className="mb-8 flex justify-end"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_12px_24px_rgba(56,189,248,0.28)] hover:shadow-[0_14px_30px_rgba(56,189,248,0.36)] transition-all duration-300 rounded-full px-6 py-6 text-md"
            >
              <Plus className="w-5 h-5 mr-2" />
              {showAddForm ? 'Cancel Adding' : 'Add New Place'}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Add Place Form */}
      {showAddForm && isLoggedIn && (
        <motion.div 
          className="mb-12 glass-card rounded-3xl p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/20 p-3 rounded-xl border border-primary/30">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Share a New Place</h2>
          </div>
          <form onSubmit={handleAddPlace} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-muted-foreground font-medium ml-1">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Majestic Taj Mahal"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/30 transition-all h-12 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-muted-foreground font-medium ml-1">State</Label>
                  <div className="relative">
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-12 px-4 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all appearance-none text-foreground"
                      required
                    >
                      <option value="" className="bg-background">Select State</option>
                      {indianStates.map(s => (
                        <option key={s} value={s} className="bg-background">{s}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-muted-foreground font-medium ml-1">City</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Agra"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/30 transition-all h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-muted-foreground font-medium ml-1">Description</Label>
              <textarea
                id="description"
                placeholder="Share your experience and details about this place..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all text-foreground resize-none"
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-muted-foreground font-medium ml-1">Place Picture (Optional)</Label>
              <Input
                id="imageUrl"
                placeholder="Paste an image URL (https://...)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/30 transition-all h-12 rounded-xl"
              />
              <div className="text-sm text-muted-foreground px-1">or upload an image from your device</div>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="bg-background/50 border-border focus:border-primary/50 focus:ring-primary/30 transition-all h-12 rounded-xl file:mr-3 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1 file:text-primary"
              />

              {formData.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-border bg-background/40 max-w-sm">
                  <img
                    src={formData.imageUrl}
                    alt="Place preview"
                    className="w-full h-44 object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={() => setError('Image preview failed. Check the image URL or upload another file.')}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-[0_14px_30px_rgba(56,189,248,0.36)] text-primary-foreground h-14 rounded-xl text-lg font-medium transition-all hover:scale-[1.02]">
                Share Discovery
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Filters Section */}
      <motion.div 
        className="glass-card rounded-3xl p-6 md:p-8 mb-12 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-secondary/20 p-2.5 rounded-xl">
            <Search className="w-5 h-5 text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Find Your Next Destination</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 space-y-2">
            <Label htmlFor="search" className="text-muted-foreground">Search Places</Label>
            <div className="relative">
              <Input
                id="search"
                placeholder="Search by title or city..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 h-12 bg-background/50 border-border rounded-xl focus:ring-primary/30"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="md:col-span-4 space-y-2">
            <Label htmlFor="filterState" className="text-muted-foreground">Filter by State</Label>
            <div className="relative">
              <select
                id="filterState"
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                className="w-full h-12 pl-10 pr-10 bg-background/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none text-foreground transition-all"
              >
                <option value="" className="bg-background">Explore All States</option>
                {indianStates.map(s => (
                  <option key={s} value={s} className="bg-background">{s}</option>
                ))}
              </select>
              <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Button
              onClick={applyFilters}
              className="w-full h-12 bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30 rounded-xl transition-all duration-300 font-medium text-md"
            >
              Apply Filters
            </Button>
          </div>
        </div>
        </motion.div>

      {/* Results Info */}
      {!loading && (
        <motion.div 
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="outline" className="glass border-border text-muted-foreground px-4 py-1.5 rounded-full">
            Showing <span className="text-foreground font-bold mx-1">{places.length}</span> of <span className="text-foreground font-bold mx-1">{totalPlaces}</span>
          </Badge>
          {currentPage > 1 && (
            <Badge variant="outline" className="glass border-border text-muted-foreground px-4 py-1.5 rounded-full">
              Page {currentPage} of {totalPages}
            </Badge>
          )}
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <motion.div
          className="py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-3xl overflow-hidden border border-white/10 animate-pulse">
                <div className="h-56 bg-muted/60" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-1/3 rounded bg-muted/70" />
                  <div className="h-7 w-3/4 rounded bg-muted/70" />
                  <div className="h-4 w-1/2 rounded bg-muted/70" />
                  <div className="h-4 w-full rounded bg-muted/60" />
                  <div className="h-4 w-5/6 rounded bg-muted/60" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xl text-primary font-medium animate-pulse">Discovering places...</p>
        </motion.div>
      )}

      {/* Places Grid */}
      {!loading && places.length === 0 ? (
        <motion.div 
          className="glass-card rounded-3xl p-16 text-center border border-white/10 mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-muted/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Map className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">No places found</h3>
          <p className="text-muted-foreground text-lg">Try adjusting your search criteria or explore a different state.</p>
          <Button onClick={() => { setSearchInput(''); setStateInput(''); applyFilters(); }} variant="link" className="text-primary mt-4 text-lg">
            Clear Filters
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => {
            const creatorName = place.createdBy?.name || 'Unknown';
            const creatorId = place.createdBy?._id || '';
            const isSaved = user?.savedPlaces?.includes(place._id);
            return (
              <div 
                key={place._id}
                className="glass-card card-tilt-dynamic card-tilt-gloss rounded-3xl overflow-hidden group border border-white/10 hover:border-primary/40 transition-all duration-500 flex flex-col cursor-pointer"
                {...tiltHandlers}
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
                {/* Image Placeholder */}
                <div className="h-56 relative overflow-hidden bg-background card-3d-layer">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 flex items-center justify-center text-5xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {place.imageUrl ? (
                      <motion.img 
                        src={place.imageUrl} 
                        alt={place.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      '🏔️'
                    )}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                  
                  {isLoggedIn && (
                    <motion.button
                      onClick={async (event) => {
                        event.stopPropagation();
                        if (!token) return;
                        if (isSaved) {
                          await placesAPI.unsavePlace(place._id);
                          setSaved(place._id, false);
                          toast.success('Removed from saved places');
                        } else {
                          await placesAPI.savePlace(place._id);
                          setSaved(place._id, true);
                          toast.success('Place saved');
                        }
                      }}
                      className="absolute top-4 right-4 z-10 p-3 rounded-full glass border border-white/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(244,114,182,0.4)] transition-all duration-300 group/btn bg-background/20"
                      title={isSaved ? 'Remove from saved' : 'Save for later'}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HeartIcon filled={isSaved} />
                    </motion.button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col relative card-3d-layer">
                  <Badge className="absolute -top-4 left-6 bg-secondary/90 text-secondary-foreground border-none shadow-lg px-3 py-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text !text-white text-xs font-bold uppercase tracking-wider">
                    {place.state}
                  </Badge>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-foreground mb-2 mt-2 group-hover:text-primary transition-colors tracking-tight"
                    whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                  >
                    {place.title}
                  </motion.h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4 bg-muted/30 w-fit px-3 py-1.5 rounded-lg border border-border">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{place.city}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{place.description}</p>
                  
                  <div className="pt-4 border-t border-border flex items-center justify-between mt-auto card-3d-deep">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
                        {creatorName.charAt(0).toUpperCase()}
                      </div>
                      By {creatorName.split(' ')[0]}
                    </div>

                    {/* Actions */}
                    {isLoggedIn && user?.id === creatorId && (
                      <div className="flex gap-2">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            alert('Edit feature coming soon!');
                          }}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                          title="Edit Place"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeletePlace(place._id);
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                          title="Delete Place"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <motion.div 
          className="mt-16 flex justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {currentPage > 1 && (
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              variant="outline"
              className="glass border-border hover:border-primary text-foreground rounded-xl"
            >
              ← Prev
            </Button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <Button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-12 h-12 rounded-xl text-lg font-medium transition-all ${
                pageNum === currentPage
                    ? 'bg-primary text-primary-foreground shadow-[0_10px_20px_rgba(56,189,248,0.30)] scale-110'
                  : 'glass border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {pageNum}
            </Button>
          ))}

          {currentPage < totalPages && (
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              variant="outline"
              className="glass border-border hover:border-primary text-foreground rounded-xl"
            >
              Next →
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Helper components
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

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useParams } from 'react-router';
import { MapPin, Calendar, User, ArrowLeft, Star, ImagePlus } from 'lucide-react';
import { placesAPI, reviewsAPI } from '../../services/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useAuth } from '../../context/AuthContext';
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

interface Review {
  _id: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: string;
  user?: {
    _id?: string;
    name?: string;
  };
}

export function PlaceDetails() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewSort, setReviewSort] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', imageUrl: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mapQuery = useMemo(() => {
    if (!place) return '';
    return encodeURIComponent(`${place.title}, ${place.city}, ${place.state}, India`);
  }, [place]);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!id) {
        setError('Invalid place ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const response = await placesAPI.getPlaceById(id);
        if (response?._id) {
          setPlace(response);
        } else {
          setError(response?.message || 'Place not found');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load place details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchReviews = async () => {
      const response = await reviewsAPI.getPlaceReviews(id, reviewSort);
      if (response?.success) {
        setReviews(response.reviews || []);
      }
    };

    fetchReviews();
  }, [id, reviewSort]);

  const handleReviewImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setReviewForm((prev) => ({ ...prev, imageUrl: String(reader.result || '') }));
    reader.readAsDataURL(file);
  };

  const handleAddReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!reviewForm.comment.trim()) {
      toast.error('Please write a comment for your review');
      return;
    }

    setSubmittingReview(true);
    const response = await reviewsAPI.addReview(id, reviewForm.rating, reviewForm.comment.trim(), reviewForm.imageUrl);
    setSubmittingReview(false);

    if (!response?.review) {
      toast.error(response?.message || 'Failed to submit review');
      return;
    }

    setReviewForm({ rating: 5, comment: '', imageUrl: '' });
    toast.success('Review submitted');
    const refreshed = await reviewsAPI.getPlaceReviews(id, reviewSort);
    if (refreshed?.success) setReviews(refreshed.reviews || []);
  };

  if (loading) {
    return (
      <div className="page-container min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg text-primary font-medium">Loading place details...</p>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="page-container min-h-screen py-16">
        <div className="glass-card max-w-2xl mx-auto rounded-3xl p-10 text-center border border-white/10">
          <p className="text-xl text-destructive mb-6">{error || 'Place not found'}</p>
          <Link to="/places">
            <Button variant="outline" className="rounded-xl">Back to Places</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container min-h-screen py-16">
      <div className="mb-8">
        <Link to="/places" className="inline-flex">
          <Button variant="outline" className="rounded-full glass border-primary/30 hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Places
          </Button>
        </Link>
      </div>

      <article className="glass-card rounded-3xl overflow-hidden border border-white/10">
        <div className="h-[340px] md:h-[460px] bg-muted relative">
          {place.imageUrl ? (
            <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10">🏔️</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6">
            <Badge className="mb-4 bg-primary/85 text-primary-foreground px-3 py-1.5 rounded-full">{place.state}</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">{place.title}</h1>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-muted/40 border border-border">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{place.city}, {place.state}</span>
            </div>
            <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-muted/40 border border-border">
              <User className="w-4 h-4 text-primary" />
              <span>By {place.createdBy.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-muted/40 border border-border">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{new Date(place.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{place.description}</p>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Map View</h2>
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                title="Place map"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <h2 className="text-2xl font-bold">Traveler Reviews</h2>
              <div className="flex items-center gap-2">
                <label htmlFor="reviewSort" className="text-sm text-muted-foreground">Sort by</label>
                <select
                  id="reviewSort"
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value as 'newest' | 'oldest' | 'highest' | 'lowest')}
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {isLoggedIn && (
              <form onSubmit={handleAddReview} className="glass rounded-2xl p-5 border border-border mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="rating" className="text-sm text-muted-foreground">Rating</label>
                    <select
                      id="rating"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                      className="mt-1 w-full h-10 rounded-lg border border-border bg-background px-3"
                    >
                      {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="reviewImage" className="text-sm text-muted-foreground">Review Image (optional)</label>
                    <Input id="reviewImage" type="file" accept="image/*" onChange={handleReviewImageUpload} className="mt-1 h-10" />
                  </div>
                </div>

                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder="How was your experience here?"
                  className="w-full min-h-24 rounded-xl border border-border bg-background px-4 py-3"
                  required
                />

                {reviewForm.imageUrl && (
                  <img src={reviewForm.imageUrl} alt="Review preview" className="w-full max-w-sm h-44 object-cover rounded-xl border border-border" loading="lazy" decoding="async" />
                )}

                <Button type="submit" disabled={submittingReview} className="rounded-xl">
                  {submittingReview ? 'Posting...' : 'Post Review'}
                </Button>
              </form>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground">No reviews yet. Be the first to share your experience.</p>
              ) : (
                reviews.map((review) => (
                  <article key={review._id} className="glass rounded-2xl p-5 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold">{review.user?.name || 'Traveler'}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-3">{review.comment}</p>
                    {review.imageUrl ? (
                      <img src={review.imageUrl} alt="Review" className="w-full md:w-72 h-44 object-cover rounded-xl border border-border" loading="lazy" decoding="async" />
                    ) : (
                      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground"><ImagePlus className="w-4 h-4" />No image attached</div>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

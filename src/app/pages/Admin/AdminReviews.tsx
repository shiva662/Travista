import { useEffect, useState } from 'react';
import { getAllReviews, deleteReview } from '../../services/adminApi';
import { Trash2, AlertCircle, Quote, Star } from 'lucide-react';

export const AdminReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedReview(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedReview) return;
    try {
      await deleteReview(selectedReview);
      setReviews(reviews.filter(r => r._id !== selectedReview));
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  if (loading) return <div className="text-neutral-400">Loading reviews...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Moderate Reviews</h1>
        <p className="text-neutral-400">Manage user feedback to ensure a safe and respectful platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 relative group flex flex-col">
            <div className="absolute top-4 right-4 text-neutral-800 group-hover:text-emerald-500/10 transition-colors">
              <Quote size={40} />
            </div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-sky-400 text-sky-400" : "fill-neutral-800 text-neutral-800"}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 font-medium bg-neutral-800 px-2 py-1 rounded-md">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-neutral-300 flex-1 mb-6 relative z-10 italic">
              "{review.comment}"
            </p>

            {review.imageUrl && (
              <img
                src={review.imageUrl}
                alt="Review attachment"
                className="w-full h-40 object-cover rounded-xl border border-neutral-800 mb-4"
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="flex items-center justify-between pt-4 border-t border-neutral-800 mt-auto">
              <div>
                <p className="text-sm font-bold text-white">{review.user?.name || 'Unknown User'}</p>
                <p className="text-xs text-neutral-500">on <span className="text-emerald-400 font-medium">{review.place?.title || 'Unknown Place'}</span></p>
              </div>
              <button
                onClick={() => confirmDelete(review._id)}
                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete Activity"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in pb-20">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 fill-mode-forwards">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4 mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-center text-white mb-2">Delete Review?</h3>
            <p className="text-center text-neutral-400 text-sm mb-6">
              This action cannot be undone. The review will be removed completely.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-lg shadow-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

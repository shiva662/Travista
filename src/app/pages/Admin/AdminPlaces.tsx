import { useEffect, useState } from 'react';
import { getAllPlaces, deletePlace } from '../../services/adminApi';
import { Trash2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const AdminPlaces = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const data = await getAllPlaces();
      setPlaces(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedPlace(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPlace) return;
    try {
      await deletePlace(selectedPlace);
      setPlaces(places.filter(p => p._id !== selectedPlace));
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to delete place", err);
    }
  };

  if (loading) return <div className="text-neutral-400">Loading places...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Manage Places</h1>
        <p className="text-neutral-400">Review and moderate user-submitted destinations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {places.map((place) => (
          <div key={place._id} className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10 flex flex-col">
            <div className="h-48 bg-neutral-800 relative overflow-hidden">
              {place.imageUrl ? (
                <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-600">
                  <ImageIcon size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md rounded-lg text-xs font-medium text-emerald-400 border border-emerald-500/20">
                  {place.city}, {place.state}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{place.title}</h3>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-1">
                {place.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                <div className="text-xs text-neutral-500">
                  By: <span className="text-neutral-300">{place.createdBy?.name || 'Unknown'}</span>
                </div>
                <button
                  onClick={() => confirmDelete(place._id)}
                  className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in pb-20">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4 mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-center text-white mb-2">Delete Place?</h3>
            <p className="text-center text-neutral-400 text-sm mb-6">
              This will permanently delete this place and all associated reviews.
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

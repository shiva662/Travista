import { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, User, MapPin } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { diaryPosts, currentUser } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export function TravelDiary() {
  const [posts, setPosts] = useState(diaryPosts);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (caption.trim() && selectedFile) {
      const newPost = {
        id: `p${posts.length + 1}`,
        username: currentUser.username,
        caption: caption.trim(),
        image: selectedFile,
        timestamp: 'Just now',
        location: location || 'India',
        userId: currentUser.id
      };
      setPosts([newPost, ...posts]);
      setCaption('');
      setSelectedFile(null);
      setLocation('');
    }
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  return (
    <div className="page-container min-h-screen py-16">
      <div className="mb-12 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          Travel Diary
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Chronicle and share your most incredible Indian travel experiences with the community.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Upload Section with Glass theme */}
        <div className="glass-card rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-8 md:p-10 mb-16 border border-white/10 relative overflow-hidden animate-in slide-in-from-top-8 duration-500">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/20 rounded-full blur-[40px]"></div>
          
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <div className="bg-primary/20 p-3 rounded-xl border border-primary/30">
              <ImageIcon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Share Your Experience</h2>
          </div>
          
          <div className="space-y-8 relative z-10">
            {/* Image Upload */}
            <div>
              <label
                htmlFor="file-upload"
                className={`
                  relative block border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
                  transition-all duration-300
                  ${selectedFile 
                    ? 'border-primary/50 bg-primary/10 shadow-[0_12px_24px_rgba(56,189,248,0.18)]' 
                    : 'border-white/20 bg-background/30 hover:border-primary/50 hover:bg-primary/5'
                  }
                `}
              >
                {selectedFile ? (
                  <div className="space-y-4 animate-in zoom-in duration-300">
                    <img
                      src={selectedFile}
                      alt="Preview"
                      className="max-h-72 mx-auto rounded-xl shadow-lg border border-white/10"
                    />
                    <p className="text-primary font-bold text-lg">Image attached & ready!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="bg-primary/20 p-5 rounded-full border border-primary/30 group-hover:scale-110 transition-transform">
                        <Upload className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-medium text-foreground">
                        Drag & drop or browse to upload
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        High quality visual memories only (PNG, JPG up to 10MB)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground ml-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="e.g., Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 h-14 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all text-foreground"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-muted-foreground ml-1">
                  Story
                </label>
                <Textarea
                  placeholder="Tell us about this beautiful moment..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="min-h-[56px] h-14 py-3.5 px-4 bg-background/50 border-border rounded-xl focus:border-primary/50 focus:ring-primary/30 transition-all text-foreground resize-none"
                />
              </div>
            </div>

            {/* Post Button */}
            <div className="flex gap-4 pt-2">
              <Button
                onClick={handlePost}
                disabled={!caption.trim() || !selectedFile}
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-[0_14px_30px_rgba(56,189,248,0.35)] text-primary-foreground h-14 px-8 rounded-xl text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none hover:-translate-y-1 flex-1 md:flex-none"
              >
                <ImageIcon className="mr-3 w-5 h-5" />
                Publish Memory
              </Button>
              {(caption || selectedFile || location) && (
                <Button
                  variant="outline"
                  className="glass border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground h-14 px-8 rounded-xl text-lg font-medium transition-all"
                  onClick={() => {
                    setCaption('');
                    setSelectedFile(null);
                    setLocation('');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold text-foreground">Community Diary</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
          </div>
          
          <Masonry columnsCount={3} gutter="24px" className="masonry-grid max-w-7xl mx-auto">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 border border-white/10 group mb-6 animate-in fade-in"
                style={{ animationDelay: `${(index % 6) * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"></div>
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Location tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="glass bg-background/80 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.3)] border border-white/20 backdrop-blur-md">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-bold text-foreground tracking-wide uppercase">{post.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 relative z-20 -mt-8 bg-gradient-to-t from-background/95 to-background/50 backdrop-blur-sm rounded-t-2xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg border-2 border-background">
                        <span className="text-white font-bold">{post.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-bold text-foreground sm:text-lg">{post.username}</p>
                        <p className="text-xs font-medium text-primary mt-0.5">{post.timestamp}</p>
                      </div>
                    </div>
                    {post.userId === currentUser.id && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed break-words">{post.caption}</p>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 640px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
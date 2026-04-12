import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function AboutUs() {
  return (
    <div className="page-container min-h-screen py-16">
      <div className="pt-4 md:pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full glass border border-white/20 px-4 py-2.5 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="mb-12 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          About Us
        </h1>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-3xl border border-white/10 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Travel planning is often scattered across different platforms, making it difficult for users to find everything they need in one place. This project aims to solve that by creating a simple and structured travel website.
          </p>

          <p>
            Our platform provides predefined travel itineraries for weekend, short, and long trips, making it easier for users to plan based on time and convenience. It also helps users discover nearby hotels, restaurants, and traditional food, giving a complete view of each destination.
          </p>

          <p>
            In addition, the travel diary feature allows users to capture and share their travel moments through photos and videos, creating a more interactive experience.
          </p>

          <p>
            Our aim is to make travel planning easier, more organized, and more enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
}

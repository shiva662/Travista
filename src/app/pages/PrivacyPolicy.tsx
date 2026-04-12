import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function PrivacyPolicy() {
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

      <div className="mb-10 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in pt-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-[gradientBG_5s_linear_infinite] mb-6 drop-shadow-lg">
          Privacy Policy
        </h1>
      </div>

      <div className="max-w-5xl mx-auto glass-card rounded-3xl border border-white/10 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-6 duration-500">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
          This Privacy Policy explains how our website collects, uses, and protects user information. By using this website, you agree to the terms described below.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Basic user details such as name and email during registration</li>
            <li>Travel-related data such as saved trips and preferences</li>
            <li>Photos and videos uploaded through the travel diary feature</li>
            <li>Basic usage data to improve website functionality</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            We do not collect sensitive personal information such as financial or payment details.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Data</h2>
          <p className="text-muted-foreground mb-3">The information collected is used to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide and maintain website functionality</li>
            <li>Display personalized content such as "My Trips"</li>
            <li>Enable users to upload and share travel diary posts</li>
            <li>Improve user experience and performance of the website</li>
            <li>Manage user accounts and activity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. User-Generated Content</h2>
          <p className="text-muted-foreground mb-3">
            Users may upload photos, videos, and captions as part of the travel diary feature.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>This content may be visible to other users of the platform</li>
            <li>Users are responsible for the content they upload</li>
            <li>Inappropriate or harmful content may be removed</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
          <p className="text-muted-foreground mb-3">
            We take reasonable steps to protect user data from unauthorized access, misuse, or loss.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Data is stored securely within the system</li>
            <li>Access to data is limited to necessary operations</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Sharing of Information</h2>
          <p className="text-muted-foreground mb-3">
            We do not sell, trade, or share user personal information with third parties.
          </p>
          <p className="text-muted-foreground">
            User-generated content (such as travel diary posts) may be visible within the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Usage Data</h2>
          <p className="text-muted-foreground mb-3">The website may use basic cookies or similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Maintain user sessions</li>
            <li>Improve performance and user experience</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            Users can control cookie settings through their browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">7. User Rights</h2>
          <p className="text-muted-foreground mb-3">Users have the ability to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Update their profile information</li>
            <li>Manage or delete their uploaded content</li>
            <li>Control how their data is displayed (future feature)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to This Privacy Policy</h2>
          <p className="text-muted-foreground mb-3">
            This Privacy Policy may be updated from time to time.
          </p>
          <p className="text-muted-foreground">Any significant changes will be reflected on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Information</h2>
          <p className="text-muted-foreground">
            If you have any questions or concerns regarding this Privacy Policy, you may contact the website administrator.
          </p>
        </section>
      </div>
    </div>
  );
}

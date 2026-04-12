import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function TermsOfService() {
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
          Terms of Service
        </h1>
      </div>

      <div className="max-w-5xl mx-auto glass-card rounded-3xl border border-white/10 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-in fade-in slide-in-from-bottom-6 duration-500">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
          These Terms of Service govern your use of this website. By accessing or using the platform, you agree to comply with these terms.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">1. Use of the Website</h2>
          <p className="text-muted-foreground mb-3">
            This website is designed to provide predefined travel itineraries, local discovery, and a travel diary feature.
          </p>
          <p className="text-muted-foreground mb-3">By using this website, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Use the platform for lawful purposes only</li>
            <li>Not misuse or disrupt the website functionality</li>
            <li>Provide accurate information when creating an account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">2. User Accounts</h2>
          <p className="text-muted-foreground mb-3">
            To access certain features, users may need to create an account.
          </p>
          <p className="text-muted-foreground mb-3">Users are responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Maintaining the confidentiality of their login credentials</li>
            <li>All activities performed under their account</li>
            <li>Providing accurate and updated information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">3. User-Generated Content</h2>
          <p className="text-muted-foreground mb-3">
            Users may upload photos, videos, and captions through the travel diary feature.
          </p>
          <p className="text-muted-foreground mb-3">By uploading content, you agree that:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>You own or have permission to share the content</li>
            <li>The content does not violate any laws or rights of others</li>
            <li>The platform may display your content to other users</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            We reserve the right to remove inappropriate or harmful content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">4. Travel Information Disclaimer</h2>
          <p className="text-muted-foreground mb-3">
            The website provides predefined travel plans, hotel suggestions, and food information for guidance purposes only.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Information may not always be accurate or up to date</li>
            <li>Users should verify details independently before traveling</li>
            <li>The platform is not responsible for travel-related decisions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">5. Third-Party Services</h2>
          <p className="text-muted-foreground mb-3">
            The website may display information from third-party sources such as hotels or restaurants.
          </p>
          <p className="text-muted-foreground mb-3">We do not:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Guarantee the accuracy of third-party information</li>
            <li>Take responsibility for services provided by third parties</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
          <p className="text-muted-foreground mb-3">We are not responsible for:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Any loss, damage, or inconvenience caused during travel</li>
            <li>Issues arising from the use of third-party services</li>
            <li>User-generated content posted by other users</li>
          </ul>
          <p className="text-muted-foreground mt-4">Use of the platform is at your own risk.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">7. Account Termination</h2>
          <p className="text-muted-foreground mb-3">We reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Suspend or terminate accounts that violate these terms</li>
            <li>Remove content that is inappropriate or harmful</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
          <p className="text-muted-foreground mb-3">
            These Terms of Service may be updated from time to time.
          </p>
          <p className="text-muted-foreground">
            Continued use of the website means you accept any updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact</h2>
          <p className="text-muted-foreground">
            For any questions regarding these Terms of Service, you may contact the website administrator.
          </p>
        </section>
      </div>
    </div>
  );
}

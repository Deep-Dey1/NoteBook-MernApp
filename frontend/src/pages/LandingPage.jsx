import { Link } from "react-router";
import { BookOpen, Lock, Zap, FileText, ArrowRight, Shield, Cloud } from "lucide-react";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="bg-base-300 backdrop-blur-lg bg-opacity-90 rounded-full shadow-2xl border border-base-content/20 px-6 py-3">
            <div className="flex items-center justify-between gap-8">
              <h1 className="text-2xl font-bold text-primary font-mono tracking-tight">
                NoteBook
              </h1>
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-ghost btn-sm rounded-full">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm rounded-full">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Ideas, Organized
            </h1>
            <p className="text-xl md:text-2xl text-base-content/70 mb-8">
              A simple, secure, and powerful note-taking application built for modern thinkers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-primary btn-lg rounded-full">
                Start Taking Notes
                <ArrowRight className="size-5" />
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg rounded-full">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why NoteBook?</h2>
          <p className="text-lg text-base-content/70">
            Everything you need to capture and organize your thoughts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BookOpen className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy to Use</h3>
              <p className="text-base-content/70">
                Intuitive interface designed for seamless note-taking. Create, edit, and organize your notes effortlessly.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Shield className="size-8 text-secondary" />
              </div>
              <h3 className="card-title">Secure & Private</h3>
              <p className="text-base-content/70">
                Your notes are protected with industry-standard encryption. OTP verification ensures account security.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Zap className="size-8 text-accent" />
              </div>
              <h3 className="card-title">Lightning Fast</h3>
              <p className="text-base-content/70">
                Built with modern technologies for blazing fast performance. Access your notes instantly.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FileText className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Rich Text Editor</h3>
              <p className="text-base-content/70">
                Write notes with a powerful editor. Format your content exactly the way you want it.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-secondary/10 p-4 rounded-full mb-4">
                <Cloud className="size-8 text-secondary" />
              </div>
              <h3 className="card-title">Cloud Sync</h3>
              <p className="text-base-content/70">
                Your notes are safely stored in the cloud. Access them from anywhere, anytime.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="card-body items-center text-center">
              <div className="bg-accent/10 p-4 rounded-full mb-4">
                <Lock className="size-8 text-accent" />
              </div>
              <h3 className="card-title">Password Protection</h3>
              <p className="text-base-content/70">
                Secure authentication with password reset via OTP. Your account is always protected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="card bg-gradient-to-r from-primary to-secondary shadow-2xl max-w-4xl mx-auto">
          <div className="card-body items-center text-center py-16">
            <h2 className="text-4xl md:text-5xl font-bold text-base-100 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-base-100/80 mb-8 max-w-2xl">
              Join thousands of users who trust NoteBook for their daily note-taking needs. 
              Sign up now and experience the future of note-taking.
            </p>
            <Link to="/register" className="btn btn-lg rounded-full bg-base-100 text-primary hover:bg-base-200 border-none">
              Create Free Account
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-base-content/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-base-content/70">
            © 2025 NoteBook. Built with ❤️ for productivity enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

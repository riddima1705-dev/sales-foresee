import { Link, useLocation } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-secondary/20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-primary-foreground tracking-tight">
              ForecastAI
            </span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-paragraph text-sm tracking-wide transition-colors ${
                isActive('/') 
                  ? 'text-limegreen' 
                  : 'text-softgray hover:text-primary-foreground'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/dashboard" 
              className={`font-paragraph text-sm tracking-wide transition-colors ${
                isActive('/dashboard') 
                  ? 'text-limegreen' 
                  : 'text-softgray hover:text-primary-foreground'
              }`}
            >
              DASHBOARD
            </Link>
            <Link 
              to="/forecasts" 
              className={`font-paragraph text-sm tracking-wide transition-colors ${
                isActive('/forecasts') 
                  ? 'text-limegreen' 
                  : 'text-softgray hover:text-primary-foreground'
              }`}
            >
              FORECASTS
            </Link>
            <Link 
              to="/scenarios" 
              className={`font-paragraph text-sm tracking-wide transition-colors ${
                isActive('/scenarios') 
                  ? 'text-limegreen' 
                  : 'text-softgray hover:text-primary-foreground'
              }`}
            >
              SCENARIOS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

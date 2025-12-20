export default function Footer() {
  return (
    <footer className="bg-primary border-t border-secondary/20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl font-bold text-secondary mb-4">
              ForecastAI
            </h3>
            <p className="font-paragraph text-sm text-softgray leading-relaxed">
              Advanced sales forecasting and demand prediction powered by AI and machine learning algorithms.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-base font-semibold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-paragraph text-sm text-softgray hover:text-limegreen transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/dashboard" className="font-paragraph text-sm text-softgray hover:text-limegreen transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/forecasts" className="font-paragraph text-sm text-softgray hover:text-limegreen transition-colors">
                  Sales Forecasts
                </a>
              </li>
              <li>
                <a href="/scenarios" className="font-paragraph text-sm text-softgray hover:text-limegreen transition-colors">
                  Scenario Analysis
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-base font-semibold text-primary-foreground mb-4">
              Features
            </h4>
            <ul className="space-y-2">
              <li className="font-paragraph text-sm text-softgray">
                Time Series Forecasting
              </li>
              <li className="font-paragraph text-sm text-softgray">
                Demand Prediction
              </li>
              <li className="font-paragraph text-sm text-softgray">
                Interactive Visualizations
              </li>
              <li className="font-paragraph text-sm text-softgray">
                Scenario Simulation
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary/20">
          <p className="font-paragraph text-sm text-softgray text-center">
            © {new Date().getFullYear()} ForecastAI. All rights reserved. Powered by advanced machine learning.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Package, MapPin, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { SalesForecasts, DemandPredictions } from '@/entities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

export default function ForecastsPage() {
  const [forecasts, setForecasts] = useState<SalesForecasts[]>([]);
  const [predictions, setPredictions] = useState<DemandPredictions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [forecastsResult, predictionsResult] = await Promise.all([
      BaseCrudService.getAll<SalesForecasts>('salesforecasts'),
      BaseCrudService.getAll<DemandPredictions>('demandpredictions', ['datasetid'])
    ]);
    
    setForecasts(forecastsResult.items);
    setPredictions(predictionsResult.items);
    setIsLoading(false);
  };

  const categories = ['all', ...new Set(forecasts.map(f => f.categoryName).filter(Boolean))];
  const regions = ['all', ...new Set(forecasts.map(f => f.regionName).filter(Boolean))];

  const filteredForecasts = forecasts.filter(forecast => {
    const categoryMatch = filterCategory === 'all' || forecast.categoryName === filterCategory;
    const regionMatch = filterRegion === 'all' || forecast.regionName === filterRegion;
    return categoryMatch && regionMatch;
  });

  const totalPredictedRevenue = filteredForecasts.reduce((sum, f) => sum + (f.predictedSalesValue || 0), 0);
  const avgForecastValue = filteredForecasts.length > 0 ? totalPredictedRevenue / filteredForecasts.length : 0;

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-secondary mb-4">
              Sales Forecasts
            </h1>
            <p className="font-paragraph text-lg text-softgray max-w-3xl">
              AI-powered predictions for future sales across products, categories, and regions based on historical patterns and market trends.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-secondary to-pastelpink p-8 rounded-sm"
            >
              <DollarSign className="w-10 h-10 text-primary-foreground mb-4" />
              <h3 className="font-heading text-sm text-limegreen tracking-[0.2em] uppercase mb-2">
                Total Predicted Revenue
              </h3>
              <p className="font-heading text-4xl font-black text-primary-foreground">
                ${totalPredictedRevenue.toLocaleString()}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-limegreen p-8 rounded-sm"
            >
              <TrendingUp className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-sm text-secondary tracking-[0.2em] uppercase mb-2">
                Active Forecasts
              </h3>
              <p className="font-heading text-4xl font-black text-secondary-foreground">
                {filteredForecasts.length}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-brightblue p-8 rounded-sm"
            >
              <Package className="w-10 h-10 text-primary-foreground mb-4" />
              <h3 className="font-heading text-sm text-primary-foreground tracking-[0.2em] uppercase mb-2">
                Average Forecast
              </h3>
              <p className="font-heading text-4xl font-black text-primary-foreground">
                ${avgForecastValue.toFixed(0)}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <Card className="bg-primary border-secondary/20 p-6">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="w-5 h-5 text-limegreen" />
                <h3 className="font-heading text-lg font-semibold text-primary-foreground">
                  Filter Forecasts
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-paragraph text-sm text-softgray mb-2 block">
                    Category
                  </label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="bg-primary border-secondary/20 text-primary-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="font-paragraph text-sm text-softgray mb-2 block">
                    Region
                  </label>
                  <Select value={filterRegion} onValueChange={setFilterRegion}>
                    <SelectTrigger className="bg-primary border-secondary/20 text-primary-foreground">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(reg => (
                        <SelectItem key={reg} value={reg}>
                          {reg === 'all' ? 'All Regions' : reg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Forecasts List */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-6">
              Forecast Details
            </h2>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="font-paragraph text-softgray">Loading forecasts...</p>
              </div>
            ) : filteredForecasts.length === 0 ? (
              <Card className="bg-primary border-secondary/20 p-12 text-center">
                <p className="font-paragraph text-lg text-softgray">
                  No forecasts available. Upload sales data to generate forecasts.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredForecasts.map((forecast, index) => (
                  <motion.div
                    key={forecast._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card className="bg-primary border-secondary/20 p-6 hover:border-limegreen/50 transition-colors">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-3 mb-3">
                            <Package className="w-5 h-5 text-brightblue mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-heading text-xl font-bold text-primary-foreground mb-1">
                                {forecast.productName || 'Product'}
                              </h3>
                              {forecast.categoryName && (
                                <span className="font-paragraph text-sm text-softgray">
                                  {forecast.categoryName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-limegreen" />
                            <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                              Predicted Sales
                            </span>
                          </div>
                          <p className="font-heading text-2xl font-bold text-limegreen">
                            ${(forecast.predictedSalesValue || 0).toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-pastelpink" />
                            <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                              Period
                            </span>
                          </div>
                          <p className="font-paragraph text-sm text-primary-foreground">
                            {forecast.forecastPeriodStartDate && format(new Date(forecast.forecastPeriodStartDate), 'MMM dd, yyyy')}
                            {' - '}
                            {forecast.forecastPeriodEndDate && format(new Date(forecast.forecastPeriodEndDate), 'MMM dd, yyyy')}
                          </p>
                        </div>

                        <div>
                          {forecast.regionName && (
                            <>
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="w-4 h-4 text-brightblue" />
                                <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                                  Region
                                </span>
                              </div>
                              <p className="font-paragraph text-sm text-primary-foreground">
                                {forecast.regionName}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Demand Predictions Section */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary mb-6">
              Demand Predictions
            </h2>
            {predictions.length === 0 ? (
              <Card className="bg-primary border-secondary/20 p-12 text-center">
                <p className="font-paragraph text-lg text-softgray">
                  No demand predictions available yet.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {predictions.map((prediction, index) => (
                  <motion.div
                    key={prediction._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-secondary/20 to-pastelpink/20 border-secondary/20 p-6 hover:border-limegreen/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <TrendingUp className="w-6 h-6 text-limegreen" />
                        {prediction.demandTrendCategory && (
                          <span className="font-paragraph text-xs px-3 py-1 bg-limegreen text-secondary-foreground rounded-sm">
                            {prediction.demandTrendCategory}
                          </span>
                        )}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary-foreground mb-3">
                        {prediction.productName || 'Product'}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-paragraph text-sm text-softgray">
                            Predicted Demand
                          </span>
                          <span className="font-heading text-lg font-bold text-brightblue">
                            {prediction.predictedDemandQuantity || 0} units
                          </span>
                        </div>
                        {prediction.trendImpactPercentage !== undefined && (
                          <div className="flex justify-between items-center">
                            <span className="font-paragraph text-sm text-softgray">
                              Trend Impact
                            </span>
                            <span className="font-heading text-lg font-bold text-pastelpink">
                              {prediction.trendImpactPercentage}%
                            </span>
                          </div>
                        )}
                        {prediction.predictionPeriodStart && (
                          <div className="pt-2 border-t border-secondary/20">
                            <span className="font-paragraph text-xs text-softgray">
                              {format(new Date(prediction.predictionPeriodStart), 'MMM dd')} - {prediction.predictionPeriodEnd && format(new Date(prediction.predictionPeriodEnd), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

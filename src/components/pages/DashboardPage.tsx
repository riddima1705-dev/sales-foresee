import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, Brain, BarChart3, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { SalesForecasts, DemandPredictions, UploadedSalesDatasets } from '@/entities';

export default function DashboardPage() {
  const [datasets, setDatasets] = useState<UploadedSalesDatasets[]>([]);
  const [forecasts, setForecasts] = useState<SalesForecasts[]>([]);
  const [predictions, setPredictions] = useState<DemandPredictions[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    const [datasetsResult, forecastsResult, predictionsResult] = await Promise.all([
      BaseCrudService.getAll<UploadedSalesDatasets>('uploadedsalesdatasets'),
      BaseCrudService.getAll<SalesForecasts>('salesforecasts'),
      BaseCrudService.getAll<DemandPredictions>('demandpredictions')
    ]);
    
    setDatasets(datasetsResult.items);
    setForecasts(forecastsResult.items);
    setPredictions(predictionsResult.items);
    setIsLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newDataset: UploadedSalesDatasets = {
      _id: crypto.randomUUID(),
      fileName: file.name,
      uploadDateTime: new Date().toISOString(),
      processingStatus: 'Processing',
      uploadedBy: 'Current User',
      fileSizeKB: Math.round(file.size / 1024),
      fileUrl: URL.createObjectURL(file)
    };

    await BaseCrudService.create('uploadedsalesdatasets', newDataset);
    
    // Simulate processing
    setTimeout(async () => {
      await BaseCrudService.update('uploadedsalesdatasets', {
        _id: newDataset._id,
        processingStatus: 'Completed'
      });
      loadDashboardData();
    }, 2000);
    
    loadDashboardData();
  };

  const totalForecasts = forecasts.length;
  const totalPredictions = predictions.length;
  const totalDatasets = datasets.length;
  const avgPredictedSales = forecasts.length > 0 
    ? forecasts.reduce((sum, f) => sum + (f.predictedSalesValue || 0), 0) / forecasts.length 
    : 0;

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-secondary mb-4">
              Dashboard
            </h1>
            <p className="font-paragraph text-lg text-softgray max-w-3xl">
              Monitor your forecasts, upload new datasets, and track prediction performance in real-time.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-limegreen" />
                <span className="font-heading text-3xl font-black text-primary-foreground">
                  {totalForecasts}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-primary-foreground">
                Total Forecasts
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-limegreen p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <Brain className="w-8 h-8 text-secondary" />
                <span className="font-heading text-3xl font-black text-secondary-foreground">
                  {totalPredictions}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-secondary-foreground">
                Demand Predictions
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-brightblue p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-primary-foreground" />
                <span className="font-heading text-3xl font-black text-primary-foreground">
                  {totalDatasets}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-primary-foreground">
                Datasets Uploaded
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-pastelpink p-6 rounded-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                <span className="font-heading text-3xl font-black text-secondary-foreground">
                  ${avgPredictedSales.toFixed(0)}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-secondary-foreground">
                Avg Predicted Sales
              </h3>
            </motion.div>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-secondary to-pastelpink border-0 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary-foreground rounded-sm flex items-center justify-center flex-shrink-0">
                    <Upload className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">
                      Upload Sales Data
                    </h3>
                    <p className="font-paragraph text-base text-primary-foreground/90">
                      Import CSV or Excel files to generate new forecasts
                    </p>
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    id="file-upload"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="file-upload">
                    <Button 
                      className="bg-primary-foreground hover:bg-primary-foreground/90 text-secondary font-heading px-8 py-6 h-auto rounded-sm cursor-pointer"
                      asChild
                    >
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Datasets */}
          <div className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-secondary mb-6">
              Recent Datasets
            </h2>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="font-paragraph text-softgray">Loading datasets...</p>
              </div>
            ) : datasets.length === 0 ? (
              <Card className="bg-primary border-secondary/20 p-12 text-center">
                <p className="font-paragraph text-lg text-softgray">
                  No datasets uploaded yet. Upload your first dataset to get started.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.slice(0, 6).map((dataset, index) => (
                  <motion.div
                    key={dataset._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-primary border-secondary/20 p-6 hover:border-limegreen/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <FileText className="w-6 h-6 text-brightblue" />
                        <span className={`font-paragraph text-xs px-3 py-1 rounded-sm ${
                          dataset.processingStatus === 'Completed' 
                            ? 'bg-limegreen text-secondary-foreground' 
                            : 'bg-pastelpink text-secondary-foreground'
                        }`}>
                          {dataset.processingStatus}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2 truncate">
                        {dataset.fileName}
                      </h3>
                      <div className="space-y-1">
                        <p className="font-paragraph text-sm text-softgray">
                          Size: {dataset.fileSizeKB} KB
                        </p>
                        <p className="font-paragraph text-sm text-softgray">
                          Uploaded: {new Date(dataset.uploadDateTime || '').toLocaleDateString()}
                        </p>
                        <p className="font-paragraph text-sm text-softgray">
                          By: {dataset.uploadedBy}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-limegreen border-0 p-8 hover:scale-105 transition-transform cursor-pointer">
              <a href="/forecasts" className="block">
                <TrendingUp className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-2xl font-bold text-secondary-foreground mb-2">
                  View Sales Forecasts
                </h3>
                <p className="font-paragraph text-base text-secondary-foreground/90">
                  Explore detailed predictions for products, categories, and regions
                </p>
              </a>
            </Card>

            <Card className="bg-brightblue border-0 p-8 hover:scale-105 transition-transform cursor-pointer">
              <a href="/scenarios" className="block">
                <Brain className="w-10 h-10 text-primary-foreground mb-4" />
                <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-2">
                  Scenario Analysis
                </h3>
                <p className="font-paragraph text-base text-primary-foreground/90">
                  Simulate different business scenarios and their impact
                </p>
              </a>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

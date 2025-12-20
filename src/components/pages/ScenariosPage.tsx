import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { ScenarioAnalyses } from '@/entities';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState<ScenarioAnalyses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    scenarioName: '',
    scenarioDescription: '',
    parameterType: '',
    parameterValue: '',
    predictedSalesOutcome: 0,
    predictedDemandOutcome: 0
  });

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<ScenarioAnalyses>('scenarioanalyses');
    setScenarios(result.items);
    setIsLoading(false);
  };

  const handleCreateScenario = async () => {
    const newScenario: ScenarioAnalyses = {
      _id: crypto.randomUUID(),
      scenarioName: formData.scenarioName,
      scenarioDescription: formData.scenarioDescription,
      parameterType: formData.parameterType,
      parameterValue: formData.parameterValue,
      predictedSalesOutcome: formData.predictedSalesOutcome,
      predictedDemandOutcome: formData.predictedDemandOutcome,
      scenarioDate: new Date().toISOString()
    };

    await BaseCrudService.create('scenarioanalyses', newScenario);
    setIsDialogOpen(false);
    setFormData({
      scenarioName: '',
      scenarioDescription: '',
      parameterType: '',
      parameterValue: '',
      predictedSalesOutcome: 0,
      predictedDemandOutcome: 0
    });
    loadScenarios();
  };

  const avgSalesOutcome = scenarios.length > 0 
    ? scenarios.reduce((sum, s) => sum + (s.predictedSalesOutcome || 0), 0) / scenarios.length 
    : 0;

  const avgDemandOutcome = scenarios.length > 0 
    ? scenarios.reduce((sum, s) => sum + (s.predictedDemandOutcome || 0), 0) / scenarios.length 
    : 0;

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          {/* Page Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl font-black text-secondary mb-4">
                Scenario Analysis
              </h1>
              <p className="font-paragraph text-lg text-softgray max-w-3xl">
                Simulate different business scenarios to understand their impact on sales and demand. Test pricing changes, promotions, and market conditions.
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-limegreen hover:bg-limegreen/90 text-secondary-foreground font-heading px-8 py-6 h-auto rounded-sm">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Scenario
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-primary border-secondary/20 text-primary-foreground max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl font-bold text-secondary">
                    Create New Scenario
                  </DialogTitle>
                  <DialogDescription className="font-paragraph text-softgray">
                    Define parameters to simulate business scenarios and predict outcomes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="scenarioName" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                      Scenario Name
                    </Label>
                    <Input
                      id="scenarioName"
                      value={formData.scenarioName}
                      onChange={(e) => setFormData({ ...formData, scenarioName: e.target.value })}
                      placeholder="e.g., 20% Price Increase"
                      className="bg-primary border-secondary/20 text-primary-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scenarioDescription" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="scenarioDescription"
                      value={formData.scenarioDescription}
                      onChange={(e) => setFormData({ ...formData, scenarioDescription: e.target.value })}
                      placeholder="Describe the scenario and its assumptions..."
                      className="bg-primary border-secondary/20 text-primary-foreground"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="parameterType" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                        Parameter Type
                      </Label>
                      <Input
                        id="parameterType"
                        value={formData.parameterType}
                        onChange={(e) => setFormData({ ...formData, parameterType: e.target.value })}
                        placeholder="e.g., Price, Promotion"
                        className="bg-primary border-secondary/20 text-primary-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parameterValue" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                        Parameter Value
                      </Label>
                      <Input
                        id="parameterValue"
                        value={formData.parameterValue}
                        onChange={(e) => setFormData({ ...formData, parameterValue: e.target.value })}
                        placeholder="e.g., +20%"
                        className="bg-primary border-secondary/20 text-primary-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="predictedSales" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                        Predicted Sales Outcome
                      </Label>
                      <Input
                        id="predictedSales"
                        type="number"
                        value={formData.predictedSalesOutcome}
                        onChange={(e) => setFormData({ ...formData, predictedSalesOutcome: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        className="bg-primary border-secondary/20 text-primary-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="predictedDemand" className="font-paragraph text-sm text-primary-foreground mb-2 block">
                        Predicted Demand Outcome
                      </Label>
                      <Input
                        id="predictedDemand"
                        type="number"
                        value={formData.predictedDemandOutcome}
                        onChange={(e) => setFormData({ ...formData, predictedDemandOutcome: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        className="bg-primary border-secondary/20 text-primary-foreground"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleCreateScenario}
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground font-heading py-6 h-auto rounded-sm mt-6"
                  >
                    Create Scenario
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary p-8 rounded-sm"
            >
              <Activity className="w-10 h-10 text-limegreen mb-4" />
              <h3 className="font-heading text-sm text-limegreen tracking-[0.2em] uppercase mb-2">
                Total Scenarios
              </h3>
              <p className="font-heading text-4xl font-black text-primary-foreground">
                {scenarios.length}
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
                Avg Sales Outcome
              </h3>
              <p className="font-heading text-4xl font-black text-secondary-foreground">
                ${avgSalesOutcome.toFixed(0)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-brightblue p-8 rounded-sm"
            >
              <TrendingDown className="w-10 h-10 text-primary-foreground mb-4" />
              <h3 className="font-heading text-sm text-primary-foreground tracking-[0.2em] uppercase mb-2">
                Avg Demand Outcome
              </h3>
              <p className="font-heading text-4xl font-black text-primary-foreground">
                {avgDemandOutcome.toFixed(0)}
              </p>
            </motion.div>
          </div>

          {/* Scenarios List */}
          <div>
            <h2 className="font-heading text-3xl font-bold text-secondary mb-6">
              Scenario Simulations
            </h2>
            {isLoading ? (
              <div className="text-center py-12">
                <p className="font-paragraph text-softgray">Loading scenarios...</p>
              </div>
            ) : scenarios.length === 0 ? (
              <Card className="bg-primary border-secondary/20 p-12 text-center">
                <Zap className="w-16 h-16 text-pastelpink mx-auto mb-4" />
                <p className="font-paragraph text-lg text-softgray mb-4">
                  No scenarios created yet. Start by creating your first scenario simulation.
                </p>
                <p className="font-paragraph text-sm text-softgray">
                  Test different pricing strategies, promotional campaigns, or market conditions to see their impact.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {scenarios.map((scenario, index) => (
                  <motion.div
                    key={scenario._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-primary border-secondary/20 p-6 hover:border-limegreen/50 transition-colors h-full">
                      <div className="flex items-start justify-between mb-4">
                        <Zap className="w-6 h-6 text-pastelpink" />
                        {scenario.scenarioDate && (
                          <span className="font-paragraph text-xs text-softgray">
                            {format(new Date(scenario.scenarioDate), 'MMM dd, yyyy')}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-3">
                        {scenario.scenarioName}
                      </h3>
                      
                      {scenario.scenarioDescription && (
                        <p className="font-paragraph text-sm text-softgray mb-4 leading-relaxed">
                          {scenario.scenarioDescription}
                        </p>
                      )}
                      
                      <div className="space-y-3 mb-4">
                        {scenario.parameterType && (
                          <div className="flex items-center gap-2">
                            <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                              Parameter:
                            </span>
                            <span className="font-paragraph text-sm text-primary-foreground">
                              {scenario.parameterType}
                            </span>
                            {scenario.parameterValue && (
                              <span className="font-heading text-sm font-bold text-limegreen">
                                {scenario.parameterValue}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary/20">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-limegreen" />
                            <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                              Sales Outcome
                            </span>
                          </div>
                          <p className="font-heading text-2xl font-bold text-limegreen">
                            ${(scenario.predictedSalesOutcome || 0).toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-brightblue" />
                            <span className="font-paragraph text-xs text-softgray uppercase tracking-wider">
                              Demand Outcome
                            </span>
                          </div>
                          <p className="font-heading text-2xl font-bold text-brightblue">
                            {scenario.predictedDemandOutcome || 0}
                          </p>
                        </div>
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

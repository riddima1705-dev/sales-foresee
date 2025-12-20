/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: demandpredictions
 * Interface for DemandPredictions
 */
export interface DemandPredictions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType reference */
  datasetid?: UploadedSalesDatasets;
  /** @wixFieldType number */
  predictedDemandQuantity?: number;
  /** @wixFieldType date */
  predictionPeriodStart?: Date | string;
  /** @wixFieldType date */
  predictionPeriodEnd?: Date | string;
  /** @wixFieldType text */
  demandTrendCategory?: string;
  /** @wixFieldType number */
  trendImpactPercentage?: number;
  /** @wixFieldType datetime */
  predictionGeneratedDate?: Date | string;
}


/**
 * Collection ID: salesforecasts
 * Interface for SalesForecasts
 */
export interface SalesForecasts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType datetime */
  forecastDate?: Date | string;
  /** @wixFieldType reference */
  datasetid?: UploadedSalesDatasets;
  /** @wixFieldType date */
  forecastPeriodStartDate?: Date | string;
  /** @wixFieldType date */
  forecastPeriodEndDate?: Date | string;
  /** @wixFieldType number */
  predictedSalesValue?: number;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  regionName?: string;
}


/**
 * Collection ID: scenarioanalyses
 * Interface for ScenarioAnalyses
 */
export interface ScenarioAnalyses {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  scenarioName?: string;
  /** @wixFieldType text */
  scenarioDescription?: string;
  /** @wixFieldType text */
  parameterType?: string;
  /** @wixFieldType text */
  parameterValue?: string;
  /** @wixFieldType number */
  predictedSalesOutcome?: number;
  /** @wixFieldType number */
  predictedDemandOutcome?: number;
  /** @wixFieldType date */
  scenarioDate?: Date | string;
}


/**
 * Collection ID: uploadedsalesdatasets
 * Interface for UploadedSalesDatasets
 */
export interface UploadedSalesDatasets {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fileName?: string;
  /** @wixFieldType datetime */
  uploadDateTime?: Date | string;
  /** @wixFieldType text */
  processingStatus?: string;
  /** @wixFieldType text */
  uploadedBy?: string;
  /** @wixFieldType number */
  fileSizeKB?: number;
  /** @wixFieldType url */
  fileUrl?: string;
}

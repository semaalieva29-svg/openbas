export interface ClinicalGuideline {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  lastUpdated: string;
  source: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  diagnosis: string;
  treatment: string;
  lastVisit: string;
  nextVisit: string;
}

export interface Diagnosis {
  id: string;
  name: string;
  icd10: string;
  symptoms: string[];
  diagnosticCriteria: string[];
  treatmentOptions: string[];
  guidelines: ClinicalGuideline[];
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  dosage: string;
  contraindications: string[];
  sideEffects: string[];
  monitoring: string[];
}

export interface LabTest {
  id: string;
  name: string;
  normalRange: string;
  units: string;
  description: string;
  interpretation: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  patient: Patient;
  diagnosis: Diagnosis;
  treatment: Treatment[];
  labResults: LabTest[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}
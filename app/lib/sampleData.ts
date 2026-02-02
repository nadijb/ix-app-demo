export const SAMPLE_PROMPTS = {
  labResult: "Show me my latest Total Cholesterol lab results",
  trendLab: "Show me my Cholesterol trends",
  careTeam: "Who is on my care team?",
};

export const SAMPLE_LAB = {
  testName: "Total Cholesterol",
  value: 5.7,
  unit: "%",
  referenceRange: "4.0 - 5.6%",
  date: "Jan 15, 2026",
  status: "slightly_elevated" as const,
};

export const SAMPLE_TREND = {
  testName: "Glucose",
  period: "6 months",
  trend: "improving" as const,
  dataPoints: [110, 125, 118, 105, 112, 98],
  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
};

export const SAMPLE_CARE_MEMBER = {
  name: "Dr. Ahmad Ghosheh",
  role: "Primary Care Physician",
  phone: "+971-585923946",
  email: "ahmad.ghosheh@iohealth.com",
  nextAppointment: "Feb 10, 2026",
};

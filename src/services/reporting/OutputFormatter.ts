export type OutputFormat = "word" | "pdf" | "html";

export type ReportSection = {
  id: string;
  title: string;
  body: string;
};

export type GeneratedOutput = {
  format: OutputFormat;
  content: string;
};

export interface OutputFormatter {
  startDocument(reportTitle: string): void;
  writeSection(section: ReportSection): void;
  finalizeDocument(): GeneratedOutput;
}

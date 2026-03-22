import type { GeneratedOutput, OutputFormatter, ReportSection } from "./OutputFormatter";

export class PdfOutputFormatter implements OutputFormatter {
  private pages: string[] = [];

  startDocument(reportTitle: string): void {
    this.pages = [`[PDF] ${reportTitle}`];
  }

  writeSection(section: ReportSection): void {
    this.pages.push(`### ${section.title}`);
    this.pages.push(section.body);
  }

  finalizeDocument(): GeneratedOutput {
    return {
      format: "pdf",
      content: this.pages.join("\n\n"),
    };
  }
}


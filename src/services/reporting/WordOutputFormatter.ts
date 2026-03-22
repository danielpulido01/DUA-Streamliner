import type { GeneratedOutput, OutputFormatter, ReportSection } from "./OutputFormatter";

export class WordOutputFormatter implements OutputFormatter {
  private blocks: string[] = [];

  startDocument(reportTitle: string): void {
    this.blocks = [`[WORD] ${reportTitle}`];
  }

  writeSection(section: ReportSection): void {
    this.blocks.push(`## ${section.title}`);
    this.blocks.push(section.body);
  }

  finalizeDocument(): GeneratedOutput {
    return {
      format: "word",
      content: this.blocks.join("\n\n"),
    };
  }
}


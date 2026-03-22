import type { GeneratedOutput, OutputFormatter, ReportSection } from "./OutputFormatter";

export class HtmlOutputFormatter implements OutputFormatter {
  private parts: string[] = [];

  startDocument(reportTitle: string): void {
    this.parts = [`<article><h1>${reportTitle}</h1>`];
  }

  writeSection(section: ReportSection): void {
    this.parts.push(`<section><h2>${section.title}</h2><p>${section.body}</p></section>`);
  }

  finalizeDocument(): GeneratedOutput {
    this.parts.push("</article>");

    return {
      format: "html",
      content: this.parts.join(""),
    };
  }
}


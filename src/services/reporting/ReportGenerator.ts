import type { GeneratedOutput, OutputFormatter, ReportSection } from "./OutputFormatter";

export type ReportBuildInput = {
  reportTitle: string;
  templateData: unknown;
};

export abstract class ReportGenerator {
  protected constructor(private readonly formatter: OutputFormatter) {}

  generate(input: ReportBuildInput): GeneratedOutput {
    this.formatter.startDocument(input.reportTitle);

    const sections = this.buildSections(input.templateData);
    for (const section of sections) {
      this.formatter.writeSection(section);
    }

    return this.formatter.finalizeDocument();
  }

  protected abstract buildSections(templateData: unknown): ReportSection[];
}

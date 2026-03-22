# Reporting Bridge - Agent Guide

Use this module when you need the same report writer to produce multiple output formats.

## What to use

Import from:

```ts
import {
  DuaTemplateReportGenerator,
  WordOutputFormatter,
  PdfOutputFormatter,
  HtmlOutputFormatter,
  type OutputFormatter,
} from "@/services/reporting";
```

## Required flow in caller classes

1. Map source data into `templateData`.
2. Choose formatter (`word` | `pdf` | `html`).
3. Create `DuaTemplateReportGenerator(formatter)`.
4. Call `generate({ reportTitle, templateData })`.
5. Return/store the generated output.

## Reference integration

```ts
import {
  DuaTemplateReportGenerator,
  HtmlOutputFormatter,
  PdfOutputFormatter,
  WordOutputFormatter,
  type OutputFormatter,
} from "@/services/reporting";

type OutputKind = "word" | "pdf" | "html";

export class ReportApplicationService {
  generateDuaReport(output: OutputKind, templateData: unknown) {
    const formatter = this.createFormatter(output);
    const generator = new DuaTemplateReportGenerator(formatter);

    return generator.generate({
      reportTitle: "DUA generado",
      templateData,
    });
  }

  private createFormatter(output: OutputKind): OutputFormatter {
    if (output === "word") return new WordOutputFormatter();
    if (output === "pdf") return new PdfOutputFormatter();
    return new HtmlOutputFormatter();
  }
}
```

## How to replicate for another report type

Create a new generator class in this folder, extending `ReportGenerator` and implementing only `buildSections`:

```ts
import { ReportGenerator } from "./ReportGenerator";
import type { ReportSection } from "./OutputFormatter";

export class AnotherTemplateReportGenerator extends ReportGenerator {
  protected buildSections(templateData: unknown): ReportSection[] {
    // Placeholder or real mapping logic
    return [
      { id: "s1", title: "Section 1", body: "TODO" },
    ];
  }
}
```

Then reuse existing formatters, or add a new formatter implementation.

## How to add a new output format

1. Add a formatter file implementing `OutputFormatter`.
2. Add new format literal to `OutputFormat` in `OutputFormatter.ts`.
3. Export the formatter in `index.ts`.
4. Add selection logic in caller service (`createFormatter`).

Minimal formatter template:

```ts
import type { GeneratedOutput, OutputFormatter, ReportSection } from "./OutputFormatter";

export class MarkdownOutputFormatter implements OutputFormatter {
  private parts: string[] = [];

  startDocument(reportTitle: string): void {
    this.parts = [`# ${reportTitle}`];
  }

  writeSection(section: ReportSection): void {
    this.parts.push(`## ${section.title}`);
    this.parts.push(section.body);
  }

  finalizeDocument(): GeneratedOutput {
    return {
      format: "markdown",
      content: this.parts.join("\n\n"),
    };
  }
}
```

## Current placeholders

- `DuaTemplateReportGenerator.buildSections(...)` contains placeholder mapping logic.
- Output formatters currently return string content placeholders (no real Word/PDF engine yet).


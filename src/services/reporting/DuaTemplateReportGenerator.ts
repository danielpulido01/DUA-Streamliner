import { ReportGenerator } from "./ReportGenerator";
import type { ReportSection } from "./OutputFormatter";

type DuaTemplateInput = {
  sections?: Array<{ id?: string; title?: string; body?: string }>;
};

export class DuaTemplateReportGenerator extends ReportGenerator {
  protected buildSections(templateData: unknown): ReportSection[] {
    const normalized = this.normalizeTemplateData(templateData);

    if (normalized.sections.length === 0) {
      return [
        {
          id: "placeholder-summary",
          title: "Resumen DUA",
          body: "TODO: conectar con el mapeo real del expediente a la plantilla.",
        },
      ];
    }

    return normalized.sections.map((section, index) => ({
      id: section.id ?? `section-${index + 1}`,
      title: section.title ?? `Seccion ${index + 1}`,
      body: section.body ?? "TODO: contenido real de la seccion.",
    }));
  }

  private normalizeTemplateData(templateData: unknown): DuaTemplateInput {
    if (!templateData || typeof templateData !== "object") {
      return { sections: [] };
    }

    const candidate = templateData as DuaTemplateInput;
    if (!Array.isArray(candidate.sections)) {
      return { sections: [] };
    }

    return candidate;
  }
}

import type { ModuleContent } from "@/types/shared";
import { fundamentals } from "./fundamentals";
import { productivity } from "./productivity";
import { prompting } from "./prompting";
import { automation } from "./automation";
import { building } from "./building";

// Hand-authored, example-driven content keyed by moduleId. Preferred over AI
// generation at seed time so the offline experience is high quality and
// deterministic.
const ALL: Record<string, ModuleContent> = {
  ...fundamentals,
  ...productivity,
  ...prompting,
  ...automation,
  ...building,
};

export function getAuthoredContent(moduleId: string): ModuleContent | null {
  return ALL[moduleId] ?? null;
}

import type { ModuleContent } from "@/types/shared";
import { fundamentals } from "./fundamentals";
import { fundamentals2 } from "./fundamentals2";
import { productivity } from "./productivity";
import { productivity2 } from "./productivity2";
import { prompting } from "./prompting";
import { automation } from "./automation";
import { building } from "./building";

// Hand-authored, example-driven content keyed by moduleId. Preferred over AI
// generation at seed time so the offline experience is high quality and
// deterministic.
const ALL: Record<string, ModuleContent> = {
  ...fundamentals,
  ...fundamentals2,
  ...productivity,
  ...productivity2,
  ...prompting,
  ...automation,
  ...building,
};

export function getAuthoredContent(moduleId: string): ModuleContent | null {
  return ALL[moduleId] ?? null;
}

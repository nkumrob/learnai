// Shared domain types used by both backend and frontend.
// Keep this file free of any server- or client-only imports.

export type TrackSlug =
  | "fundamentals"
  | "productivity"
  | "prompting"
  | "automation"
  | "building";

export type Tier = "free" | "premium";

export type ProgressStatus = "not_started" | "in_progress" | "passed";

/** A learning track: an ordered collection of modules. */
export interface Track {
  id: string;
  slug: TrackSlug;
  title: string;
  description: string;
  order: number;
}

/** A single module within a track. Structure is fixed; prose is AI-authored. */
export interface Module {
  id: string;
  trackId: string;
  order: number;
  title: string;
  /** "You'll be able to ___" outcome statement. */
  outcome: string;
}

/** One multiple-choice quiz question. `answerIndex` is the correct option. */
export interface QuizQuestion {
  prompt: string;
  options: string[];
  answerIndex: number;
  /** Shown after grading to reinforce learning. */
  explanation: string;
}

/** AI-authored content for a module: a lesson plus its quiz. */
export interface ModuleContent {
  /** Markdown lesson body. */
  lesson: string;
  /** A concrete hands-on task the learner should try. */
  task: string;
  quiz: QuizQuestion[];
}

/** A module bundled with its content, ready for the UI. */
export interface ModuleWithContent extends Module {
  content: ModuleContent;
}

/** A track with its modules (content omitted) for overview screens. */
export interface TrackWithModules extends Track {
  modules: Module[];
}

/** Per-learner progress on a single module. */
export interface ModuleProgress {
  moduleId: string;
  status: ProgressStatus;
  /** Best quiz score 0..1, or null if never attempted. */
  score: number | null;
  /** Whether the learner self-attested completing the hands-on task. */
  taskDone: boolean;
}

/** Result of grading a quiz submission. */
export interface GradeResult {
  score: number; // 0..1
  passed: boolean;
  /** Correct answer index per question, for review. */
  correctAnswers: number[];
  /** Per-question explanations. */
  explanations: string[];
  /** True if this pass completed the whole track. */
  trackCompleted: boolean;
}

/** Result of the placement quiz. */
export interface PlacementResult {
  recommendedTrack: TrackSlug;
  startModuleOrder: number;
  rationale: string;
}

/** A self-issued certificate for completing a track. */
export interface Certificate {
  id: string;
  trackId: string;
  trackTitle: string;
  learnerName: string;
  issuedAt: string; // ISO timestamp
  verifyToken: string;
}

/** Passing threshold for quizzes (fraction of questions correct). */
export const PASS_THRESHOLD = 0.8;

// HowTo JSON-LD steps for procedural lessons. Lessons not listed here render
// without HowTo schema. Each entry is the moduleId from tracks-definition.
//
// Google's HowTo rich-result eligibility was tightened in 2024 (now largely
// limited to tutorials/DIY queries). We still emit HowTo where it matches the
// genuine intent of "how to do X" search queries — even when no rich card
// renders, the schema clarifies page intent to AI Overviews and Bing.

interface HowToStep {
  name: string;
  text: string;
}

interface HowToBlueprint {
  /** The "How to ___" name surfaced in JSON-LD. */
  name: string;
  /** Plain-language summary surfaced as the `description`. */
  description: string;
  steps: HowToStep[];
  /** ISO 8601 duration (e.g. PT15M). */
  totalTime: string;
}

export const HOWTO_BY_MODULE: Record<string, HowToBlueprint> = {
  "prompting-1": {
    name: "How to write a high-quality AI prompt",
    description:
      "A four-part prompt structure (context, instruction, input, output format) that reliably produces useful output from ChatGPT, Claude, or Gemini.",
    totalTime: "PT10M",
    steps: [
      {
        name: "Set the context",
        text: "Tell the AI who it is, who you are, and what situation you are in (for example: 'You are a senior recruiter helping me prepare for a tech interview.').",
      },
      {
        name: "State the instruction",
        text: "Write a single, clear instruction for what you want the AI to do, with one verb (write, summarize, compare, classify).",
      },
      {
        name: "Provide the input",
        text: "Paste the material the AI should work on (a draft, transcript, list, or table). Mark it clearly with a heading or triple backticks so the model can separate input from instruction.",
      },
      {
        name: "Specify the output format",
        text: "State exactly how you want the answer (bulleted list, table with columns, JSON, 150 words). Specifying the format closes most of the gap between a mediocre and a great response.",
      },
    ],
  },

  "prompting-2": {
    name: "How to use persona prompting",
    description:
      "Assign the AI a specific professional role at the start of a prompt to raise the quality, tone, and domain accuracy of its output.",
    totalTime: "PT5M",
    steps: [
      {
        name: "Pick a specific role",
        text: "Choose a role narrow enough to be useful (for example: 'a UX researcher who runs guerrilla usability tests'), not generic like 'an expert.'",
      },
      {
        name: "Set the role in the first sentence",
        text: "Open the prompt with 'You are ___' and add one or two relevant constraints (years of experience, industry, audience).",
      },
      {
        name: "Ask the role-appropriate question",
        text: "Phrase the task as something that role would actually be asked (a UX researcher gets asked to design a study, not to write marketing copy).",
      },
      {
        name: "Verify and iterate",
        text: "Check the output against what a real person in that role would produce. If the tone is wrong, tighten the role description rather than the instruction.",
      },
    ],
  },

  "prompting-3": {
    name: "How to use few-shot prompting",
    description:
      "Teach the AI a desired output format by including two or three worked examples in the prompt before asking for the next case.",
    totalTime: "PT10M",
    steps: [
      {
        name: "Pick two or three representative examples",
        text: "Choose examples that cover the shape of the task (typical case, edge case, format variation). Three is usually enough; more rarely helps.",
      },
      {
        name: "Format each example identically",
        text: "Use the same structure for every example: an Input: line and an Output: line, separated consistently. The format itself is part of what you are teaching.",
      },
      {
        name: "Add the new input with no output",
        text: "After your worked examples, write the new Input: and leave the Output: line for the model to complete.",
      },
      {
        name: "Check pattern fidelity",
        text: "If the AI breaks pattern (extra commentary, different format), add one more clean example or sharpen the instruction above the examples.",
      },
    ],
  },

  "prompting-4": {
    name: "How to use chain-of-thought prompting",
    description:
      "Instruct the AI to reason step by step before giving an answer, improving reliability on math, logic, and multi-step problems.",
    totalTime: "PT5M",
    steps: [
      {
        name: "Ask for the reasoning first",
        text: "Add a sentence like 'Think step by step before giving the final answer' to the prompt. For Claude and ChatGPT this is the simplest trigger.",
      },
      {
        name: "Constrain the final answer format",
        text: "Tell the model exactly where the answer should appear (for example: 'After reasoning, return the answer on a line that starts with Answer:').",
      },
      {
        name: "Provide a worked example if accuracy still slips",
        text: "Include one example where you show the reasoning yourself and the resulting answer. This is called few-shot chain-of-thought.",
      },
      {
        name: "Verify the reasoning matches the answer",
        text: "Read the reasoning trace. If the steps look correct but the final answer doesn't follow from them, ask the model to redo the last step.",
      },
    ],
  },

  "prompting-5": {
    name: "How to refine AI output across multiple turns",
    description:
      "Iteratively shape an AI response over a short back-and-forth instead of trying to perfect the prompt in one shot.",
    totalTime: "PT10M",
    steps: [
      {
        name: "Get a rough first draft",
        text: "Send your initial prompt and accept that the first response will be rough. Treat it as a starting point, not the answer.",
      },
      {
        name: "Identify the single biggest gap",
        text: "Read the output and name one specific thing that is wrong or missing (tone, structure, depth on a particular point).",
      },
      {
        name: "Ask for one focused revision",
        text: "Send a follow-up that addresses only that gap (for example: 'Keep everything, but make section two more specific with a concrete example').",
      },
      {
        name: "Repeat until good enough",
        text: "Each turn fixes one thing. Stop when the remaining gaps are smaller than the cost of one more turn.",
      },
    ],
  },

  "automation-3": {
    name: "How to build your first no-code automation in Zapier or Make",
    description:
      "Build a trigger-to-action workflow that runs without you, using either Zapier or Make's visual builder.",
    totalTime: "PT30M",
    steps: [
      {
        name: "Choose the trigger app and event",
        text: "Pick the app the workflow listens to (Gmail, Typeform, a webhook) and the specific event (new email, new submission).",
      },
      {
        name: "Connect the action app",
        text: "Add an action step in the destination app (Notion, Google Sheets, Slack) and map fields from the trigger event into the action.",
      },
      {
        name: "Test with a real trigger",
        text: "Run a real trigger event (send the test email, submit the test form) so the platform captures live data, then test the action with that data.",
      },
      {
        name: "Turn it on and monitor",
        text: "Enable the automation. Check the run history after a day to confirm the trigger fires reliably and the action succeeds.",
      },
    ],
  },

  "automation-4": {
    name: "How to build a branching workflow in n8n",
    description:
      "Use n8n's visual editor to build an automation that takes different paths based on conditions, with error handling.",
    totalTime: "PT45M",
    steps: [
      {
        name: "Add a trigger node",
        text: "Drop in a trigger node (Webhook, Schedule, Gmail Trigger, or similar). Configure it and run it once to capture sample data n8n can use to map fields.",
      },
      {
        name: "Add an IF or Switch node",
        text: "After the trigger, add an IF (two branches) or Switch (multiple branches) node. Configure each branch's condition using fields from the trigger.",
      },
      {
        name: "Build each branch independently",
        text: "On each branch, add the action nodes that should run when the condition matches (send Slack message, write to database, call an API).",
      },
      {
        name: "Add error handling",
        text: "Right-click any node that calls an external service and choose 'Continue on fail.' Then route the error path into a notification node so failures surface instead of silently dropping.",
      },
      {
        name: "Activate and watch the execution log",
        text: "Toggle the workflow active. Check the Executions view for the first few runs and confirm both success and error branches behave correctly.",
      },
    ],
  },

  "automation-7": {
    name: "How to build a lead capture automation end to end",
    description:
      "Capture a form submission, enrich it, store it in a CRM or spreadsheet, and notify the right person — fully automated.",
    totalTime: "PT60M",
    steps: [
      {
        name: "Pick the form source",
        text: "Decide where leads come from (Typeform, Tally, a website form via webhook) and connect it as the trigger of your automation.",
      },
      {
        name: "Normalize the submission",
        text: "Parse the form fields into a clean shape: full_name, email, company, message. This makes every downstream step simpler.",
      },
      {
        name: "Enrich with public data (optional)",
        text: "Add a step that calls Clearbit, Apollo, or a similar API to add company size, industry, and LinkedIn URL to the record.",
      },
      {
        name: "Write to storage",
        text: "Create the lead row in your CRM (HubSpot, Pipedrive, Notion, Google Sheets) with all fields mapped.",
      },
      {
        name: "Notify the owner",
        text: "Send a Slack DM or email to the right person with the lead summary and a link to the new CRM record.",
      },
      {
        name: "Add a fallback",
        text: "If any step fails, write the raw submission to a dedicated 'leads_fallback' sheet so no lead is lost while you debug.",
      },
    ],
  },

  "automation-11": {
    name: "How to build a no-code AI agent that completes multi-step tasks",
    description:
      "Combine a workflow tool (n8n, Zapier, Make) with an LLM step so the automation makes decisions instead of just routing data.",
    totalTime: "PT60M",
    steps: [
      {
        name: "Define the task the agent will do",
        text: "Write the task in one sentence (for example: 'Read incoming support emails and route them to the right team queue').",
      },
      {
        name: "Build the trigger and data fetch",
        text: "Set up the trigger (new email, scheduled run) and pull whatever data the agent needs to make a decision.",
      },
      {
        name: "Add the LLM decision step",
        text: "Add a Claude, OpenAI, or Gemini node with a prompt that takes the fetched data and returns a structured decision (a category, a JSON object, a yes/no).",
      },
      {
        name: "Route based on the decision",
        text: "Use an IF or Switch node to send the workflow down different paths based on the LLM's output.",
      },
      {
        name: "Add a confidence gate",
        text: "Ask the LLM to also return a confidence score and only auto-act when confidence is high; route low-confidence cases to a human queue.",
      },
      {
        name: "Run, monitor, refine the prompt",
        text: "Watch the first 20–50 runs. When you see misroutings, add one example of the correct decision to the prompt and re-test.",
      },
    ],
  },

  "building-1": {
    name: "How retrieval-augmented generation (RAG) works",
    description:
      "Connect an LLM to your own documents so it answers from your data instead of its training data, reducing hallucinations on private content.",
    totalTime: "PT15M",
    steps: [
      {
        name: "Collect the source documents",
        text: "Gather the documents the AI should answer from (handbooks, PDFs, knowledge base articles, transcripts).",
      },
      {
        name: "Chunk and embed",
        text: "Split each document into small passages (a few hundred words). Use an embedding model (OpenAI text-embedding-3, Voyage, Cohere) to convert each passage into a vector.",
      },
      {
        name: "Store the vectors",
        text: "Save the vectors in a vector database (Pinecone, Weaviate, pgvector, or a managed option like Anthropic's File API).",
      },
      {
        name: "Retrieve at query time",
        text: "When a user asks a question, embed the question, find the top-k most similar passages in the vector store, and pass those passages to the LLM as context.",
      },
      {
        name: "Cite and check",
        text: "Ask the LLM to cite which passages it used. Show the citations to the user so they can verify the answer against the source.",
      },
    ],
  },
};

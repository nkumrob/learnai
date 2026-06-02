import type { ModuleContent } from "@/types/shared";

// Hand-authored content for the Building with AI: APIs & MCP track.
export const building: Record<string, ModuleContent> = {
  "building-1": {
    lesson: `Behind every AI app is an **API call**: your code sends a request to a model and gets text back. Under the hood, the chat tool you've been using does exactly this.

## The shape of a request
You send a list of **messages** (a system instruction plus the conversation) and get a reply.
\`\`\`
POST https://api.provider.com/v1/chat
{
  "model": "a-small-fast-model",
  "messages": [
    { "role": "system", "content": "You are a concise assistant." },
    { "role": "user", "content": "Summarize this in one line: ..." }
  ]
}
\`\`\`
The response contains the model's text, plus usage info (how many **tokens** you used - that's what you pay for).

## Three knobs you'll actually use
- **model** - bigger = smarter but slower/pricier; pick the smallest that's good enough.
- **temperature** - low (0-0.3) for consistent/factual, higher for creative.
- **max tokens** - caps the response length (and cost).

## Keys and safety
- Your **API key** is a secret. Never put it in frontend code or commit it - keep it on the server / in an environment variable.
- Calls can fail or be slow; handle errors and timeouts.

> **Mindset.** An API call is just "function in, text out." Once you can send messages and read the reply, you can build almost anything on top.`,
    task: "Read your chosen provider's quickstart and identify, in their example: the model field, the messages array, where the response text lives, and where the API key is set. Don't build yet - just locate each piece.",
    quiz: [
      {
        prompt: "What do you send in a chat API request?",
        options: [
          "A model and a list of messages",
          "Only your password",
          "A single image",
          "Nothing - it guesses",
        ],
        answerIndex: 0,
        explanation: "You specify the model and a messages array (system + conversation).",
      },
      {
        prompt: "What are you billed by on most LLM APIs?",
        options: ["Tokens used", "Number of clicks", "Time of day", "File size on disk"],
        answerIndex: 0,
        explanation: "Usage is measured in tokens for input and output.",
      },
      {
        prompt: "When should you lower the temperature?",
        options: [
          "When you want consistent, factual output",
          "When you want maximum randomness",
          "When you want longer answers",
          "Never",
        ],
        answerIndex: 0,
        explanation: "Low temperature gives more deterministic, consistent responses.",
      },
      {
        prompt: "Where must your API key live?",
        options: [
          "On the server / in an environment variable, never in frontend code",
          "In your public HTML",
          "In a committed file on GitHub",
          "In the user's browser",
        ],
        answerIndex: 0,
        explanation: "API keys are secrets - exposing them lets others spend your money.",
      },
    ],
  },

  "building-2": {
    lesson: `On its own a model only produces text. **Tool calling** (a.k.a. function calling) lets it *use* your code: you describe functions, and the model replies with which one to call and the arguments - as structured data.

## How it works
1. You give the model a list of tools with names, descriptions, and an argument schema.
2. The model decides a tool is needed and returns a structured call:
\`\`\`
{ "tool": "get_weather", "args": { "city": "Accra", "unit": "celsius" } }
\`\`\`
3. **Your code** runs the real function and sends the result back.
4. The model uses that result to write its final answer.

The model never runs anything itself - it just *requests* a call, and you stay in control of execution.

## Why it's the key to useful AI
Text alone can't check inventory, book a slot, or query a database. Tools connect the model to the real world: live data, actions, your systems. This is the foundation under agents - an agent is mostly a model plus tools in a loop.

## Design tools well
- **Clear names and descriptions** so the model knows when to use each.
- **Strict argument schemas** (types, allowed values) so the call is valid.
- **Validate the args** before executing - never trust them blindly.

> **Example.** A booking assistant has tools: \`search_slots(date)\`, \`book_slot(id)\`. The model picks which to call based on what the user asked, and your code does the actual booking.`,
    task: "Pick a simple capability (e.g. 'look up an order'). Write the tool definition for it: a name, a one-line description, and the argument schema (fields + types). Note what your code would validate before running it.",
    quiz: [
      {
        prompt: "What does tool calling let a model do?",
        options: [
          "Request that your code run a function with structured arguments",
          "Run any program on your computer itself",
          "Replace your database",
          "Send text only, nothing else",
        ],
        answerIndex: 0,
        explanation: "The model returns a structured call; your code executes it.",
      },
      {
        prompt: "Who actually runs the function in tool calling?",
        options: [
          "Your code does; the model only requests it",
          "The model runs it directly",
          "No one",
          "The end user manually",
        ],
        answerIndex: 0,
        explanation: "You stay in control of execution - the model just asks.",
      },
      {
        prompt: "Why is tool calling the foundation of useful AI?",
        options: [
          "It connects the model to live data and real actions",
          "It makes text longer",
          "It removes the need for prompts",
          "It hides the output",
        ],
        answerIndex: 0,
        explanation: "Tools let the model check data and take actions beyond plain text.",
      },
      {
        prompt: "What should you always do with the model's tool arguments?",
        options: [
          "Validate them before executing",
          "Trust them blindly",
          "Ignore the schema",
          "Run them twice",
        ],
        answerIndex: 0,
        explanation: "Validate types and allowed values before acting on model-supplied args.",
      },
    ],
  },

  "building-3": {
    lesson: `A model doesn't know your documents, your policies, or last week's tickets. **Retrieval-Augmented Generation (RAG)** fixes that by fetching the relevant text and putting it into the prompt - so the model answers from *your* data, not just its training.

## The RAG flow
1. **Prepare** - split your documents into chunks and store them in a search index (often a *vector database* that searches by meaning, not exact words).
2. **Retrieve** - when a question comes in, find the few most relevant chunks.
3. **Augment** - paste those chunks into the prompt as context.
4. **Generate** - the model answers using that context.
\`\`\`
Question: "What's our refund window?"
-> retrieve: [policy chunk: "Refunds within 30 days..."]
-> prompt: "Using this policy, answer: ... <chunk> ..."
-> answer grounded in your real policy
\`\`\`

## Why teams use it
- **Current and private** - answers reflect your latest docs without retraining a model.
- **Cheaper and safer** than fine-tuning for most "answer from our knowledge" needs.
- **Citable** - you can show which chunk the answer came from.

## Watch-outs
- Garbage in, garbage out: if retrieval pulls the wrong chunk, the answer is wrong.
- Always keep the model honest: "answer only from the provided context; if it's not there, say you don't know."

> **Mental model.** RAG = open-book exam. The model is smart but needs you to hand it the right page.`,
    task: "Pick a set of docs you'd want an AI to answer from (a policy, an FAQ). Describe how you'd chunk them and write the instruction that keeps the model answering only from retrieved context.",
    quiz: [
      {
        prompt: "What problem does RAG solve?",
        options: [
          "The model doesn't know your private or current data",
          "The model writes too slowly",
          "The model can't form sentences",
          "There's no way to prompt it",
        ],
        answerIndex: 0,
        explanation: "RAG injects your relevant data so answers reflect it.",
      },
      {
        prompt: "What are the steps of RAG, in order?",
        options: [
          "Prepare/index, retrieve, augment the prompt, generate",
          "Generate, then index",
          "Delete, then guess",
          "Only generate, nothing else",
        ],
        answerIndex: 0,
        explanation: "Index your docs, retrieve relevant chunks, add them to the prompt, then generate.",
      },
      {
        prompt: "A good instruction to keep RAG honest is:",
        options: [
          "'Answer only from the provided context; else say you don't know'",
          "'Make up an answer if unsure'",
          "'Ignore the context'",
          "'Always cite a random source'",
        ],
        answerIndex: 0,
        explanation: "Grounding the model to the context reduces hallucination.",
      },
      {
        prompt: "Which analogy fits RAG best?",
        options: [
          "An open-book exam - hand the model the right page",
          "A closed-book memory test",
          "A coin flip",
          "A calculator",
        ],
        answerIndex: 0,
        explanation: "RAG supplies the relevant reference material at answer time.",
      },
    ],
  },

  "building-4": {
    lesson: `Connecting a model to tools used to mean custom code for every app-and-model combination. **MCP (Model Context Protocol)** is an open standard that fixes this - think of it as a **USB-C port for AI**: one common way for models to access tools and data.

## What MCP standardizes
- An **MCP server** exposes tools, data, and prompts (e.g. a GitHub server, a database server, a filesystem server).
- An **MCP client** (an AI app or assistant) connects to any server using the same protocol.
- So any compliant model can use any compliant tool - no more one-off integrations.

> **Before MCP.** N models × M tools = N×M custom integrations.
> **With MCP.** Build a server once; every MCP-aware app can use it.

## Why it exploded
By 2026 MCP had tens of millions of monthly SDK downloads and backing from major AI vendors (OpenAI, Microsoft, Google, Amazon). When the big players agree on one standard, it becomes the default plumbing for agentic AI - which is why it's worth knowing even if you don't build servers yourself.

## What this means for you
- **Users**: assistants can plug into your tools (calendar, repos, docs) through MCP servers.
- **Builders**: expose your service as an MCP server once, and it works across many AI clients.
- It pairs naturally with tool calling and agents - MCP is *how* an agent reaches the outside world in a standard way.

> **One line.** MCP is the standard that lets any AI app talk to any tool, so integrations stop being one-off.`,
    task: "Find one MCP server (official or community) for a tool you use. Read its README and note: what tools it exposes, and what an AI assistant could now do with it that it couldn't before.",
    quiz: [
      {
        prompt: "What is MCP, in one line?",
        options: [
          "An open standard for how AI apps access tools and data",
          "A new AI model",
          "A programming language",
          "A type of GPU",
        ],
        answerIndex: 0,
        explanation: "MCP standardizes the connection between models and tools/data.",
      },
      {
        prompt: "Which analogy is used for MCP?",
        options: [
          "A USB-C port for AI",
          "A search engine",
          "A spreadsheet",
          "A password manager",
        ],
        answerIndex: 0,
        explanation: "One common port so any model can reach any tool.",
      },
      {
        prompt: "What problem does MCP remove?",
        options: [
          "Building N×M one-off integrations for every model-tool pair",
          "The need to ever prompt a model",
          "The existence of APIs",
          "Writing any code ever",
        ],
        answerIndex: 0,
        explanation: "Build a server once and every MCP-aware client can use it.",
      },
      {
        prompt: "Why does MCP matter even if you don't build servers?",
        options: [
          "Major vendors adopted it, so it's becoming default agent plumbing",
          "It replaces the internet",
          "It is required to send any email",
          "It makes models smaller",
        ],
        answerIndex: 0,
        explanation: "Broad vendor adoption makes MCP the standard way agents reach tools.",
      },
    ],
  },

  "building-5": {
    lesson: `You've got the pieces - prompts, structured output, tools, RAG, MCP. Shipping an AI feature is about wiring them into something reliable and useful. Here's a sane path from idea to production.

## 1. Start from a real job
Pick one concrete task with a clear input and output. "Summarize support tickets into a daily digest" beats "add AI."

## 2. Prototype the prompt
Get it working by hand first: a system prompt, the right context, structured output if it feeds other code. Build a few **evals** so you know it works beyond one lucky run.

## 3. Wire it in
- Call the API **from your server**, key kept secret.
- Add **tools/RAG** only if the task needs live data or actions.
- Pick the **smallest model** that passes your evals; escalate only where needed.

## 4. Make it production-grade
- **Handle failure**: timeouts, retries, a fallback message when the model is down.
- **Cache** repeated requests to cut cost and latency (exactly how this very app serves lessons).
- **Set limits**: rate limits and spend caps so a bug can't run up a huge bill.
- **Keep a human option** for anything risky.

## 5. Ship small, watch, improve
Release to a few users, log inputs and outputs, and feed real failures back into your evals.

> **The big idea.** An AI feature is normal software with one fuzzy step in the middle. Engineer around that step - validate, constrain, cache, and monitor - and it becomes dependable.`,
    task: "Plan one AI feature end to end in a few lines: the job, the prompt approach, whether it needs tools/RAG, two failure cases you'll handle, and how you'd keep cost in check. (Caching and small models are good defaults.)",
    quiz: [
      {
        prompt: "What's the best way to scope an AI feature?",
        options: [
          "Start from one real job with a clear input and output",
          "Add AI everywhere at once",
          "Pick the vaguest possible goal",
          "Avoid defining the output",
        ],
        answerIndex: 0,
        explanation: "A concrete task beats a vague 'add AI' mandate.",
      },
      {
        prompt: "How should you choose a model for production?",
        options: [
          "The smallest model that passes your evals",
          "Always the biggest and priciest",
          "A random model each call",
          "Whichever is slowest",
        ],
        answerIndex: 0,
        explanation: "Use evals to pick the cheapest model that's good enough, escalating only where needed.",
      },
      {
        prompt: "Which is a production-grade safeguard?",
        options: [
          "Caching, retries, rate limits, and spend caps",
          "Putting the API key in the browser",
          "Never handling errors",
          "Unlimited spending",
        ],
        answerIndex: 0,
        explanation: "Engineering around the fuzzy step makes the feature dependable.",
      },
      {
        prompt: "The big idea of shipping AI features is:",
        options: [
          "It's normal software with one fuzzy step to engineer around",
          "It needs no testing",
          "It can't fail",
          "It replaces all engineering practices",
        ],
        answerIndex: 0,
        explanation: "Validate, constrain, cache, and monitor the model step like any dependency.",
      },
    ],
  },
};

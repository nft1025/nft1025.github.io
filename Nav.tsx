"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PORTFOLIO_CONTEXT = `
You are "Neil Bot", the assistant embedded in Neil Francis A. Teresa's
personal portfolio website. Answer ONLY questions about Neil, his skills,
his projects, or how to contact him, using the facts below. If a question
is unrelated to this portfolio (general knowledge, coding help unrelated to
Neil's work, other people, etc.), politely say you can only answer
questions about Neil's portfolio and steer the conversation back. Keep
answers short (2-4 sentences) and friendly.

ABOUT NEIL:
- Name: Neil Francis A. Teresa
- Role: Aspiring AI engineer and full-stack developer
- Focus: building useful systems with clean logic and practical impact
- Tech stack: Python, C++, HTML, JavaScript, PHP, SQL, database management,
  Cisco Packet Tracer routing, and machine learning

SKILLS (with self-rated proficiency):
- Python 85%, SharePoint automation 85%, Cisco Packet Tracer routing 85%,
  Database management 80%, HTML 70%, JavaScript 65%, PHP 60%, C++ 60%,
  React 40%

FEATURED PROJECTS:
1. AI related activities (AI / Python) — data prep, regression, and
   classification using Python, OpenCV, scikit-learn, and Pandas.
2. Event management system (Backend / PHP) — a student registration system
   built with PHP, XAMPP, and MySQL on the backend.
3. Web development activities (Frontend / Web) — responsive sites built
   with HTML, CSS, and JavaScript for varied purposes.
4. Time manager website (Productivity / React) — a time organizer built
   during an internship using React, TypeScript, and Node.js.

CONTACT:
- Visitors can reach Neil through the contact form on this site, which
  opens a pre-filled email addressed to him.
`.trim();

const DEFAULT_MODEL =
  process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
const BUILT_IN_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "neilbot_openrouter_key";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Neil Bot. Ask me about Neil's projects, skills, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (BUILT_IN_KEY) {
      setApiKey(BUILT_IN_KEY);
      return;
    }
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  function saveKey() {
    if (!keyInput.trim()) return;
    window.localStorage.setItem(STORAGE_KEY, keyInput.trim());
    setApiKey(keyInput.trim());
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    if (!apiKey) {
      setError("Add an OpenRouter API key below to start chatting.");
      return;
    }
    setError("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "",
          "X-Title": "Neil Francis Teresa Portfolio",
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...next.slice(-8),
          ],
          max_tokens: 300,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`${res.status}: ${body.slice(0, 200)}`);
      }

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't generate a reply just now. Try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(
        "Couldn't reach the model. Check your API key or try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        aria-label={open ? "Close chat" : "Chat with Neil Bot"}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-[#052620] shadow-[0_10px_30px_rgba(79,227,193,0.35)]"
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-[#052620]"
        />
        {open ? "Close" : "Chat with Neil Bot"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-soft)] bg-[var(--surface-2)] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[#5CC98A]" />
              <span className="font-mono text-xs text-[var(--text-dim)]">
                neil-bot — portfolio Q&amp;A only
              </span>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-teal text-[#052620]"
                      : "bg-[var(--surface-2)] text-[var(--text)]"
                  }`}
                >
                  {m.content}
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex w-fit gap-1 rounded-lg bg-[var(--surface-2)] px-3 py-2.5"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]"
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {!apiKey && (
              <div className="border-t border-[var(--border-soft)] px-4 py-3">
                <p className="mb-2 text-[11px] text-[var(--text-faint)]">
                  Add a free{" "}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal underline"
                  >
                    OpenRouter API key
                  </a>{" "}
                  to chat. It's stored only in your browser.
                </p>
                <div className="flex gap-2">
                  <input
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="min-w-0 flex-1 rounded-md border border-[var(--border-soft)] bg-[var(--surface-2)] px-2.5 py-2 text-xs outline-none focus:border-teal-dim"
                  />
                  <button
                    onClick={saveKey}
                    className="rounded-md bg-teal px-3 py-2 text-xs font-semibold text-[#052620]"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="px-4 pb-1 text-[11px] text-[#E5645C]">{error}</p>
            )}

            <div className="flex items-center gap-2 border-t border-[var(--border-soft)] px-3 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about Neil's projects..."
                className="min-w-0 flex-1 rounded-md border border-[var(--border-soft)] bg-[var(--surface-2)] px-3 py-2 text-[13px] outline-none focus:border-teal-dim"
              />
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={send}
                disabled={loading}
                className="rounded-md bg-teal px-3.5 py-2 text-xs font-semibold text-[#052620] disabled:opacity-50"
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

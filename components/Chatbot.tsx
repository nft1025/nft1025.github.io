"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import chatbotIcon from "@/Assets/Icons/chatbot.png";

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
  process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "google/gemma-4-26b-a4b-it:free";
const BUILT_IN_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTED_PROMPTS = [
  "What are Neil's strongest skills?",
  "Tell me about the AI projects.",
  "What is the event management system?",
  "How can I contact Neil?",
  "Switch to light mode",
  "Switch to dark mode"
];

function getFallbackReply(question: string) {
  const text = question.toLowerCase();

  if (/(contact|email|reach|hire|message)/.test(text)) {
    return "You can contact Neil through the Contact section. It prepares an email to neilfrancisteresa22@gmail.com with your name, email, subject, and message.";
  }
  if (/(skill|stack|technology|tech|python|javascript|php|c\+\+|react|sql|database|cisco|sharepoint|html)/.test(text)) {
    return "Neil's strongest listed skills are Python, SharePoint automation, and Cisco Packet Tracer routing (85% each), followed by database management (80%). He also works with HTML, JavaScript, PHP, C++, React, SQL, and machine learning.";
  }
  if (/(event|management system|registration|mysql|xampp)/.test(text)) {
    return "Neil's Event Management System is a student registration system. Its backend uses PHP, XAMPP, and MySQL.";
  }
  if (/(time manager|productivity|internship)/.test(text)) {
    return "The Time Manager Website is a productivity organizer Neil built during an internship using React, TypeScript, and Node.js.";
  }
  if (/(web development|website|frontend|html|css)/.test(text)) {
    return "Neil's web development activities include responsive websites built with HTML, CSS, and JavaScript for different purposes.";
  }
  if (/(ai|machine learning|opencv|scikit|pandas|regression|classification)/.test(text)) {
    return "Neil's AI-related activities cover data preparation, regression, and classification with Python, OpenCV, scikit-learn, and Pandas.";
  }
  if (/(about|who|neil|background)/.test(text)) {
    return "Neil Francis A. Teresa is an aspiring AI engineer and full-stack developer focused on useful systems with clean logic and practical impact.";
  }
  if (/(project|portfolio|work)/.test(text)) {
    return "Neil's featured work includes AI-related activities, an event management system, web development activities, and a time manager website. Ask about any of those projects for more detail.";
  }

  return "I can help with Neil's skills, AI work, web projects, event management system, time manager website, or contact details. Try one of the suggested questions below.";
}

export function Chatbot() {
  const { setTheme } = useTheme();
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
  const [responseMode, setResponseMode] = useState<"ai" | "fallback" | "offline">(
    BUILT_IN_KEY ? "ai" : "fallback"
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(suggestedText?: string) {
    const text = (suggestedText ?? input).trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");

    const normalizedText = text.toLowerCase();
    if (/(switch|change|set|turn).*(light mode|light theme)|(light mode|light theme)/.test(normalizedText)) {
      setTheme("light");
      setMessages((current) => [...current, { role: "assistant", content: "Light mode is now on." }]);
      return;
    }
    if (/(switch|change|set|turn).*(dark mode|dark theme)|(dark mode|dark theme)/.test(normalizedText)) {
      setTheme("dark");
      setMessages((current) => [...current, { role: "assistant", content: "Dark mode is now on." }]);
      return;
    }

    if (!BUILT_IN_KEY) {
      setResponseMode("fallback");
      setMessages((current) => [...current, { role: "assistant", content: getFallbackReply(text) }]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${BUILT_IN_KEY}`,
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
        throw new Error(`OpenRouter returned ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't generate a reply just now. Try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      setResponseMode("ai");
    } catch {
      setResponseMode("offline");
      setMessages((current) => [
        ...current,
        { role: "assistant", content: getFallbackReply(text) },
      ]);
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
        title={open ? "Close Neil Bot" : "Chat with Neil Bot"}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-teal text-[#052620] shadow-[0_10px_30px_rgba(79,227,193,0.35)]"
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="grid h-9 w-9 place-items-center rounded-xl border border-[#052620]/25 bg-[#d7fff1]"
        >
          {open ? (
            <span className="text-2xl font-light leading-none" aria-hidden="true">×</span>
          ) : (
            <Image
              src={chatbotIcon}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl object-cover"
            />
          )}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-50 flex h-[480px] w-[calc(100vw-2rem)] max-w-[340px] flex-col overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:right-6"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-soft)] bg-[var(--surface-2)] px-4 py-3">
              <span className="grid h-6 w-6 place-items-center overflow-hidden rounded-md bg-teal">
                <Image
                  src={chatbotIcon}
                  alt="Neil Bot"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-cover"
                />
              </span>
              <span className="font-mono text-xs text-[var(--text-dim)]">
                neil-bot — portfolio Q&amp;A only
              </span>
              <span
                className={`ml-auto font-mono text-[9px] uppercase tracking-wide ${
                  responseMode === "ai" ? "text-teal" : "text-[var(--text-faint)]"
                }`}
              >
                {responseMode === "ai"
                  ? "AI enabled"
                  : responseMode === "offline"
                    ? "portfolio fallback"
                    : "portfolio mode"}
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
              {messages.length === 1 && !loading && (
                <div className="pt-1">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-[var(--text-faint)]">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => send(prompt)}
                        className="rounded-full border border-[var(--border)] px-2.5 py-1.5 text-left text-[11px] text-[var(--text-dim)] transition-colors hover:border-teal-dim hover:text-teal"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                onClick={() => send()}
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

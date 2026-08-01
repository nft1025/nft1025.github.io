"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import facebookIcon from "@/Assets/Icons/fb.png";
import githubIcon from "@/Assets/Icons/github.png";
import gmailIcon from "@/Assets/Icons/gmail.png";
import linkedinIcon from "@/Assets/Icons/linkedin.png";

const NEIL_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "neilfrancisteresa22@gmail.com";

const socials = [
  { label: "Facebook", icon: facebookIcon, href: "https://facebook.com/hondagoro25" },
  { label: "Gmail", icon: gmailIcon, href: "https://gmail.com" },
  { label: "LinkedIn", icon: linkedinIcon, href: "https://linkedin.com/in/neilteresa25" },
  { label: "GitHub", icon: githubIcon, href: "https://github.com/nft1025" },
];

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);

  const nameError = touched && !name.trim();
  const emailError = touched && !isValidEmail(email);
  const messageError = touched && !message.trim();
  const isValid = name.trim() && isValidEmail(email) && message.trim();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!isValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const body = [`From: ${name} <${email}>`, "", message].join("\n");
    const url = `mailto:${encodeURIComponent(NEIL_EMAIL)}?subject=${encodeURIComponent(
      subject || `Portfolio message from ${name}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  const fieldBase =
    "mb-3 w-full rounded-md border bg-[var(--surface-2)] px-3.5 py-3 text-[13px] outline-none transition-colors";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline gap-3.5"
      >
        <span className="font-mono text-[13px] text-[var(--text-faint)]">03</span>
        <h2 className="font-display text-[28px] font-semibold">Contact</h2>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ boxShadow: "0 20px 50px rgba(79,227,193,0.12)" }}
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        className="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      >
        <h3 className="font-display mb-2.5 text-xl">Let&apos;s build something</h3>
        <p className="mb-5 text-[13px] text-[var(--text-dim)]">
          Your email is required so Neil can reply straight to you. The form
          opens your email app with a message addressed to Neil and your details prefilled.
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={`${fieldBase} ${
            nameError ? "border-[#E5645C]" : "border-[var(--border-soft)] focus:border-teal-dim"
          }`}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="your.email@example.com"
          className={`${fieldBase} ${
            emailError ? "border-[#E5645C]" : "border-[var(--border-soft)] focus:border-teal-dim"
          }`}
        />
        {emailError && (
          <p className="-mt-2 mb-3 text-[11px] text-[#E5645C]">
            A valid email is required so your message can be replied to.
          </p>
        )}
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className={`${fieldBase} border-[var(--border-soft)] focus:border-teal-dim`}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className={`${fieldBase} min-h-[90px] resize-y ${
            messageError ? "border-[#E5645C]" : "border-[var(--border-soft)] focus:border-teal-dim"
          }`}
        />

        <motion.button
          whileHover={{ y: -2, boxShadow: "0 10px 30px rgba(79,227,193,0.4)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-md bg-teal py-3 text-sm font-semibold text-[#052620] shadow-[0_6px_20px_rgba(79,227,193,0.25)]"
        >
          Send Email
        </motion.button>

        <div className="mt-4 flex gap-3">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              whileHover={{
                y: -3,
                borderColor: "#4FE3C1",
                color: "#4FE3C1",
                boxShadow: "0 8px 20px rgba(79,227,193,0.25)",
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] font-mono text-[11px] text-[var(--text-dim)]"
            >
              <Image
                src={social.icon}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-cover"
              />
            </motion.a>
          ))}
        </div>
      </motion.form>
    </div>
  );
}

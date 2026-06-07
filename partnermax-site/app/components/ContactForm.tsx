"use client";

import { useRef, useState } from "react";
import { Send } from "./icons";

/* Contact form. Behaviour follows site.js (validate on blur, clear
   .is-invalid on input, validate-all on submit) then POSTs to
   /api/contact (Resend). Server re-validates.

   `tone="dark"` = the homepage CTA banner (dark glass surface, the
   prototype's styling). `tone="light"` = the standalone /contact page
   (default light .site-contact__form surface, no inline overrides). */

const darkInput = {
  background: "rgba(0,0,0,0.30)",
  borderColor: "rgba(255,255,255,0.15)",
  color: "white",
} as const;
const darkLabel = { color: "rgba(255,255,255,0.85)" } as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  const inputStyle = isDark ? darkInput : undefined;
  const labelStyle = isDark ? darkLabel : undefined;

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fields = () =>
    Array.from(
      formRef.current?.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >("input, select, textarea") ?? []
    );

  const validateField = (
    f: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ) => {
    if (!f.checkValidity()) {
      f.classList.add("is-invalid");
      return false;
    }
    f.classList.remove("is-invalid");
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let ok = true;
    fields().forEach((f) => {
      if (!validateField(f)) ok = false;
    });
    if (!ok) return;

    const form = formRef.current!;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      business: (
        form.elements.namedItem("business") as HTMLInputElement
      ).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      need: (form.elements.namedItem("need") as HTMLSelectElement).value,
      note: (form.elements.namedItem("note") as HTMLTextAreaElement).value.trim(),
    };

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(
          body.error || "Something went wrong. Please email hello@partnermax.ca."
        );
      }
      setStatus("success");
      setMessage("Thanks, we'll be in touch within one business day.");
      form.reset();
      window.setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 6000);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please email hello@partnermax.ca."
      );
    }
  };

  return (
    <form
      ref={formRef}
      id="contact-form"
      className="site-contact__form"
      noValidate
      onSubmit={onSubmit}
      style={
        isDark
          ? {
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.10)",
              padding: 28,
            }
          : undefined
      }
    >
      <div className="site-contact__form-row">
        <div className="pm-field">
          <label className="pm-label" htmlFor="cf-name" style={labelStyle}>
            Your name
          </label>
          <input
            className="pm-input"
            id="cf-name"
            name="name"
            type="text"
            required
            placeholder="Olivia Sandoval"
            style={inputStyle}
            onBlur={(e) => validateField(e.currentTarget)}
            onInput={(e) => e.currentTarget.classList.remove("is-invalid")}
          />
        </div>
        <div className="pm-field">
          <label className="pm-label" htmlFor="cf-business" style={labelStyle}>
            Business
          </label>
          <input
            className="pm-input"
            id="cf-business"
            name="business"
            type="text"
            required
            placeholder="Northbridge Communications"
            style={inputStyle}
            onBlur={(e) => validateField(e.currentTarget)}
            onInput={(e) => e.currentTarget.classList.remove("is-invalid")}
          />
        </div>
      </div>
      <div className="site-contact__form-row">
        <div className="pm-field">
          <label className="pm-label" htmlFor="cf-email" style={labelStyle}>
            Business email
          </label>
          <input
            className="pm-input"
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="ops@northbridge.ca"
            style={inputStyle}
            onBlur={(e) => validateField(e.currentTarget)}
            onInput={(e) => e.currentTarget.classList.remove("is-invalid")}
          />
        </div>
        <div className="pm-field">
          <label className="pm-label" htmlFor="cf-need" style={labelStyle}>
            I&rsquo;m interested in
          </label>
          <select
            className="pm-select"
            id="cf-need"
            name="need"
            required
            defaultValue=""
            style={inputStyle}
            onBlur={(e) => validateField(e.currentTarget)}
            onInput={(e) => e.currentTarget.classList.remove("is-invalid")}
          >
            <option value="">Choose one…</option>
            <option>Wireless · for my business</option>
            <option>Fibre · for my business</option>
            <option>Bundle · multi-service</option>
            <option>Reselling Rogers · as a partner</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>
      <div className="pm-field">
        <label className="pm-label" htmlFor="cf-note" style={labelStyle}>
          Anything we should know?{" "}
          <span
            style={{
              color: isDark
                ? "rgba(255,255,255,0.45)"
                : "var(--pm-text-subtle)",
            }}
          >
            (optional)
          </span>
        </label>
        <textarea
          className="pm-textarea"
          id="cf-note"
          name="note"
          rows={3}
          placeholder="Fleet size, existing contracts, deadlines…"
          style={inputStyle}
        />
      </div>

      <div
        className={
          "site-contact__form-msg" + (status === "success" ? " is-visible" : "")
        }
      >
        {status === "success" ? message : null}
      </div>
      {status === "error" ? (
        <div
          role="alert"
          style={{
            fontFamily: "var(--pm-font-body)",
            fontSize: 15,
            lineHeight: 1.55,
            color: isDark ? "#fff" : "var(--pm-danger-600)",
            padding: "14px 16px",
            background: isDark
              ? "rgba(221,0,0,0.18)"
              : "var(--pm-danger-bg)",
            borderRadius: "var(--pm-radius-sm)",
          }}
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        className="pm-btn pm-btn--primary pm-btn--lg"
        disabled={status === "submitting"}
        style={{ marginTop: 8, justifyContent: "center", padding: "16px 24px" }}
      >
        <span>
          {status === "submitting" ? "Sending…" : "Send to channel team"}
        </span>
        <Send />
      </button>
    </form>
  );
}

import { z } from "zod";

/**
 * ZOD SCHEMAS — shared between client + server.
 *
 * This file is pure (no Next.js server imports), so it can be safely
 * imported by client components (the contact + bug-report forms).
 *
 * The server-side helpers (rate limiting, IP extraction, honeypot
 * validation) live in src/lib/api-utils-server.ts.
 */

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (2+ characters).")
    .max(80, "That name is too long. Please shorten it."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(160, "That email is too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a short subject (3+ characters).")
    .max(120, "Subject is too long. Please shorten it."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a bit more (10+ characters).")
    .max(4000, "Your message is too long. Please keep it under 4000 characters."),
  // Honeypot — must be empty. Bots fill this; humans don't see it.
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export const bugReportSchema = z.object({
  // Kept as plain (possibly empty) strings rather than `.transform()`-ed to
  // `string | null` here — a transform makes zod's output type diverge from
  // its input type, which breaks react-hook-form's zodResolver typing. Empty
  // string -> null conversion happens where it's consumed (the API route),
  // same pattern as the honeypot field below.
  email: z
    .string()
    .trim()
    .max(160, "That email is too long.")
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || z.string().email().safeParse(v).success, {
      message: "Please enter a valid email address.",
    }),
  deviceInfo: z
    .string()
    .trim()
    .max(300, "Device info is too long.")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(10, "Please tell us what happened (10+ characters).")
    .max(4000, "Description is too long. Please keep it under 4000 characters."),
  // Honeypot
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

// NOTE: these are the *input* types (pre-transform/pre-default), which is what
// react-hook-form's `useForm<T>()` and `defaultValues` actually work with — the
// form holds raw field values, and zodResolver validates/transforms them into
// the *output* type only at submit time. Using z.infer (the output type) here
// causes a type mismatch with zodResolver in newer react-hook-form/zod versions
// because fields like the honeypot (`.default("")`) or the bug-report email
// (`.transform(...)`) have a different shape before vs. after parsing.
export type ContactInput = z.input<typeof contactSchema>;
export type BugReportInput = z.input<typeof bugReportSchema>;

// Output types (post-validation/transform) — this is the shape `data` has on
// the server after `schema.safeParse()`, e.g. in the API routes.
export type ContactOutput = z.output<typeof contactSchema>;
export type BugReportOutput = z.output<typeof bugReportSchema>;

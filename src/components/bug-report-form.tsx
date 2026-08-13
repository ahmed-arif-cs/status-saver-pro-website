"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bug, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { bugReportSchema, type BugReportInput } from "@/lib/validation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function BugReportForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<BugReportInput>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      email: "",
      deviceInfo: "",
      description: "",
      website: "",
    },
  });

  const onSubmit = async (values: BugReportInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg = data.error || "Something went wrong. Please try again.";
        setServerError(msg);
        toast.error(msg);
        return;
      }
      toast.success(data.message || "Report submitted. Thank you!");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      const msg = "Network error. Please check your connection and try again.";
      setServerError(msg);
      toast.error(msg);
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="glass-card flex flex-col items-center gap-3 rounded-2xl p-8 text-center"
      >
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="text-title text-foreground">Report received</h3>
        <p className="max-w-md text-body text-muted-foreground">
          Thanks for taking the time to report this. If you shared your email,
          we&apos;ll follow up once we&apos;ve had a chance to look into it.
        </p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => setSubmitted(false)}
        >
          Submit another report
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="glass-card space-y-5 rounded-2xl p-6 sm:p-8"
        noValidate
      >
        {/* Honeypot */}
        <div aria-hidden className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website-hp-bug">Website (leave empty)</label>
          <input
            id="website-hp-bug"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  We&apos;ll only use this to follow up on this specific report.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deviceInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device info (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Samsung A52, Android 13"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  Android version and device model help us reproduce the issue.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What happened?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what you were doing, what you expected, and what actually happened. Steps to reproduce are very welcome."
                  rows={6}
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between">
                <FormMessage />
                <span className="text-meta text-muted-foreground/70">
                  {field.value?.length ?? 0}/4000
                </span>
              </div>
            </FormItem>
          )}
        />

        {serverError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-body text-destructive"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
            <p>{serverError}</p>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta text-muted-foreground">
            Reports go straight to our support inbox. We read every one.
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="shine-on-hover ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-sm shadow-primary/30 hover:bg-primary/90 disabled:opacity-70"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Bug className="h-4 w-4" />
                Submit report
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

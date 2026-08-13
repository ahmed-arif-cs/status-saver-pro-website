"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { siteConfig } from "@/lib/site";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "", // honeypot
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
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
      toast.success(data.message || "Message sent!");
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
        <h3 className="text-title text-foreground">Message sent</h3>
        <p className="max-w-md text-body text-muted-foreground">
          Thanks for reaching out. We&apos;ll get back to you at the email you
          provided within a few business days.
        </p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => setSubmitted(false)}
        >
          Send another message
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
        {/* Honeypot — visually hidden, but discoverable by bots */}
        <div aria-hidden className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website-hp">Website (leave empty)</label>
          <input
            id="website-hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Ayesha Khan"
                    autoComplete="name"
                    aria-describedby="name-help"
                    {...field}
                  />
                </FormControl>
                <FormDescription id="name-help" className="sr-only">
                  Please enter your name so we know how to address you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What's this about?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what's on your mind…"
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
            By submitting, you agree to be contacted at the email above. We
            never share your details.
          </p>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="shine-on-hover ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-sm shadow-primary/30 hover:bg-primary/90 disabled:opacity-70"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </Button>
        </div>

        <p className="text-meta text-muted-foreground/70">
          Or email us directly at{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="font-medium text-primary hover:underline"
          >
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </form>
    </Form>
  );
}

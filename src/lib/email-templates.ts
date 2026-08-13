import { siteConfig } from "@/lib/site";

/**
 * Plain-text + HTML email templates for contact + bug report notifications.
 * Kept minimal, semantic, and on-brand. No external CSS — inline styles only.
 */

const baseStyle = `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1f; background: #f7f7f8; padding: 24px; margin: 0;`;
const cardStyle = `max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);`;
const headerStyle = `background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #f43f5e 100%); padding: 20px 24px; color: #ffffff;`;
const bodyStyle = `padding: 24px;`;
const rowStyle = `padding: 8px 0; border-bottom: 1px solid #f0f0f3;`;
const labelStyle = `font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; font-weight: 600; margin: 0 0 4px 0;`;
const valueStyle = `font-size: 15px; line-height: 1.5; margin: 0; color: #1a1a1f; word-break: break-word;`;
const footerStyle = `padding: 16px 24px; font-size: 12px; color: #999; text-align: center;`;

function shell(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html><body style="${baseStyle}">
  <div style="${cardStyle}">
    <div style="${headerStyle}">
      <strong style="font-size: 16px;">${siteConfig.appName}</strong>
      <div style="font-size: 13px; opacity: 0.85; margin-top: 2px;">${title}</div>
    </div>
    <div style="${bodyStyle}">
      ${bodyHtml}
    </div>
    <div style="${footerStyle}">
      This message was sent from the ${siteConfig.siteUrl} contact form.
      Reply directly to the submitter's email if a reply is expected.
    </div>
  </div>
</body></html>`;
}

export function contactEmailTemplate(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { html: string; text: string; subject: string } {
  const subject = `[Contact] ${input.subject}`;
  const text = [
    `New contact form submission on ${siteConfig.appName}`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    ``,
    `Message:`,
    input.message,
  ].join("\n");

  const html = shell(
    "New contact form submission",
    `
      <div style="${rowStyle}">
        <p style="${labelStyle}">Name</p>
        <p style="${valueStyle}">${escapeHtml(input.name)}</p>
      </div>
      <div style="${rowStyle}">
        <p style="${labelStyle}">Email</p>
        <p style="${valueStyle}"><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></p>
      </div>
      <div style="${rowStyle}">
        <p style="${labelStyle}">Subject</p>
        <p style="${valueStyle}">${escapeHtml(input.subject)}</p>
      </div>
      <div style="padding: 8px 0;">
        <p style="${labelStyle}">Message</p>
        <p style="${valueStyle}; white-space: pre-wrap;">${escapeHtml(input.message)}</p>
      </div>
    `,
  );

  return { html, text, subject };
}

export function bugReportEmailTemplate(input: {
  email?: string | null;
  deviceInfo?: string | null;
  description: string;
}): { html: string; text: string; subject: string } {
  const subject = `[Bug Report] New submission`;
  const text = [
    `New bug report on ${siteConfig.appName}`,
    ``,
    `Email: ${input.email || "(not provided)"}`,
    `Device info: ${input.deviceInfo || "(not provided)"}`,
    ``,
    `Description:`,
    input.description,
  ].join("\n");

  const html = shell(
    "New bug report submission",
    `
      <div style="${rowStyle}">
        <p style="${labelStyle}">Email</p>
        <p style="${valueStyle}">${input.email ? `<a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a>` : "<em>(not provided)</em>"}</p>
      </div>
      <div style="${rowStyle}">
        <p style="${labelStyle}">Device info</p>
        <p style="${valueStyle}">${input.deviceInfo ? escapeHtml(input.deviceInfo) : "<em>(not provided)</em>"}</p>
      </div>
      <div style="padding: 8px 0;">
        <p style="${labelStyle}">Description</p>
        <p style="${valueStyle}; white-space: pre-wrap;">${escapeHtml(input.description)}</p>
      </div>
    `,
  );

  return { html, text, subject };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

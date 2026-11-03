/**
 * VYNTRA Customer Email Service
 * ================================
 * Sends 6 types of branded customer emails via Resend API:
 *  1. Welcome Email        — on sign-up / form submission
 *  2. Promotional Email    — special offers / consultation campaigns
 *  3. Transactional Email  — triggered confirmations (inquiry received, meeting booked)
 *  4. Abandoned Cart Email — follow-up when prospect doesn't complete booking
 *  5. Newsletter Email     — monthly insights & thought leadership
 *  6. Re-engagement Email  — win back inactive leads after 30 days
 */

const ADMIN_EMAIL = 'mythrivaishnavik.int2027g3@gmail.com';
const RESEND_API_KEY_ENV = () =>
  typeof window !== 'undefined'
    ? (import.meta as any).env?.VITE_RESEND_API_KEY || ''
    : '';

// ─── Shared brand constants ───────────────────────────────────────────────────
const BRAND_BLUE      = '#1d4ed8';
const BRAND_BLUE_LIGHT = '#3b82f6';
const BRAND_NAVY      = '#0f172a';
const BRAND_GREEN     = '#10b981';
const SITE_URL        = 'https://sigma-digitalpresence.vercel.app';

// ─── Shared HTML shell ────────────────────────────────────────────────────────
function emailShell(body: string, previewText = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>` : ''}
  <title>VYNTRA</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f1f5f9;padding:32px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(0,0,0,0.07);">
        ${body}
      </table>

      <!-- Footer meta -->
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;margin-top:20px;">
        <tr><td style="text-align:center;font-size:11px;color:#94a3b8;line-height:1.7;">
          You received this because you connected with VYNTRA Operations &amp; Advisory.<br>
          <a href="${SITE_URL}" style="color:#64748b;">Visit our site</a> &nbsp;|&nbsp;
          <a href="mailto:${ADMIN_EMAIL}" style="color:#64748b;">Contact us</a><br><br>
          © 2026 VYNTRA Operations &amp; Advisory. All rights reserved.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Shared header block ──────────────────────────────────────────────────────
function emailHeader(headline: string, subline: string): string {
  return `
  <tr>
    <td style="background:linear-gradient(135deg,${BRAND_BLUE} 0%,${BRAND_BLUE_LIGHT} 100%);padding:32px 36px;">
      <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);">
        VYNTRA OPERATIONS &amp; ADVISORY
      </p>
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#ffffff;line-height:1.25;">${headline}</h1>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.85);">${subline}</p>
    </td>
  </tr>`;
}

// ─── Shared CTA button ────────────────────────────────────────────────────────
function ctaButton(label: string, url: string, color = BRAND_BLUE): string {
  return `
  <table cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
    <tr>
      <td style="background:${color};border-radius:50px;padding:14px 32px;text-align:center;">
        <a href="${url}" style="color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.3px;white-space:nowrap;">
          ${label} →
        </a>
      </td>
    </tr>
  </table>`;
}

// ─── Divider ──────────────────────────────────────────────────────────────────
const divider = `<tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:0;"></td></tr>`;

// ─── Dark footer inside card ──────────────────────────────────────────────────
function cardFooter(note: string): string {
  return `
  <tr>
    <td style="background:${BRAND_NAVY};padding:20px 36px;text-align:center;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">VYNTRA Intelligence Hub</p>
      <p style="margin:0;font-size:11px;color:#64748b;">${note}</p>
    </td>
  </tr>`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. WELCOME EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface WelcomeEmailData {
  toEmail: string;
  firstName: string;
  company?: string;
}

export function buildWelcomeEmail(data: WelcomeEmailData): string {
  const { firstName, company } = data;
  const companyLine = company ? ` from <strong>${company}</strong>` : '';

  return emailShell(`
    ${emailHeader(
      `Welcome to VYNTRA, ${firstName}!`,
      'Your operational excellence journey starts here.'
    )}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.7;">
        Hello <strong>${firstName}</strong>${companyLine},
      </p>
      <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.8;">
        Thank you for connecting with <strong>VYNTRA Operations &amp; Advisory</strong>. We help
        industrial, manufacturing, and enterprise organisations unlock measurable performance gains
        through <strong>Lean Six Sigma, AI-driven diagnostics,</strong> and
        <strong>Digital Operations Intelligence</strong>.
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.8;">
        Here's what you can expect from us:
      </p>

      <!-- 3 Value Pillars -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;border-spacing:0 10px;">
        ${[
          ['🎯', 'Precision Diagnostics', 'Root-cause analysis and bottleneck identification within your operational value chain.'],
          ['⚙️', 'Process Transformation', 'Lean Six Sigma & AI-powered redesign to eliminate waste and compress cycle times.'],
          ['📊', 'Intelligence Dashboards', 'Real-time KPI visibility so leadership always has a clear operational picture.'],
        ].map(([icon, title, desc]) => `
        <tr>
          <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;">
            <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">${icon}&nbsp; ${title}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#64748b;line-height:1.6;">${desc}</p>
          </td>
        </tr>`).join('')}
      </table>

      <p style="margin:28px 0 4px;font-size:14px;color:#475569;line-height:1.8;">
        Ready to explore how VYNTRA can drive results for your organisation?
      </p>
      ${ctaButton('Book a Free Discovery Call', `${SITE_URL}/contact`)}
    </td></tr>
    ${divider}
    ${cardFooter('Automated Welcome | VYNTRA Operations & Advisory © 2026')}
  `, `Welcome to VYNTRA, ${firstName} — your operations intelligence journey begins.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. PROMOTIONAL EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface PromotionalEmailData {
  toEmail: string;
  firstName: string;
  offerTitle: string;
  offerDescription: string;
  deadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function buildPromotionalEmail(data: PromotionalEmailData): string {
  const {
    firstName, offerTitle, offerDescription,
    deadline, ctaLabel = 'Claim This Offer', ctaUrl = `${SITE_URL}/contact`
  } = data;

  const deadlineBadge = deadline
    ? `<p style="margin:12px 0 0;display:inline-block;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:12px;font-weight:700;padding:6px 14px;border-radius:6px;">⏰ Offer expires: ${deadline}</p>`
    : '';

  return emailShell(`
    ${emailHeader('🎁 Exclusive Offer Inside', 'A limited-time opportunity crafted for leaders like you.')}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.7;">
        Hi <strong>${firstName}</strong>,
      </p>

      <!-- Offer Card -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:linear-gradient(135deg,#eff6ff 0%,#f0fdf4 100%);border:1px solid #bfdbfe;border-radius:16px;padding:24px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND_BLUE};">Limited Time Offer</p>
            <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#0f172a;">${offerTitle}</h2>
            <p style="margin:0;font-size:14px;color:#475569;line-height:1.8;">${offerDescription}</p>
            ${deadlineBadge}
          </td>
        </tr>
      </table>

      <p style="margin:24px 0 8px;font-size:14px;color:#475569;line-height:1.8;">
        Organisations partnering with VYNTRA have achieved:
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;border-spacing:8px;">
        <tr>
          ${[
            ['↓ 30%', 'Operational Costs'],
            ['↓ 45%', 'Defect Rates'],
            ['↑ 2.5×', 'Throughput Speed'],
          ].map(([num, label]) => `
          <td style="width:33%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;text-align:center;">
            <p style="margin:0;font-size:20px;font-weight:800;color:${BRAND_BLUE};">${num}</p>
            <p style="margin:4px 0 0;font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;">${label}</p>
          </td>`).join('')}
        </tr>
      </table>

      ${ctaButton(ctaLabel, ctaUrl, BRAND_BLUE)}
    </td></tr>
    ${divider}
    ${cardFooter('Promotional Communication | VYNTRA Operations & Advisory © 2026')}
  `, `Exclusive VYNTRA offer for ${firstName} — limited time.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. TRANSACTIONAL EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface TransactionalEmailData {
  toEmail: string;
  firstName: string;
  company: string;
  primaryGoal: string;
  submittedAt: string;
  refId?: string;
}

export function buildTransactionalEmail(data: TransactionalEmailData): string {
  const { firstName, company, primaryGoal, submittedAt, refId } = data;
  const reference = refId || `VYN-${Date.now().toString(36).toUpperCase()}`;

  return emailShell(`
    ${emailHeader('✅ Inquiry Received', 'We have your submission — here\'s your confirmation.')}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.7;">
        Hi <strong>${firstName}</strong>,
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.8;">
        Your inquiry has been successfully received and logged in our system. A senior VYNTRA
        consultant will review your submission and reach out within <strong>1–2 business days</strong>.
      </p>

      <!-- Confirmation Card -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;">
            <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:1px;">Submission Summary</p>
            ${[
              ['Reference ID', reference],
              ['Organisation', company],
              ['Primary Goal', primaryGoal],
              ['Submitted At', submittedAt],
            ].map(([k, v]) => `
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
              <tr>
                <td style="font-size:11px;color:#64748b;font-weight:600;width:38%;">${k}</td>
                <td style="font-size:13px;color:#0f172a;font-weight:700;">${v}</td>
              </tr>
            </table>`).join('')}
          </td>
        </tr>
      </table>

      <p style="margin:24px 0 8px;font-size:14px;color:#475569;line-height:1.8;">
        While you wait, explore how VYNTRA has driven results across similar organisations:
      </p>
      ${ctaButton('View Our Impact Stories', `${SITE_URL}/outcomes`, BRAND_BLUE)}
    </td></tr>
    ${divider}
    ${cardFooter(`Ref: ${reference} | Automated Confirmation | VYNTRA © 2026`)}
  `, `We received your inquiry, ${firstName} — confirmation ref ${reference}.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. ABANDONED CART (ABANDONED BOOKING) EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface AbandonedCartEmailData {
  toEmail: string;
  firstName: string;
  lastInterest?: string;  // e.g. "Lean Six Sigma Consulting" or page they visited
  hoursAgo?: number;
}

export function buildAbandonedCartEmail(data: AbandonedCartEmailData): string {
  const { firstName, lastInterest = 'our consulting services', hoursAgo = 24 } = data;

  return emailShell(`
    ${emailHeader('👋 You Left Something Behind', 'Your operational transformation is one step away.')}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.7;">
        Hi <strong>${firstName}</strong>,
      </p>
      <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.8;">
        We noticed you explored <strong>${lastInterest}</strong> on the VYNTRA platform
        about <strong>${hoursAgo} hours ago</strong>, but didn't complete your discovery call booking.
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.8;">
        No pressure — but here's what you'd be unlocking with a 30-minute session:
      </p>

      <!-- Value list -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${[
          ['🔍', 'Free Operational Diagnostic', 'A rapid assessment of your biggest bottlenecks — no strings attached.'],
          ['📐', 'Custom Roadmap Preview', 'A tailored transformation path built around your industry and goals.'],
          ['💡', 'ROI Estimate', 'A clear projection of potential cost savings and throughput gains.'],
        ].map(([icon, title, desc]) => `
        <tr>
          <td style="padding:0 0 10px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:#f8fafc;border-left:3px solid ${BRAND_BLUE};border-radius:0 10px 10px 0;padding:12px 16px;">
                  <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">${icon} ${title}</p>
                  <p style="margin:4px 0 0;font-size:12px;color:#64748b;">${desc}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`).join('')}
      </table>

      ${ctaButton('Complete My Booking Now', `${SITE_URL}/contact`, BRAND_GREEN)}
      <p style="margin:0 0 24px;font-size:12px;color:#94a3b8;text-align:center;">
        This session is completely free. No commitment required.
      </p>
    </td></tr>
    ${divider}
    ${cardFooter('Follow-up Reminder | VYNTRA Operations & Advisory © 2026')}
  `, `${firstName}, you left your discovery call unfinished — pick up where you left off.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. NEWSLETTER EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface NewsletterEmailData {
  toEmail: string;
  firstName: string;
  edition: string;       // e.g. "November 2026"
  articles: { headline: string; summary: string; tag: string }[];
  insightStat?: { number: string; label: string };
}

export function buildNewsletterEmail(data: NewsletterEmailData): string {
  const { firstName, edition, articles, insightStat } = data;

  const articleRows = articles.map(a => `
  <tr>
    <td style="padding:0 0 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;">
            <p style="margin:0 0 6px;">
              <span style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;background:#eff6ff;color:${BRAND_BLUE};border:1px solid #bfdbfe;padding:3px 8px;border-radius:4px;">${a.tag}</span>
            </p>
            <p style="margin:6px 0 8px;font-size:15px;font-weight:700;color:#0f172a;">${a.headline}</p>
            <p style="margin:0;font-size:13px;color:#64748b;line-height:1.7;">${a.summary}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`).join('');

  const statBlock = insightStat ? `
  <tr>
    <td style="padding:0 0 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:linear-gradient(135deg,${BRAND_BLUE} 0%,${BRAND_BLUE_LIGHT} 100%);border-radius:14px;padding:24px;text-align:center;">
            <p style="margin:0;font-size:42px;font-weight:800;color:#ffffff;">${insightStat.number}</p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">${insightStat.label}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>` : '';

  return emailShell(`
    ${emailHeader(`📬 VYNTRA Intelligence Brief`, `${edition} Edition — Insights for Operational Leaders`)}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.8;">
        Hi <strong>${firstName}</strong>, here's your monthly roundup of operational intelligence,
        industry benchmarks, and transformation insights from the VYNTRA team.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        ${statBlock}
        ${articleRows}
      </table>

      ${ctaButton('Explore All Insights on VYNTRA', SITE_URL)}
    </td></tr>
    ${divider}
    ${cardFooter(`${edition} Intelligence Brief | VYNTRA Operations & Advisory © 2026`)}
  `, `Your ${edition} VYNTRA Intelligence Brief is here — insights for operational leaders.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. RE-ENGAGEMENT EMAIL
// ═══════════════════════════════════════════════════════════════════════════════
export interface ReEngagementEmailData {
  toEmail: string;
  firstName: string;
  daysSinceLastContact: number;
  previousInterest?: string;
}

export function buildReEngagementEmail(data: ReEngagementEmailData): string {
  const { firstName, daysSinceLastContact, previousInterest = 'operational transformation' } = data;

  return emailShell(`
    ${emailHeader(`We Miss You, ${firstName}`, 'It\'s been a while — has anything changed in your operations?')}
    <tr><td style="padding:36px 36px 8px;">
      <p style="margin:0 0 16px;font-size:15px;color:#1e293b;line-height:1.7;">
        Hi <strong>${firstName}</strong>,
      </p>
      <p style="margin:0 0 16px;font-size:14px;color:#475569;line-height:1.8;">
        It's been <strong>${daysSinceLastContact} days</strong> since you last connected with us about
        <strong>${previousInterest}</strong>. Operational challenges don't pause — and neither do we.
      </p>
      <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.8;">
        Since we last spoke, VYNTRA has helped organisations like yours:
      </p>

      <!-- Results grid -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;border-spacing:8px;margin-bottom:24px;">
        <tr>
          ${[
            [`${BRAND_GREEN}`, '↓ 38%', 'Scrap & Rework Costs'],
            [BRAND_BLUE, '↑ 52%', 'Line Throughput'],
            ['#7c3aed', '↓ 61%', 'Mean Time to Repair'],
          ].map(([color, num, label]) => `
          <td style="width:33%;background:#f8fafc;border-top:3px solid ${color};border-radius:0 0 10px 10px;padding:14px;text-align:center;">
            <p style="margin:0;font-size:20px;font-weight:800;color:${color};">${num}</p>
            <p style="margin:4px 0 0;font-size:10px;color:#64748b;font-weight:600;text-transform:uppercase;">${label}</p>
          </td>`).join('')}
        </tr>
      </table>

      <!-- Soft re-engage prompt -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:18px 20px;">
            <p style="margin:0;font-size:14px;color:#92400e;line-height:1.8;">
              💬 <strong>Quick question:</strong> Has anything changed in your operational priorities
              recently? We'd love to reconnect and see if VYNTRA can help — even if the timing wasn't
              right before.
            </p>
          </td>
        </tr>
      </table>

      ${ctaButton("Let's Reconnect", `${SITE_URL}/contact`, '#7c3aed')}
    </td></tr>
    ${divider}
    ${cardFooter('Re-engagement | VYNTRA Operations & Advisory © 2026')}
  `, `${firstName}, it's been ${daysSinceLastContact} days — VYNTRA wants to reconnect.`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DISPATCHER — send any of the 6 email types
// ═══════════════════════════════════════════════════════════════════════════════
export type EmailType =
  | 'welcome'
  | 'promotional'
  | 'transactional'
  | 'abandoned-cart'
  | 'newsletter'
  | 're-engagement';

export interface SendEmailOptions {
  type: EmailType;
  to: string;
  subject: string;
  html: string;
}

export async function sendCustomerEmail(opts: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const key = RESEND_API_KEY_ENV();
  if (!key) {
    console.warn('[VYNTRA Emails] No Resend API key found in VITE_RESEND_API_KEY');
    return { success: false, error: 'Missing API key' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'VYNTRA Analytics <onboarding@resend.dev>',
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
      }),
    });

    const data = await res.json();
    if (res.ok && data.id) {
      console.info(`[VYNTRA Emails] ✅ ${opts.type} email sent → ID: ${data.id}`);
      return { success: true, id: data.id };
    } else {
      console.warn(`[VYNTRA Emails] ⚠️ ${opts.type} email failed:`, data);
      return { success: false, error: JSON.stringify(data) };
    }
  } catch (err: any) {
    console.error(`[VYNTRA Emails] ❌ Network error:`, err);
    return { success: false, error: err.message };
  }
}

// ─── Convenience helpers ──────────────────────────────────────────────────────

/** Called when a prospect submits the Enterprise Service Form */
export async function sendWelcomeEmail(data: WelcomeEmailData) {
  return sendCustomerEmail({
    type: 'welcome',
    to: data.toEmail,
    subject: `Welcome to VYNTRA, ${data.firstName}! Your operations journey starts now.`,
    html: buildWelcomeEmail(data),
  });
}

/** Push a campaign offer to a prospect */
export async function sendPromotionalEmail(data: PromotionalEmailData) {
  return sendCustomerEmail({
    type: 'promotional',
    to: data.toEmail,
    subject: `🎁 ${data.offerTitle} — Exclusive VYNTRA Offer`,
    html: buildPromotionalEmail(data),
  });
}

/** Auto-confirm inquiry submission */
export async function sendTransactionalEmail(data: TransactionalEmailData) {
  return sendCustomerEmail({
    type: 'transactional',
    to: data.toEmail,
    subject: `✅ VYNTRA Inquiry Confirmed — Ref: VYN-${Date.now().toString(36).toUpperCase()}`,
    html: buildTransactionalEmail(data),
  });
}

/** Follow-up when prospect doesn't complete a booking */
export async function sendAbandonedCartEmail(data: AbandonedCartEmailData) {
  return sendCustomerEmail({
    type: 'abandoned-cart',
    to: data.toEmail,
    subject: `${data.firstName}, your VYNTRA discovery session is still waiting ⏳`,
    html: buildAbandonedCartEmail(data),
  });
}

/** Monthly newsletter */
export async function sendNewsletterEmail(data: NewsletterEmailData) {
  return sendCustomerEmail({
    type: 'newsletter',
    to: data.toEmail,
    subject: `📬 VYNTRA Intelligence Brief — ${data.edition}`,
    html: buildNewsletterEmail(data),
  });
}

/** Re-engage inactive leads */
export async function sendReEngagementEmail(data: ReEngagementEmailData) {
  return sendCustomerEmail({
    type: 're-engagement',
    to: data.toEmail,
    subject: `${data.firstName}, we'd love to reconnect — a lot has changed at VYNTRA 💡`,
    html: buildReEngagementEmail(data),
  });
}


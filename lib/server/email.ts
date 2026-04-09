import 'server-only';

// Resend is used for transactional email notifications.
// RESEND_API_KEY must be set in environment variables.
// Until a custom domain is verified on resend.com, the from address
// must remain onboarding@resend.dev.

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO = 'whomemodelagency@gmail.com';
const FROM = 'ME Agency <onboarding@resend.dev>';

type SendResult = { ok: true } | { ok: false; error: string };

async function send(subject: string, html: string): Promise<SendResult> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping email notification');
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM, to: [TO], subject, html }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('[email] Resend error:', res.status, text);
      return { ok: false, error: `Resend ${res.status}: ${text}` };
    }

    return { ok: true };
  } catch (err) {
    console.error('[email] fetch failed:', err);
    return { ok: false, error: String(err) };
  }
}

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:8px 16px 8px 0;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 0;font-size:14px;color:#000;word-break:break-word">${value}</td>
    </tr>`;
}

function layout(title: string, badge: string, tableRows: string) {
  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f3f3f3;font-family:sans-serif">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;padding:40px 20px">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:3px solid #000;max-width:600px;width:100%">
            <tr>
              <td style="background:#000;padding:24px 32px">
                <span style="font-family:serif;font-size:28px;font-weight:bold;color:#fff;letter-spacing:-0.02em">ME</span>
                <span style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.5);margin-left:16px">${badge}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px">
                <p style="font-family:serif;font-size:22px;font-weight:bold;margin:0 0 24px 0">${title}</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;border-top:2px solid #000">
                  ${tableRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:2px solid #eee">
                <p style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#999;margin:0">ME Modeling Agency — notification</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>`;
}

export async function sendJoinNotification(data: {
  fullName: string;
  email: string;
  location: string;
  instagram?: string;
  about: string;
}): Promise<SendResult> {
  const html = layout(
    `New application — ${data.fullName}`,
    'Join Application',
    row('Name', data.fullName) +
    row('Email', `<a href="mailto:${data.email}" style="color:#000">${data.email}</a>`) +
    row('Location', data.location) +
    row('Instagram', data.instagram) +
    row('About', data.about.replace(/\n/g, '<br>'))
  );

  return send(`New Model Application — ${data.fullName}`, html);
}

export async function sendBookingNotification(data: {
  clientName: string;
  email: string;
  projectType: string;
  projectDate: string;
  projectDetails: string;
  budgetRange?: string;
  preferredModels?: string[];
}): Promise<SendResult> {
  const html = layout(
    `New booking — ${data.clientName}`,
    'Booking Request',
    row('Client', data.clientName) +
    row('Email', `<a href="mailto:${data.email}" style="color:#000">${data.email}</a>`) +
    row('Project type', data.projectType) +
    row('Date', data.projectDate) +
    row('Budget', data.budgetRange) +
    row('Preferred models', data.preferredModels?.join(', ')) +
    row('Details', data.projectDetails.replace(/\n/g, '<br>'))
  );

  return send(`New Booking Request — ${data.clientName}`, html);
}

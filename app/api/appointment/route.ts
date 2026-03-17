import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ── Validation schema (mirrors the frontend) ──────────────────
const appointmentSchema = z.object({
  firstName:    z.string().min(2),
  lastName:     z.string().min(2),
  email:        z.string().email(),
  phone:        z.string().min(10),
  service:      z.string().min(1),
  date:         z.string().min(1),
  time:         z.string().min(1),
  isNewPatient: z.enum(['yes', 'no']),
  insurance:    z.string().optional(),
  notes:        z.string().max(500).optional(),
  consent:      z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = appointmentSchema.parse(body);

    const clinicEmail = process.env.CLINIC_EMAIL || 'info@brightsmileclinic.com';
    const resendKey   = process.env.RESEND_API_KEY;

    if (resendKey) {
      // ── Send via Resend ─────────────────────────────────────
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);

      // Notify the clinic
      await resend.emails.send({
        from:    'BrightSmile Booking <noreply@brightsmileclinic.com>',
        to:      clinicEmail,
        subject: `New Appointment Request – ${data.firstName} ${data.lastName}`,
        html:    buildClinicEmail(data),
      });

      // Confirmation to patient
      await resend.emails.send({
        from:    'BrightSmile Dental Clinic <noreply@brightsmileclinic.com>',
        to:      data.email,
        subject: 'Appointment Request Received – BrightSmile Dental Clinic',
        html:    buildPatientEmail(data),
      });
    } else {
      // Development fallback – just log
      console.log('[Appointment Request]', {
        patient: `${data.firstName} ${data.lastName}`,
        email:   data.email,
        service: data.service,
        date:    `${data.date} at ${data.time}`,
      });
    }

    return NextResponse.json({ success: true, message: 'Appointment request submitted successfully.' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('[Appointment API Error]:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}

// ── Email templates ───────────────────────────────────────────
function buildClinicEmail(data: z.infer<typeof appointmentSchema>) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #0284c7; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">🦷 New Appointment Request</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${row('Patient', `${data.firstName} ${data.lastName}`)}
          ${row('Email', data.email)}
          ${row('Phone', data.phone)}
          ${row('Service', data.service)}
          ${row('Preferred Date', data.date)}
          ${row('Preferred Time', data.time)}
          ${row('New Patient', data.isNewPatient === 'yes' ? '✅ Yes' : '↩ Returning')}
          ${row('Insurance', data.insurance || 'Not provided')}
          ${row('Notes', data.notes || '—')}
        </table>
        <p style="color: #64748b; font-size: 13px; margin-top: 20px;">
          Please contact the patient to confirm availability within 2 hours.
        </p>
      </div>
    </div>
  `;
}

function buildPatientEmail(data: z.infer<typeof appointmentSchema>) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0284c7, #0d9488); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 8px;">🦷</div>
        <h1 style="margin: 0; font-size: 24px;">Appointment Request Received!</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">BrightSmile Dental Clinic</p>
      </div>
      <div style="background: white; padding: 28px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
        <p style="color: #374151; font-size: 15px;">Dear ${data.firstName},</p>
        <p style="color: #6b7280; line-height: 1.6;">
          Thank you for choosing BrightSmile Dental Clinic! We've received your appointment request and
          our team will confirm your booking within <strong>2 hours</strong> via email or phone.
        </p>
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Your Request Summary</h3>
          ${summaryRow('Service', data.service)}
          ${summaryRow('Preferred Date', data.date)}
          ${summaryRow('Preferred Time', data.time)}
        </div>
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          If you have any questions or need to make changes, please call us at
          <a href="tel:+15551234567" style="color: #0284c7;">(555) 123-4567</a> or reply to this email.
        </p>
        <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            123 Dental Avenue, Suite 200 · New York, NY 10001<br>
            (555) 123-4567 · info@brightsmileclinic.com
          </p>
        </div>
      </div>
    </div>
  `;
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 8px 12px; font-weight: bold; font-size: 13px; color: #374151; width: 35%; border-bottom: 1px solid #e2e8f0;">${label}</td>
      <td style="padding: 8px 12px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e2e8f0;">${value}</td>
    </tr>
  `;
}

function summaryRow(label: string, value: string) {
  return `<p style="margin: 4px 0; font-size: 14px; color: #374151;"><strong>${label}:</strong> ${value}</p>`;
}

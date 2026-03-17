import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  phone:   z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(1000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    const clinicEmail = process.env.CLINIC_EMAIL || 'info@brightsmileclinic.com';
    const resendKey   = process.env.RESEND_API_KEY;

    if (resendKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from:    'BrightSmile Website <noreply@brightsmileclinic.com>',
        to:      clinicEmail,
        reply_to: data.email,
        subject: `Website Contact: ${data.subject} – ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0284c7; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">New Website Contact Form Submission</h2>
            </div>
            <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 12px; border-left: 3px solid #0284c7; border-radius: 4px;">
                ${data.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        `,
      });

      // Auto-reply to sender
      await resend.emails.send({
        from:    'BrightSmile Dental Clinic <noreply@brightsmileclinic.com>',
        to:      data.email,
        subject: 'We received your message – BrightSmile Dental Clinic',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0284c7, #0d9488); color: white; padding: 28px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 22px;">🦷 Message Received!</h1>
            </div>
            <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
              <p>Hi ${data.name},</p>
              <p style="color: #6b7280; line-height: 1.6;">
                Thank you for contacting BrightSmile Dental Clinic. We've received your message regarding
                "<strong>${data.subject}</strong>" and will get back to you within <strong>24 hours</strong>.
              </p>
              <p style="color: #6b7280;">
                Need immediate assistance? Call us at
                <a href="tel:+15551234567" style="color: #0284c7;">(555) 123-4567</a>.
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; text-align: center;">
                BrightSmile Dental Clinic · 123 Dental Avenue, Suite 200, New York, NY 10001
              </p>
            </div>
          </div>
        `,
      });
    } else {
      console.log('[Contact Form]', {
        from:    data.name,
        email:   data.email,
        subject: data.subject,
        message: data.message.substring(0, 100),
      });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('[Contact API Error]:', error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}

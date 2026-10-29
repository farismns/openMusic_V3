import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content, playlistId) {
    const message = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: targetEmail,
      subject: `Export Playlist ${playlistId}`,
      text: 'Berikut hasil ekspor playlist Anda dalam format JSON.',
      attachments: [
        {
          filename: `playlist-${playlistId}.json`,
          content,
        },
      ],
    };

    await this._transporter.sendMail(message);
    console.log(`📨 Email berhasil dikirim ke ${targetEmail}`);
  }
}

export default MailSender;

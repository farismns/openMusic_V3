import amqp from 'amqplib';
import dotenv from 'dotenv';
import PlaylistService from './services/PlaylistService.js';
import MailSender from './services/MailSender.js';
import Listener from './listener.js';

dotenv.config();

const RABBITMQ_SERVER = process.env.RABBITMQ_SERVER;
const QUEUE = process.env.EXPORT_QUEUE_NAME || 'export:playlists';

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });
  console.log(`Consumer berjalan, mendengarkan queue: ${QUEUE}`);

  channel.consume(QUEUE, listener.listen, { noAck: true });

  // Tutup koneksi dengan aman jika proses dihentikan
  process.on('SIGINT', async () => {
    console.log('\n Menutup koneksi RabbitMQ...');
    await channel.close();
    await connection.close();
    process.exit(0);
  });
};

init();

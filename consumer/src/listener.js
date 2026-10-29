class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      console.log(`Pesan diterima untuk playlist: ${playlistId}`);

      // Ambil data playlist
      const playlistData = await this._playlistService.getPlaylistById(playlistId);
      const exportedJson = JSON.stringify(playlistData, null, 2);

      // Kirim email
      await this._mailSender.sendEmail(targetEmail, exportedJson, playlistId);

      console.log(`Playlist ${playlistId} berhasil diekspor dan dikirim ke ${targetEmail}`);
    } catch (error) {
      console.error('Gagal memproses pesan:', error.message);
    }
  }
}

export default Listener;

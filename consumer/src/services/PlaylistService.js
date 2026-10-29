import pool from '../config/db.js';

class PlaylistService {
  async getPlaylistById(playlistId) {
    const playlistResult = await pool.query('SELECT id, name FROM playlists WHERE id = $1', [playlistId]);

    if (!playlistResult.rowCount) {
      throw new Error('Playlist not found');
    }

    const playlist = playlistResult.rows[0];

    const songsResult = await pool.query(
      `SELECT s.id, s.title, s.performer
       FROM playlistsongs ps
       JOIN songs s ON ps.song_id = s.id
       WHERE ps.playlist_id = $1`,
      [playlistId]
    );

    return {
      playlist: {
        id: playlist.id,
        name: playlist.name,
        songs: songsResult.rows,
      },
    };
  }
}

export default PlaylistService;

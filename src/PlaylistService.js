const { Pool } = require('pg');
const { mapToPlaylist } = require('./utils');

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylists(playlistId) {
        const query = {
            text: `
            select 
                p.id,
                p."name",
                s.id as song_id,
                s.title,
                s.performer 
            from playlist_songs ps
            left join playlists p on ps.playlist_id = p.id 
            left join songs s on ps.song_id = s.id 
            where p.id = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        const playlist = {
            id: result.rows[0].id,
            name: result.rows[0].name,
            songs: result.rows.map(mapToPlaylist),
        };

        return playlist;
    }
}

module.exports = PlaylistService;

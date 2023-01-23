const mapToPlaylist = ({
    song_id,
    title,
    performer,
}) => ({
    id: song_id,
    title,
    performer,
});

module.exports = { mapToPlaylist };

const { DateTime } = require("luxon");
const dateFilter = require('nunjucks-date-filter');

module.exports = function(config) {
   
    config.addFilter("date", dateFilter);



    // config.addPassthroughCopy("./admin");
    config.addPassthroughCopy("./assets");
    config.addPassthroughCopy("./assets/**/*");

    config.addCollection("episodes", function(collection) {
        return collection.getFilteredByTag('episode');
    });
    config.addCollection("upcoming", function(collection) {
        const episodes = collection.getFilteredByTag('episode');
        const upcoming = episodes.filter(episode => {
            const now = DateTime.local();
            const episodeDateTime = DateTime.fromISO(episode.data.airDate)
            return episodeDateTime >= now
        })
        return upcoming
    });
    config.addCollection("previous", function(collection) {
        const episodes = collection.getFilteredByTag('episode');
        const upcoming = episodes.filter(episode => {
            const now = DateTime.local();
            const episodeDateTime = DateTime.fromISO(episode.data.airDate)
            return episodeDateTime < now
        })
        return upcoming
    });
 

}
require('dotenv').config();

module.exports = {
    env: {
        MONGODB_URI:process.env.MONGODB_URI,
        MONGODB_DB:process.env.MONGODB_DB,
        CLOUDINARY_URL:process.env.CLOUDINARY_URL
    },
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true 
        return config;
    },
}
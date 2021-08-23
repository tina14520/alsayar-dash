module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    // lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/styles/variables.scss";
                @import "@/styles/grid.scss";
                @import "@/styles/reboot.scss";
                @import "@/styles/transitions.scss";
                @import "@/styles/tables.scss";
                @import "@/styles/loading.scss";
                @import "@/styles/snow.scss";
              `
            }
        }
    },
};
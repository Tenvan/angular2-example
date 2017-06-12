const {
        CSSPlugin,
        FuseBox,
        HTMLPlugin,
        JSONPlugin,
        RawPlugin,
        SassPlugin,
        TypeScriptHelpers,
        WebIndexPlugin,
      } = require('fuse-box');

const {Ng2TemplatePlugin} = require('ng2-fused');

const path = require('path');

const fuse = FuseBox.init({
  homeDir: `src/`,
  output:  `dist/$name.js`,
  plugins: [
    // Ng2TemplatePlugin(),
    // ['*.html', RawPlugin()],
    // ['*.css', RawPlugin()],
    WebIndexPlugin({
      title:    'FuseBox + Angular',
      template: 'src/index.html',
    }), [
      SassPlugin({
        outputStyle: 'compressed',
        importer:    true,
      }),
      CSSPlugin(),
    ],
    TypeScriptHelpers(),
    JSONPlugin(),
    HTMLPlugin({
      useDefault: false,
    }),
  ],
});

fuse.register('rectangular', {homeDir: 'node_modules/rectangular', main: 'index.js', instructions: '**/**.js'});

// setup development sever
fuse.dev({
  port: 4445,
});

// bundle vendor
fuse.bundle('vendor').hmr().instructions(' ~ main.ts');

// bundle application
fuse.bundle('app').sourceMaps(true).instructions(' !> [main.ts]').watch().hmr();

// run the factory
fuse.run();
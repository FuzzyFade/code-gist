import * as webpack from 'webpack';
import type { WebpackPluginInstance, Compiler } from 'webpack';
import { ConcatSource } from 'webpack-sources';

export interface Options {
  getCode: () => string
  filter?: (name: string) => boolean
}

export default class AdvanceDefinedPlugin implements WebpackPluginInstance {
  private readonly pluginName = this.constructor.name;

  /**
   * Default options
   */
  private readonly options: Partial<Options> = {
    filter: (name) => name.includes('.js')
  };

  constructor(options: Options) {
    this.options = { ...this.options, ...options };
  }

  private injectData(filename: string, compilation: webpack.Compilation) {
    const { filter, getCode } = this.options

    if (!filter(filename)) return;

    const asset = compilation.getAsset(filename);
    const contents = asset.source.source();

    compilation.updateAsset(
      filename,
      new ConcatSource(
        getCode(),
        String(contents),
      )
    );
  }

  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(this.pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.pluginName,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
          additionalAssets: true
        },
        (assets) => {
          Object.keys(assets).forEach(fileName => {
            this.injectData(fileName, compilation);
          });
        }
      );
    });
  }
}
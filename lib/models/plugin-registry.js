'use strict';

const path = require('path');

function isPluginPack(addon) {
  return addon.pkg.keywords.includes('ember-cli-addon-docs-plugin-pack');
}

function isPlugin(addon) {
  return addon.pkg.keywords.includes('ember-cli-addon-docs-plugin');
}

class PluginRegistry {
  constructor({ project, parentAddon }) {
    this.project = project;
    this.parentAddon = parentAddon;

    this._plugins = null;
    this._docsGenerators = null;
  }

  get plugins() {
    if (this._plugins === null) {
      this._plugins = this._discoverPlugins(this.project.addons || []);
    }

    return this._plugins;
  }

  get docsGenerators() {
    if (this._docsGenerators === null) {
      let { plugins, parentAddon, project } = this;
      let addonSource = path.resolve(parentAddon.root, parentAddon.treePaths.addon);

      this._docsGenerators = plugins.map(p => p.createDocsGenerator(
        addonSource,
        {
          destDir: 'docs',
          project
        }
      ));
    }

    return this._docsGenerators;
  }

  _discoverPlugins(addons) {
    return addons.reduce((plugins, addon) => {
      if (isPlugin(addon)) {
        plugins.push(addon);
      } else if (isPluginPack) {
        plugins.push(...this._discoverPlugins(addon.addons));
      }

      return plugins;
    }, []);
  }
}

module.exports = PluginRegistry;

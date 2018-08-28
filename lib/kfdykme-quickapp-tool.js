'use babel';

import KfdykmeQuickappToolView from './kfdykme-quickapp-tool-view';
import { CompositeDisposable } from 'atom';

export default {

  kfdykmeQuickappToolView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.kfdykmeQuickappToolView = new KfdykmeQuickappToolView(state.kfdykmeQuickappToolViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.kfdykmeQuickappToolView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'kfdykme-quickapp-tool:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.kfdykmeQuickappToolView.destroy();
  },

  serialize() {
    return {
      kfdykmeQuickappToolViewState: this.kfdykmeQuickappToolView.serialize()
    };
  },

  toggle() {
    console.log('KfdykmeQuickappTool was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

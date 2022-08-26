import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';
import { getMonetPalette, MonetPalette } from 'monet.js';

const STYLE_PREFIX = 'md3';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private palette: MonetPalette;
  constructor() {}

  init() {
    this.palette = getMonetPalette('#ff0000');
    this.injectStyleRoot(this.palette, STYLE_PREFIX);
    this.setDarkModeStatusBar();
  }

  getPalette() {
    return this.palette;
  }

  private injectStyleRoot(palette: MonetPalette, prefix: string) {
    const res = Object.keys(palette).reduce(
      (style, shade) =>
        style +
        Object.keys(palette[shade]).reduce(
          (line, strength) =>
            line +
            `--${prefix}-${
              shade.charAt(0) + shade.charAt(shade.length - 1)
            }-${strength}: ${palette[shade][strength]};`,
          ''
        ),
      ''
    );

    const css = `:root {${res}}}`;
    const headEl = document.getElementsByTagName('head')[0];
    const styleEl = document.createElement('style');
    styleEl.dataset.monet = '';
    styleEl.appendChild(document.createTextNode(css));
    headEl.appendChild(styleEl);
  }

  private injectStyleElement(palette: MonetPalette, prefix: string) {
    const res = Object.keys(palette).reduce(
      (style, shade) =>
        style +
        Object.keys(palette[shade]).reduce(
          (line, strength) =>
            line +
            `--${prefix}-${
              shade.charAt(0) + shade.charAt(shade.length - 1)
            }-${strength}: ${palette[shade][strength]};`,
          ''
        ),
      ''
    );

    const css = `:root {${res}}}`;
    const headEl = document.getElementsByTagName('head')[0];
    const styleEl = document.createElement('style');
    styleEl.dataset.monet = '';
    styleEl.appendChild(document.createTextNode(css));
    headEl.appendChild(styleEl);
  }

  private async setDarkModeStatusBar() {
    if (isPlatform('android')) {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        StatusBar.setOverlaysWebView({ overlay: true });
      } catch (e) {}
    }
  }

  private async setLightModeStatusBar() {
    if (isPlatform('android')) {
      try {
        await StatusBar.setStyle({ style: Style.Light });
      } catch (e) {}
    }
  }
}

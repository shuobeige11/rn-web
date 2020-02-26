import { Dimensions, StyleSheet, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

export class StyleParser {
  private guidelineBaseWidth: number = 375;
  private shouldScaleFont: boolean = false;

  constructor(guidelineBaseWidth: number = 375, scaleFont: boolean = false) {
    this.guidelineBaseWidth = guidelineBaseWidth;
    this.shouldScaleFont = scaleFont;
  }

  public setGuidelineBaseWidth(width: number) {
    this.guidelineBaseWidth = width;
  }

  public setScaleFont(scale: boolean) {
    this.shouldScaleFont = scale;
  }

  public scaleView = (size: number) => {
    if (size === StyleSheet.hairlineWidth) {
      return size;
    }
    return WINDOW_WIDTH / this.guidelineBaseWidth * size;
  }
  public px = (size: number) => {
    return PixelRatio.roundToNearestPixel(this.scaleView(size))
  }
  public scaleFont = (size: number) => {
    if (this.shouldScaleFont) {
      return this.scaleView(size);
    }
    return size * PixelRatio.getFontScale();
  }
  public font = (size: number) => {
    return this.scaleFont(size)
  }
}
const UI = new StyleParser(360, false)
export const px = (size: number): number => {
  return UI.px(size)
}
export enum F{
  s12 = UI.font(14),
  s14 = UI.font(14),
  s15 = UI.font(15),
  s16 = UI.font(16),
  s18 = UI.font(18),
}
export default UI;


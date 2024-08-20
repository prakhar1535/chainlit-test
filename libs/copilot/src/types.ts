export interface IWidgetConfig {
  chainlitServer: string;
  botName?: string;
  showCot?: boolean;
  accessToken?: string;
  botId?: string;
  popoverBackground?: string | undefined;
  theme?: 'light' | 'dark';
  fontFamily?: string;
  button?: {
    containerId?: string;
    imageUrl?: string;
    style?: {
      size?: string;
      width?: string;
      height?: string;
      bgcolor?: string;
      color?: string;
      bgcolorHover?: string;
      borderColor?: string;
      borderWidth?: string;
      borderStyle?: string;
      borderRadius?: string;
      boxShadow?: string;
    };
  };
}

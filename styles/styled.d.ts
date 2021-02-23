import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      main: string;
      sub: string;
      black: string;
      gray: string;
    };
  }
}
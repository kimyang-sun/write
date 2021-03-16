import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    padding: 0;
    margin: 0;
    font-family:  'Noto Serif KR', 'Noto Sans KR', -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }

  ::selection {
    background: #6136ff;
  }

  html,
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  p {
    margin: 0;
    padding: 0;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }

  // slick 공통 css
  .slick-list {
    overflow: hidden;
  }

  .slick-slide {
    display: inline-block;
  }
  /* ← */
  .slick-arrow {
    font-size: 0;
    background-color: transparent;
    border: none;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 101;
    width: 38px;
    height:38px;
  }

  .slick-arrow:before {
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .slick-prev {
    left: -80px;
  }

  .slick-next {
    right: -80px;
  }

  .slick-prev:before {
    content: "◀";
  }

  .slick-next:before {
    content: "▶";
  }

  // 게시글 더보기 버튼 정렬
  .ant-btn-group {
    flex-direction: column;
    align-items: center;
  }

  .ant-btn-group > button:first-child {
    margin-bottom: 5px;
  }
  
`;

export default GlobalStyle;

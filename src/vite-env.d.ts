/// <reference types="vite/client" />

declare module 'figma:asset/*.png' {
  const content: string;
  export default content;
}

declare module 'figma:asset/*.jpg' {
  const content: string;
  export default content;
}

declare module 'figma:asset/*.svg' {
  const content: string;
  export default content;
}

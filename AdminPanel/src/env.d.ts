
interface ImportMetaEnv {
    VITE_BACKEND_URL: string;
    VITE_BACKEND_URI: string;
    
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
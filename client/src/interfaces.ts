export interface Metadata {
  title?: string;
  description?: string;
  image?: string;
  error?: string;
}

export interface MetadataDisplayProps {
  metadataList: Metadata[];
}

export interface UrlFormProps {
  onSubmit: (urls: string[]) => void;
}

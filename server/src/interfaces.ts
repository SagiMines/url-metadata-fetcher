// The returned metadata object type of each successful request
export interface Metadata {
  title: string;
  description: string;
  image: string;
}

// The returned error object type of each unsuccessful request
export interface MetadataResult extends Partial<Metadata> {
  error?: string;
}

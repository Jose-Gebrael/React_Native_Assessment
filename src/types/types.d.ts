declare module '@react-native-camera-roll/camera-roll' {
  export function save(
    tag: string,
    options?: {
      type?: 'photo' | 'video' | 'auto';
      album?: string;
    }
  ): Promise<string>;
}

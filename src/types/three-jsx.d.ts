export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any
      bufferGeometry: any
      bufferAttribute: any
      pointsMaterial: any
    }
  }
}

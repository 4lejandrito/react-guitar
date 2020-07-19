declare module 'tone' {
  export function Frequency(value: number, units: 'midi'): FrequencyClass
  export class FrequencyClass {
    toFrequency(): number
  }
  export class Sampler {
    constructor(samples: SamplerOptions['urls'], callback: () => void)
    toMaster(): Sampler
    dispose(): void
    triggerAttackRelease(hertz: number, note: number, when: string): void
  }
  export class SamplerOptions {
    urls: { [K: string]: string }
  }
}
declare module '*.mp3' {
  const value: any
  export = value
}

import {BaseClass} from "~classes/baseClass";

export default class Sound extends BaseClass<Sound> {
  clients: string[];
  asset: string;
  url: string;
  volume: number;
  playbackRate: number;
  channel: [number, number];
  looping: boolean;
  preserveChannels: boolean;

  constructor(params: Partial<Sound> = {}) {
    super(params, "Sound");
    this.clients = params.clients || [];
    this.asset = params.asset || "";
    this.url = `/assets${params.asset}` || "";
    this.volume = params.volume || 1;
    this.playbackRate = params.playbackRate || 1;
    this.channel = params.channel || [0, 1];
    this.looping = params.looping || false;
    this.preserveChannels = !!params.preserveChannels;
  }
}

import {BaseClass} from "~classes/baseClass";

export type DMXChannelProperty =
  | "red"
  | "green"
  | "blue"
  | "amber"
  | "white"
  | "uv"
  | "intensity"
  | "strobe"
  | "generic"
  | "focus"
  | "nothing";

class DMXDevice extends BaseClass<DMXDevice> {
  channels: DMXChannelProperty[];

  constructor(params: Partial<DMXDevice> = {}) {
    super(params, "DMXDevice");
    this.name = params.name || "DMX Device";
    this.channels = params.channels || [];
  }
  setName(name: string) {
    this.name = name;
  }
  setChannels(channels: DMXChannelProperty[]) {
    this.channels = channels;
  }
}

export default DMXDevice;

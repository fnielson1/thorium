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

class ThoriumDMXDevice extends BaseClass<ThoriumDMXDevice> {
  channels: DMXChannelProperty[];

  constructor(params: Partial<ThoriumDMXDevice> = {}) {
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

export default ThoriumDMXDevice;

import {BaseClass} from "~classes/baseClass";

export class MidiControl extends BaseClass<MidiControl> {
  channel: string;
  messageType: string;
  key: string;
  controllerNumber: string;
  channelModeMessage: string;
  actionMode: string;
  config: any;

  constructor(params: Partial<MidiControl> = {}) {
    super(params);
    this.channel = params.channel ?? null;
    this.messageType = params.messageType ?? null;
    this.key = params.key ?? null;
    this.controllerNumber = params.controllerNumber ?? null;
    this.channelModeMessage = params.channelModeMessage ?? null;
    this.actionMode = params.actionMode || "macro";
    this.config = params.config || {};
  }

  update({actionMode, config}: Partial<MidiControl>) {
    this.actionMode = actionMode;
    this.config = config;
  }
}

export class MidiSet extends BaseClass<MidiSet> {
  deviceName: string;
  controls: MidiControl[];

  constructor(params: Partial<MidiSet> = {}) {
    super(params, "MidiSet");
    this.name = params.name || "Default Midi Set";
    this.deviceName = params.deviceName || "X-TOUCH MINI";
    this.controls = [];
    params.controls &&
      params.controls.forEach(c => this.controls.push(new MidiControl(c)));
  }
  rename(name: string) {
    this.name = name;
  }
  setControl({id, ...control}) {
    const ctrl = this.controls.find(
      c =>
        c.channel === control.channel &&
        c.messageType === control.messageType &&
        c.key === control.key &&
        c.controllerNumber === control.controllerNumber &&
        c.channelModeMessage === control.channelModeMessage,
    );
    if (!ctrl) {
      this.controls.push(new MidiControl(control));
    } else {
      ctrl.update(control);
    }
  }
}

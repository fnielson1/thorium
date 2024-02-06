// A set is a collection of clients
import {BaseClass} from "~classes/baseClass";

export default class Set extends BaseClass<Set> {
  name: string;
  clients: SetClient[];

  constructor(params: Partial<Set> = {}) {
    super(params, "Set");
    this.name = params.name || "Default Set";
    this.clients = params.clients || [];
  }
  addClient(client: SetClient) {
    this.clients.push(new SetClient(client));
  }
  removeClient(id: string) {
    this.clients = this.clients.filter(c => c.id !== id);
  }
  rename(name: string) {
    this.name = name;
  }
  updateClient(setClientInput: SetClient) {
    this.clients.find(c => c.id === setClientInput.id).update(setClientInput);
  }
}

// The default configuration for a set
export class SetClient extends BaseClass<SetClient> {
  clientId: string | null;
  simulatorId: string | null;
  stationSet: string | null;
  station: string | null;
  secondary: boolean;
  soundPlayer: boolean;

  constructor(params: Partial<SetClient> = {}) {
    super(params, "SetClient");
    this.clientId = params.clientId || null;
    this.simulatorId = params.simulatorId || null;
    this.stationSet = params.stationSet || null;
    this.station = params.station || null;
    this.secondary = params.secondary || false;
    this.soundPlayer = params.soundPlayer || false;
  }
  update({
    clientId,
    simulatorId,
    stationSet,
    station,
    secondary,
    soundPlayer,
  }: Partial<SetClient>) {
    if (clientId) this.clientId = clientId;
    if (simulatorId) this.simulatorId = simulatorId;
    if (stationSet) this.stationSet = stationSet;
    if (station) this.station = station;
    if (secondary || secondary === false) this.secondary = secondary;
    if (soundPlayer || soundPlayer === false) this.soundPlayer = soundPlayer;
  }
}

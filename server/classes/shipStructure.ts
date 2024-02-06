import uuid from "uuid";
import Environment from "./environment";
import {BaseClass, RecordKey} from "~classes/baseClass";

export class Deck extends BaseClass<Deck> {
  simulatorId: string;
  number: number;
  svgPath: string;
  doors: boolean;
  evac: boolean;
  actualEvac: boolean;
  hallway: string;
  environment: Environment;

  constructor(params: Partial<Deck>) {
    super(params, "Deck");
    this.simulatorId = params.simulatorId || null;
    this.number = params.number || 1;
    this.svgPath = params.svgPath || "";
    this.doors = params.doors || false;
    this.evac = params.evac || false;

    // There needs to be a delay before
    // crew start evacuating. That's what
    // this value is
    this.actualEvac = params.actualEvac || false;

    this.hallway = params.hallway || "";
    this.environment = new Environment(params.environment || {});
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  setDoors(doors) {
    this.doors = doors;
  }
  setEvac(evac) {
    this.evac = evac;
    setTimeout(() => {
      this.actualEvac = evac;
    }, 5000);
  }
  updateHallwaySvg(hallway) {
    this.hallway = hallway;
  }
}

export class Room extends BaseClass<Room> {
  deckId: string;
  gas: boolean;
  svgPath: string;
  metadata: Record<RecordKey, any>;
  roles: string[];

  constructor(params: Partial<Room>) {
    super(params, "Room");
    if (!params.deckId) return null;

    this.simulatorId = params.simulatorId || null;
    this.deckId = params.deckId;
    this.name = params.name || "Vic's Lounge";
    this.gas = params.gas || false;
    this.svgPath = params.svgPath || "";
    this.metadata = params.metadata || {};
    this.roles = params.roles || [];
  }
  setGas(gas) {
    this.gas = gas;
  }
  rename(name) {
    this.name = name;
  }
  updateSvg(svg) {
    this.svgPath = svg;
  }
  updateMetadata(metadata) {
    this.metadata = metadata;
  }
  updateRoles(roles) {
    this.roles = roles;
  }
  setDeck(deckId) {
    this.deckId = deckId;
  }
}

export class InventoryItem extends BaseClass<InventoryItem> {
  simulatorId: string;
  name: string;
  roomCount: Record<RecordKey, any>;
  crewCount: Record<RecordKey, any>;
  metadata: Record<RecordKey, any>;

  constructor(params: Partial<InventoryItem>) {
    super(params, "InventoryItem");
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || "Generic Cargo";
    this.roomCount = {};
    this.crewCount = {};
    if (Array.isArray(params.roomCount)) {
      params.roomCount.forEach(r => {
        this.roomCount[r.room] = r.count;
      });
    } else {
      this.roomCount = params.roomCount || {};
    }
    if (Array.isArray(params.crewCount)) {
      params.crewCount.forEach(r => {
        this.crewCount[r.crew] = r.count;
      });
    } else {
      this.crewCount = params.crewCount || {};
    }
    this.metadata = params.metadata || {};
  }
  move(
    fromRoom: number,
    toRoom: number,
    count: number,
    toSimulator: boolean,
  ): void {
    if (this.roomCount[fromRoom] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.roomCount[fromRoom] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  moveToCrew(fromRoom: number, toCrew: number, count: number): void {
    if (!fromRoom) {
      this.crewCount[toCrew] = count;
    }
    if (this.roomCount[fromRoom] >= count) {
      if (!this.crewCount[toCrew]) this.crewCount[toCrew] = 0;
      this.roomCount[fromRoom] -= count;
      this.crewCount[toCrew] += count;
    }
  }
  moveFromCrew(fromCrew: number, toRoom: number, count: number): void {
    if (this.crewCount[fromCrew] >= count) {
      if (!this.roomCount[toRoom]) this.roomCount[toRoom] = 0;
      this.crewCount[fromCrew] -= count;
      this.roomCount[toRoom] += count;
    }
  }
  updateCount(room: number, count: number): void {
    this.roomCount[room] = Math.max(0, count);
  }
  updateMetadata(metadata: Record<RecordKey, any>): void {
    this.metadata = metadata;
  }
}

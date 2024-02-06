import {
  Crew,
  Deck,
  Flight,
  Mission,
  Room,
  Simulator,
  StationSet,
  System,
  Team,
  Set,
  Client,
  InventoryItem,
  Isochip,
  DockingPort,
  CoreLayout,
  CoreFeed,
  Viewscreen,
  Message,
  TacticalMap,
  OfficerLog,
  Exocomp,
  Library,
  SoftwarePanel,
  SurveyForm,
  Objective,
  Keyboard,
  Task,
  CommandLine,
  Trigger,
  TaskTemplate,
  TaskReport,
  TaskFlow,
  Interface,
  InterfaceDevice,
  Macro,
  MacroButtonConfig,
  MidiSet,
  Entity,
  DMXSet,
  Sound, DMXConfig, DMXDevice, HackingPreset,
} from "~classes";
import Motu from "motu-control";
import {IMigrations} from "~app";


interface ISnapshot {
  _eventsCount: number;
  simulators: Simulator[];
  stationSets: StationSet[];
  flights: Flight[];
  missions: Mission[];
  systems: System[];
  clients: Client[];
  sets: Set[];
  decks: Deck[];
  rooms: Room[];
  crew: Crew[];
  teams: Team[];
  inventory: InventoryItem[];
  isochips: Isochip[];
  dockingPorts: DockingPort[];
  coreLayout: CoreLayout[];
  coreFeed: CoreFeed[];
  viewScreens: Viewscreen[];
  messages: Message[];
  tacticalMaps: TacticalMap[];
  officerLogs: OfficerLog[];
  exocomps: Exocomp[];
  libraryDatabase: Library[];
  softwarePanels: SoftwarePanel[];
  surveyForms: SurveyForm[];
  objectives: Objective[];
  keyboards: Keyboard[];
  sounds: Sound[];
  tasks: Task[];
  commandLine: CommandLine[];
  triggerGroups: Trigger[];
  taskTemplates: TaskTemplate[];
  taskReports: TaskReport[];
  taskFlows: TaskFlow[];
  interfaces: Interface[];
  interfaceDevices: InterfaceDevice[];
  macros: Macro[];
  macroButtonConfigs: MacroButtonConfig[];
  recordTemplates: RecordTemplate[];
  midiSets: MidiSet[];
  entities: Entity;
  motus: Motu[];
  dmxSets: DMXSet[];
  dmxConfigs: DMXConfig[];
  dmxDevices: DMXDevice[];
  hackingPresets: HackingPreset[];
  autoUpdate: boolean;
  thoriumId: string;
  doTrack: boolean;
  askedToTrack: boolean;
  addedTaskTemplates: boolean;
  spaceEdventuresToken: string;
  googleSheetsTokens: unknown;
  migrations: IMigrations;
  port: number;
  httpOnly: boolean;
  events: unknown[];
  replaying: boolean;
  snapshotVersion: number;
  version: number;
  timestamp: string;
  mutations: unknown;
  assetFolders: unknown[];
  assetContainers: unknown[];
  assetObjects: unknown[];
  printQueue: unknown[];
}

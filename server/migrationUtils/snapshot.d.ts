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
  ThoriumSet,
  ThoriumClient,
  InventoryItem,
  Isochip,
  DockingPort,
  CoreLayout,
  CoreFeed,
  Viewscreen,
  ThoriumMessage,
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
} from "~classes";
import Sound from "~classes/sound";
import Motu from "motu-control";

interface ISnapshot {
  _eventsCount: number;
  simulators: Simulator[];
  stationSets: StationSet[];
  flights: Flight[];
  missions: Mission[];
  systems: System[];
  clients: ThoriumClient[];
  sets: ThoriumSet[];
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
  messages: ThoriumMessage[];
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
}

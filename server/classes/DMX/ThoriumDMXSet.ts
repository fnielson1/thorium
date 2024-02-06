import App from "../../app";
import ThoriumDMXFixture from "./ThoriumDMXFixture";
import {BaseClass} from "~classes/baseClass";

export default class ThoriumDMXSet extends BaseClass<ThoriumDMXSet> {
  static exportable = "dmxSets";
  fixtureIds: string[];

  constructor(params: Partial<ThoriumDMXSet> = {}) {
    super(params, "DMXSet");
    this.name = params.name || "DMX Set";
    this.fixtureIds = params.fixtureIds || [];
  }

  serialize({addData}) {
    const filename = `${this.name}.dmxSet`;
    const data = {...this, fixtures: this.fixtures};
    addData("dmxSets", data);
    return filename;
  }
  static import(data: ThoriumDMXSet) {
    // Extract and load the fixtures
    const fixtureIds = data.fixtures.map(f => {
      const fixture = new ThoriumDMXFixture({...f, id: null});
      App.dmxFixtures.push(fixture);
      return fixture.id;
    });
    const dmxSet = new ThoriumDMXSet({...data, fixtureIds, id: null});
    App.dmxSets.push(dmxSet);
  }
  get fixtures() {
    return this.fixtureIds
      .map(id => App.dmxFixtures.find(f => f.id === id))
      .filter(Boolean);
  }
  setName(name: string) {
    this.name = name;
  }
  setFixtures(fixtures: string[]) {
    this.fixtureIds = fixtures;
  }
}

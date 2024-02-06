import taskDefinitions from "../tasks";
import App from "../app";
import {BaseClass} from "~classes/baseClass";

export type ReportType = "default" | "rnd" | "engineering";
type ReportTypes = ReportType[];

export default class TaskTemplate extends BaseClass<TaskTemplate> {
  values: {[key: string]: any};
  definition: string;
  reportTypes: ReportTypes;
  macros: any[];
  preMacros: any[];

  constructor(params: Partial<TaskTemplate> = {}) {
    super(params, "TaskTemplate");
    this.name = params.name || "Task Template";
    this.values = params.values || {};
    this.definition = params.definition || "Generic";
    this.reportTypes = params.reportTypes || ["default", "rnd", "engineering"];
    this.macros = params.macros || [];
    this.preMacros = params.preMacros || [];
  }
  static exportable = "taskTemplates";
  serialize({addData}) {
    const filename = `${this.definition}.taskTemplate`;
    const data = {...this};
    addData("taskTemplates", data);
    return filename;
  }
  static import(data: TaskTemplate) {
    const taskTemplate = new TaskTemplate({...data, id: null});
    App.taskTemplates.push(taskTemplate);
  }
  rename(name: string) {
    this.name = name;
  }
  possibleValues({simulator}) {
    const definition = taskDefinitions.find(t => t.name === this.definition);
    if (!definition || !definition.values) return {};
    return Object.entries(definition.values).reduce((prev, [key, value]) => {
      if (value.input) {
        prev[key] = value.input({simulator});
      }
      return prev;
    }, {});
  }
  setValue(key: string, value: any) {
    this.values[key] = value;
  }
  setValues(values: any) {
    this.values = values;
  }
  setReportTypes(reportTypes: ReportTypes) {
    this.reportTypes = reportTypes || [];
  }
  setMacros(macros: any[]) {
    this.macros = macros || [];
  }
  setPreMacros(macros: any[]) {
    this.preMacros = macros || [];
  }
}

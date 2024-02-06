import uuid from "uuid";
import {BaseClass} from "~classes/baseClass";

// from ./taskFlow.ts
function move(array, old_index, new_index) {
  if (new_index >= array.length) {
    // if new spot is outside of the array
    var k = new_index - array.length; // take the amount of new elements
    while (k-- + 1) {
      // and if that's greater than zero
      array.push(undefined); // put a null value at that point in the array
    }
  }
  array.splice(new_index, 0, array.splice(old_index, 1)[0]); // remove the item at the old index and replace it at the new index
  return array; // for testing purposes
}

class Action extends BaseClass<Action> {
  event: string;
  args: string;
  delay: number;
  noCancelOnReset: boolean;

  constructor(params: Partial<Action>) {
    super(params, "Action");
    this.event = params.event || "";
    this.args = params.args || "{}";
    this.delay = params.delay || 0;
    this.noCancelOnReset = params.noCancelOnReset || false;
  }
}

export default class Macro extends BaseClass<Macro> {
  actions: Action[];

  constructor(params: Partial<Macro>) {
    super(params, "Macro");
    this.name = params.name || "Default Macro";
    this.actions = [];
    params.actions &&
      params.actions.forEach(k => {
        this.actions.push(new Action(k));
      });
  }
  rename(name: string) {
    this.name = name;
  }
  setActions(actions: Action[]) {
    this.actions = actions;
  }
  duplicateAction(actionId: string): string {
    const action = this.actions.find(a => a.id === actionId);
    if (!action) return;
    const newAction = new Action({...action, id: undefined});
    this.actions.push(newAction);
    return newAction.id;
  }
  // For reordering macro button actions
  reorderAction(oldIndex: number, newIndex: number): void {
    this.actions = move(this.actions, oldIndex, newIndex);
  }
}

class MacroButton extends Macro {
  color: string;
  category: string;

  constructor(params: Partial<MacroButton>) {
    super(params);
    this.color = params.color || "primary";
    this.category = params.category || "general";
  }
  setColor(color: string) {
    this.color = color;
  }
  setCategory(category: string) {
    this.category = category;
  }
}

export class MacroButtonConfig extends BaseClass<MacroButtonConfig> {
  buttons: MacroButton[];

  constructor(params: Partial<MacroButtonConfig>) {
    super(params, "MacroButtonConfig");
    this.name = params.name || "Macro Button";
    this.buttons = [];
    (params.buttons || []).forEach(b => this.buttons.push(new MacroButton(b)));
  }
  rename(name: string) {
    this.name = name;
  }
  removeButton(id: string) {
    this.buttons = this.buttons.filter(b => b.id !== id);
  }
  addButton(name: string) {
    const button = new MacroButton({name});
    this.buttons.push(button);
    return button;
  }
  getButton(id: string) {
    return this.buttons.find(b => b.id === id);
  }
  // For reordering macro buttons
  reorderButton(oldIndex: number, newIndex: number) {
    this.buttons = move(this.buttons, oldIndex, newIndex);
  }
}

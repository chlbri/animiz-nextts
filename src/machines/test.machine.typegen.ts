// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(1000)#(machine).fr": {
      type: "xstate.after(1000)#(machine).fr";
    };
    "xstate.after(1000)#(machine).off": {
      type: "xstate.after(1000)#(machine).off";
    };
    "xstate.after(1000)#(machine).on": {
      type: "xstate.after(1000)#(machine).on";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "fr" | "off" | "on";
  tags: never;
}

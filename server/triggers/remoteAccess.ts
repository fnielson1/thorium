import App from "../app";

export function remoteAccessSendCode({simulatorId, code}) {
  return {simulatorId, code};
}

export function remoteAccessUpdateCode({
  simulatorId,
  codeId,
  state,
}: {
  simulatorId: string;
  codeId: string;
  state: "Denied" | "Accepted";
}) {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  const code = simulator.ship.remoteAccessCodes.find(c => c.id === codeId);
  return {
    simulatorId,
    state: state === "Accepted" ? "true" : "false",
    code: code.code,
  };
}

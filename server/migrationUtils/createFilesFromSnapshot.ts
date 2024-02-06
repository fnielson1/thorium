import fs from "fs";
import {Mission} from "~classes";

let snapshotFilepath = process.argv?.[0] ?? "../snapshots/snapshot";
begin(snapshotFilepath);

function begin(snapshotFilepath: string): void {
  if (fs.existsSync(snapshotFilepath)) {
    const missions = getAllMissions();
  }
}

function getAllMissions(): Mission[] {
  return [];
}

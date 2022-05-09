import path from "path";
import fs from "fs";

export const keycloakFilePathInput = path.join(
  __dirname,
  "../.kube-workflow/files/realm-export.json"
);

export const keycloakFilePathOutput = path.join(
  __dirname,
  "../.kube-workflow/files/realm-export-local.json"
);

export const keycloakKeysToReplace = {
  NEXTAUTH_URL: "http://localhost:3000",
  KEYCLOAK_CLIENT_SECRET: "**********",
};

export const wordDetection = "env";

const getLatestObject = (
  object: Record<string, any>,
  objectKeysToReplace: Record<string, string>,
  wordToDetect: string
) => {
  for (let [key, value] of Object.entries(object)) {
    if (typeof value === "object") {
      getLatestObject(object[key], objectKeysToReplace, wordToDetect);
    } else {
      for (let [key, value] of Object.entries(object)) {
        if (typeof value === "string" && value.includes(wordToDetect)) {
          for (let [keyToReplace, valueToReplace] of Object.entries(
            objectKeysToReplace
          )) {
            if (typeof value === "string" && object[key].includes(keyToReplace))
              object[key] = valueToReplace;
          }
        }
      }
    }
  }
  return object;
};

export const parseFile = (
  filePathInput: string,
  filePathOutput: string,
  objectKeysToReplace: Record<string, string>,
  wordToDetect: string
) => {
  const file = fs.readFileSync(filePathInput, "utf8");
  const newJson: Record<string, any> = { ...JSON.parse(file) };
  const object = getLatestObject(newJson, objectKeysToReplace, wordToDetect);
  fs.writeFileSync(filePathOutput, JSON.stringify(object, null, 2));
};

const run = () => {
  parseFile(
    keycloakFilePathInput,
    keycloakFilePathOutput,
    keycloakKeysToReplace,
    wordDetection
  );
  console.log("Keycloak configuration for local configured.");
};

run();

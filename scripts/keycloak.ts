import path from "path";
import fs from "fs";

export const keycloakFilePathInput = path.join(
  __dirname,
  "../.kube-workflow/files/realm-export.json"
);

export const keycloakFilePathOutput = path.join(
  __dirname,
  "../realm-export.json"
);
export const keycloakKeysToReplace = {
  NEXTAUTH_URL: "http://localhost:3000",
  KEYCLOAK_CLIENT_SECRET: "**********",
};

export const parseFile = (
  filePathInput: string,
  filePathOutput: string,
  valueContainsWord: string,
  keysToReplace: Record<string, any>
) => {
  const file = fs.readFileSync(filePathInput, "utf8");
  const newJson: Record<string, any> = { ...JSON.parse(file) };
  for (let [key, value] of Object.entries(newJson)) {
    if (typeof value === "string" && value.includes(valueContainsWord)) {
      for (let [keyToReplace, valueToReplace] of Object.entries(
        keysToReplace
      )) {
        if (typeof value === "string" && newJson[key].includes(keyToReplace))
          newJson[key] = valueToReplace;
      }
    }
  }
  fs.writeFileSync(filePathOutput, JSON.stringify(newJson, null, 2));
};

const run = () => {
  parseFile(
    keycloakFilePathInput,
    keycloakFilePathOutput,
    "getenv",
    keycloakKeysToReplace
  );
  console.log("Keycloak configuration for local configured.");
};

run();

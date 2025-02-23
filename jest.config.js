export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Para arquivos .mjs
    "^.+\\.mjs$": "babel-jest", // Para arquivos .mjs
  },
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "mts", "js", "mjs", "json"],
  globalSetup: "./src/tests/setup.mjs",
  setupFilesAfterEnv: ["./src/tests/afterSetup.mjs"],
};

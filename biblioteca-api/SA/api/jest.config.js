export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Relatório de Testes - Biblioteca API",
      "outputPath": "test-report.html",
      "includeFailureMsg": true,
      "includeSuiteFailure": true
    }]
  ]
}
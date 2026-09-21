// Fichier calculé : expose directement le tableau "services" comme donnée
// globale Eleventy, à partir du fichier JSON brut édité via le CMS
// (services-data.json). Les templates continuent d'utiliser `services`
// sans rien changer.
const raw = require("./services-data.json");

module.exports = raw.services;

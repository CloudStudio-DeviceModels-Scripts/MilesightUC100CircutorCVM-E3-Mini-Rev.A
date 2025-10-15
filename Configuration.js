function getConfiguration(config) {
    config.addressLabel = { en: "DevEUI", es: "DevEUI" };
}

function getEndpoints(deviceAddress, endpoints) {
    endpoints.addEndpoint("1", "Fase A Sensor de Voltaje", endpointType.voltageSensor);
    endpoints.addEndpoint("2", "Fase A Sensor de Corriente", endpointType.currentSensor);
    var ae = endpoints.addEndpoint("4", "Energía Activa", endpointType.genericSensor);
    ae.variableTypeId = 1440; // kWh
    endpoints.addEndpoint("6", "Fase A Potencia Aparente", endpointType.apparentPowerSensor);
    endpoints.addEndpoint("7", "Fase A Potencia Activa", endpointType.activePowerSensor);
    endpoints.addEndpoint("8", "Fase B Sensor de Voltaje", endpointType.voltageSensor);
    endpoints.addEndpoint("9", "Fase B Sensor de Corriente", endpointType.currentSensor);
    endpoints.addEndpoint("13", "Fase B Potencia Aparente", endpointType.apparentPowerSensor);
    endpoints.addEndpoint("14", "Fase B Potencia Activa", endpointType.activePowerSensor);
    endpoints.addEndpoint("15", "Fase C Sensor de Voltaje", endpointType.voltageSensor);
    endpoints.addEndpoint("16", "Fase C Sensor de Corriente", endpointType.currentSensor);
    endpoints.addEndpoint("20", "Fase C Potencia Aparente", endpointType.apparentPowerSensor);
    endpoints.addEndpoint("21", "Fase C Potencia Activa", endpointType.activePowerSensor);
    endpoints.addEndpoint("22", "Potencia Activa Total", endpointType.activePowerSensor);
    endpoints.addEndpoint("23", "Potencia Aparente Total", endpointType.apparentPowerSensor);
    endpoints.addEndpoint("24", "Corriente Total", endpointType.currentSensor);
}

function validateDeviceAddress(address, result) {}

function updateDeviceUIRules(device, rules) {}

function updateEndpointUIRules(endpoint, rules) {
    rules.canDelete = true;
}

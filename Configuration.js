function getConfiguration(config) {
    // This function allows you to indicate general configuration values
    // for all devices of this model.

    // Depending on the meaning of the "device address" in this device, 
    // you may want to change the label that is used to refer to the 
    // address in the user interface.
    // For instance, if the address of the device is actually a MAC 
    // address, you may want to use the code below.

    config.addressLabel = { en: "DevEUI", es: "DevEUI" };
}

function getEndpoints(deviceAddress, endpoints)
{
  // This function allows you to indicate the initial endpoint configuration
  // when a device is created using this model. This improves end-user 
  // experience significantly, because it allows the platform to create
  // all endpoints included in the device automatically when the device
  // is created.

  // In the code below, two endpoints are created. The first is a
  // temperature sensor, while the second one is a carbon dioxide sensor.

  endpoints.addEndpoint("1", "Fase A Sensor de Voltaje", endpointType.voltageSensor);
  endpoints.addEndpoint("2", "Fase A Sensor de Corriente", endpointType.currentSensor);
  var ae = endpoints.addEndpoint("4", "Energía Activa", endpointType.genericSensor);
  ae.variableTypeId = 1440;
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
  endpoints.addEndpoint("23", "Potencia Apparente Total", endpointType.apparentPowerSensor);
  endpoints.addEndpoint("24", "Corriente Total", endpointType.currentSensor);

}

function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  // rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
  rules.canDelete = true;
  // rules.canEditSubType = (endpoint.address == "2");
}

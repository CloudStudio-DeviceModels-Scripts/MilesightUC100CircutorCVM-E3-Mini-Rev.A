function parseUplink(device, payload) {

    var payloadb = payload.asBytes();
    var decoded = Decoder(payloadb, payload.port)
    env.log(decoded);

    if (decoded.modbus_chn_1 != null) {
    var va = device.endpoints.byAddress("1");
    if (va != null)
    va.updateVoltageSensorStatus((decoded.modbus_chn_1)/10);
    }

    if (decoded.modbus_chn_2 != null) {
    var va = device.endpoints.byAddress("8");
    if (va != null)
    va.updateVoltageSensorStatus((decoded.modbus_chn_2)/10);
    }

    if (decoded.modbus_chn_3 != null) {
    var va = device.endpoints.byAddress("15");
    if (va != null)
    va.updateVoltageSensorStatus((decoded.modbus_chn_3)/10);
    }

/*    if (Payload.a_current != null) {
    var c1 = device.endpoints.byAddress("2");
    if (c1 != null)
    c1.updateCurrentSensorStatus(Payload.a_current);
    }

    if (Payload.a_pf != null) {
    var phi1 = device.endpoints.byAddress("3");
    if (phi1 != null)
    phi1.updateCosPhiSensorStatus(Payload.a_pf);
    }

    if (Payload.a_act_power != null) {
    var ap1 = device.endpoints.byAddress("7");
    if (ap1 != null)
    ap1.updateActivePowerSensorStatus(Payload.a_act_power);
    }

    if (Payload.a_aprt_power != null) {
    var app1 = device.endpoints.byAddress("6");
    if (app1 != null)
    app1.updateApparentPowerSensorStatus(Payload.a_aprt_power);
    }



    if (Payload.b_current != null) {
    var c1 = device.endpoints.byAddress("9");
    if (c1 != null)
    c1.updateCurrentSensorStatus(Payload.b_current);
    }

    if (Payload.b_pf != null) {
    var phi1 = device.endpoints.byAddress("10");
    if (phi1 != null)
    phi1.updateCosPhiSensorStatus(Payload.b_pf);
    }

    if (Payload.b_act_power != null) {
    var ap1 = device.endpoints.byAddress("14");
    if (ap1 != null)
    ap1.updateActivePowerSensorStatus(Payload.b_act_power);
    }

    if (Payload.b_aprt_power != null) {
    var app1 = device.endpoints.byAddress("13");
    if (app1 != null)
    app1.updateApparentPowerSensorStatus(Payload.b_aprt_power);
    }

    if (Payload.c_current != null) {
    var c1 = device.endpoints.byAddress("16");
    if (c1 != null)
    c1.updateCurrentSensorStatus(Payload.c_current);
    }

    if (Payload.c_pf != null) {
    var phi1 = device.endpoints.byAddress("17");
    if (phi1 != null)
    phi1.updateCosPhiSensorStatus(Payload.c_pf);
    }

    if (Payload.c_act_power != null) {
    var ap1 = device.endpoints.byAddress("21");
    if (ap1 != null)
    ap1.updateActivePowerSensorStatus(Payload.c_act_power);
    }

    if (Payload.c_aprt_power != null) {
    var app1 = device.endpoints.byAddress("20");
    if (app1 != null)
    app1.updateApparentPowerSensorStatus(Payload.c_aprt_power);
    }

    if (Payload.total_act_power != null) {
    var apt = device.endpoints.byAddress("22");
    if (apt != null)
    apt.updateActivePowerSensorStatus(Payload.total_act_power);
    }

    if (Payload.total_aprt_power != null) {
    var appt = device.endpoints.byAddress("23");
    if (appt != null)
    appt.updateApparentPowerSensorStatus(Payload.total_aprt_power);
    }

    if (Payload.total_current != null) {
    var ct = device.endpoints.byAddress("24");
    if (ct != null)
    ct.updateCurrentSensorStatus(Payload.total_current);
    }/*

/*        // Store Current 2
        if (decoded.currentma2 != null) {
            var c2 = device.endpoints.byAddress("2");

            if (c2 != null)
                c2.UpdateCurrentSensorStatus(decoded.currentma2);

            // Store Current 3
            if (decoded.currentma3 != null) {
                var c3 = device.endpoints.byAddress("3");

                if (c3 != null)
                    c3.UpdateCurrentSensorStatus(decoded.currentma3);
*/

}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}

/**
 * Payload Decoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product UC100
 */

// The Things Network
function Decoder(bytes, port) {
    return milesightDeviceDecode(bytes);
}

function milesightDeviceDecode(bytes) {
    var decoded = {};
    for (var i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // POWER
        if (channel_id === 0xff && channel_type === 0x0b) {
            decoded.power = "on";
            i += 1;
        }
        // IPSO VERSION
        else if (channel_id === 0xff && channel_type === 0x01) {
            decoded.protocol_version = readProtocolVersion(bytes[i]);
            i += 1;
        }
        // SERIAL NUMBER
        else if (channel_id === 0xff && channel_type === 0x16) {
            decoded.sn = readSerialNumber(bytes.slice(i, i + 8));
            i += 8;
        }
        // HARDWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x09) {
            decoded.hardware_version = readHardwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // FIRMWARE VERSION
        else if (channel_id === 0xff && channel_type === 0x0a) {
            decoded.firmware_version = readFirmwareVersion(bytes.slice(i, i + 2));
            i += 2;
        }
        // MODBUS
        else if (channel_id === 0xff && channel_type === 0x19) {
            var modbus_chn_id = bytes[i++] + 1;
            var data_length = bytes[i++];
            var data_type = bytes[i++];
            var sign = (data_type >>> 7) & 0x01;
            var type = data_type & 0x7f; // 0b01111111
            var modbus_chn_name = "modbus_chn_" + modbus_chn_id;
            switch (type) {
                case 0:
                    decoded[chn] = bytes[i] ? "on" : "off";
                    i += 1;
                    break;
                case 1:
                    decoded[chn] = bytes[i];
                    i += 1;
                    break;
                case 2:
                case 3:
                    decoded[modbus_chn_name] = sign ? readInt16LE(bytes.slice(i, i + 2)) : readUInt16LE(bytes.slice(i, i + 2));
                    i += 2;
                    break;
                case 4:
                case 6:
                case 8:
                case 9:
                case 10:
                case 11:
                    decoded[modbus_chn_name] = sign ? readInt32LE(bytes.slice(i, i + 4)) : readUInt32LE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
                case 5:
                case 7:
                    decoded[modbus_chn_name] = readFloatLE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
            }
        }
        // MODBUS READ ERROR
        else if (channel_id === 0xff && channel_type === 0x15) {
            var modbus_chn_id = bytes[i] + 1;
            var channel_name = "modbus_chn_" + modbus_chn_id + "_alarm";
            decoded[channel_name] = "read error";
            i += 1;
        } else {
            break;
        }
    }
    return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt8(bytes) {
    return bytes & 0xff;
}

function readInt8(bytes) {
    var ref = readUInt8(bytes);
    return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
    var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
    return (value & 0xffffffff) >>> 0;
}

function readInt32LE(bytes) {
    var ref = readUInt32LE(bytes);
    return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function readFloatLE(bytes) {
    // JavaScript bitwise operators yield a 32 bits integer, not a float.
    // Assume LSB (least significant byte first).
    var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 23) & 0xff;
    var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
}

function readProtocolVersion(bytes) {
    var major = (bytes & 0xf0) >> 4;
    var minor = bytes & 0x0f;
    return "v" + major + "." + minor;
}

function readHardwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = (bytes[1] & 0xff) >> 4;
    return "v" + major + "." + minor;
}

function readFirmwareVersion(bytes) {
    var major = bytes[0] & 0xff;
    var minor = bytes[1] & 0xff;
    return "v" + major + "." + minor;
}

function readSerialNumber(bytes) {
    var temp = [];
    for (var idx = 0; idx < bytes.length; idx++) {
        temp.push(("0" + (bytes[idx] & 0xff).toString(16)).slice(-2));
    }
    return temp.join("");
}
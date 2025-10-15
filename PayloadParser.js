function parseUplink(device, payload) {
    var bytes = payload.asBytes();
    var decoded = Decoder(bytes, payload.port);
    env.log(decoded); // Debug

    // Voltajes (dV → V)
    if (decoded.modbus_chn_1 != null) device.endpoints.byAddress("1")?.updateVoltageSensorStatus(decoded.modbus_chn_1 / 10);
    if (decoded.modbus_chn_2 != null) device.endpoints.byAddress("8")?.updateVoltageSensorStatus(decoded.modbus_chn_2 / 10);
    if (decoded.modbus_chn_3 != null) device.endpoints.byAddress("15")?.updateVoltageSensorStatus(decoded.modbus_chn_3 / 10);

    // Corrientes (mA → A)
    if (decoded.modbus_chn_4 != null) device.endpoints.byAddress("2")?.updateCurrentSensorStatus(decoded.modbus_chn_4 / 1000);
    if (decoded.modbus_chn_5 != null) device.endpoints.byAddress("9")?.updateCurrentSensorStatus(decoded.modbus_chn_5 / 1000);
    if (decoded.modbus_chn_6 != null) device.endpoints.byAddress("16")?.updateCurrentSensorStatus(decoded.modbus_chn_6 / 1000);
    if (decoded.modbus_chn_4 != null && decoded.modbus_chn_5 != null && decoded.modbus_chn_6 != null) {
        device.endpoints.byAddress("24")?.updateCurrentSensorStatus(
            (decoded.modbus_chn_4 + decoded.modbus_chn_5 + decoded.modbus_chn_6) / 1000
        );
    }

    // Potencia activa total (W)
    if (decoded.modbus_chn_7 != null && decoded.modbus_chn_8 != null && decoded.modbus_chn_9 != null) {
        device.endpoints.byAddress("22")?.updateActivePowerSensorStatus(
            decoded.modbus_chn_7 + decoded.modbus_chn_8 + decoded.modbus_chn_9
        );
    }

    // Potencia aparente total (VA)
    if (decoded.modbus_chn_19 != null && decoded.modbus_chn_20 != null && decoded.modbus_chn_21 != null) {
        device.endpoints.byAddress("23")?.updateApparentPowerSensorStatus(
            decoded.modbus_chn_19 + decoded.modbus_chn_20 + decoded.modbus_chn_21
        );
    }

    // Potencia activa por fase (W)
    if (decoded.modbus_chn_7 != null) device.endpoints.byAddress("7")?.updateActivePowerSensorStatus(decoded.modbus_chn_7);
    if (decoded.modbus_chn_8 != null) device.endpoints.byAddress("14")?.updateActivePowerSensorStatus(decoded.modbus_chn_8);
    if (decoded.modbus_chn_9 != null) device.endpoints.byAddress("21")?.updateActivePowerSensorStatus(decoded.modbus_chn_9);

    // Potencia aparente por fase (VA)
    if (decoded.modbus_chn_19 != null) device.endpoints.byAddress("6")?.updateApparentPowerSensorStatus(decoded.modbus_chn_19);
    if (decoded.modbus_chn_20 != null) device.endpoints.byAddress("13")?.updateApparentPowerSensorStatus(decoded.modbus_chn_20);
    if (decoded.modbus_chn_21 != null) device.endpoints.byAddress("20")?.updateApparentPowerSensorStatus(decoded.modbus_chn_21);

    // Energía activa acumulada (Wh → kWh)
    if (decoded.modbus_chn_22 != null) device.endpoints.byAddress("4")?.updateGenericSensorStatus(decoded.modbus_chn_22 / 1000);
}

/* Decoder original de Milesight */
function Decoder(bytes, port) {
    return milesightDeviceDecode(bytes);
}

function milesightDeviceDecode(bytes) {
    var decoded = {};
    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        if (channel_id === 0xff && channel_type === 0x19) {
            var modbus_chn_id = bytes[i++] + 1;
            var data_length = bytes[i++];
            var data_type = bytes[i++];
            var sign = (data_type >>> 7) & 0x01;
            var type = data_type & 0x7f;
            var modbus_chn_name = "modbus_chn_" + modbus_chn_id;
            switch (type) {
                case 2: case 3:
                    decoded[modbus_chn_name] = sign ? readInt16LE(bytes.slice(i, i+2)) : readUInt16LE(bytes.slice(i, i+2));
                    i += 2; break;
                case 4: case 6: case 8: case 9: case 10: case 11:
                    decoded[modbus_chn_name] = sign ? readInt32LE(bytes.slice(i, i+4)) : readUInt32LE(bytes.slice(i, i+4));
                    i += 4; break;
                case 5: case 7:
                    decoded[modbus_chn_name] = readFloatLE(bytes.slice(i, i+4));
                    i += 4; break;
                default:
                    i += data_length;
            }
        } else if (channel_id === 0xff && channel_type === 0x15) {
            var modbus_chn_id = bytes[i++] + 1;
            decoded["modbus_chn_" + modbus_chn_id + "_alarm"] = "read error";
        } else {
            break;
        }
    }
    return decoded;
}

function readUInt16LE(bytes) { return (bytes[1] << 8) + bytes[0]; }
function readInt16LE(bytes) { var val = readUInt16LE(bytes); return val > 0x7fff ? val - 0x10000 : val; }
function readUInt32LE(bytes) { return ((bytes[3] << 24) >>> 0) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0]; }
function readInt32LE(bytes) { var val = readUInt32LE(bytes); return val > 0x7fffffff ? val - 0x100000000 : val; }
function readFloatLE(bytes) {
    var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 23) & 0xff;
    var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
    return sign * m * Math.pow(2, e - 150);
}

export default function cardExpTime (fechaCreacion, fechaVencimiento) {

    //if(fechaCreacion[0] != 0) fechaCreacion = '0' + fechaCreacion
    const fxdCreaDate = `${fechaCreacion.slice(3, 5)}/${fechaCreacion.slice(0, 2)}/${fechaCreacion.slice(6, 10)}`

    let fechaCrea = new Date (fxdCreaDate);

    //if(fechaVencimiento[0] != 0) fechaVencimiento = '0' + fechaVencimiento
    const fxdExpDate = `${fechaVencimiento.slice(3, 5)}/${fechaVencimiento.slice(0, 2)}/${fechaVencimiento.slice(6, 10)}`

    let fechaVto = new Date (fxdExpDate);

    let diferencia = fechaVto.getTime() - fechaCrea.getTime();

    if (diferencia <= 0) {
    return 'Vencida';
    }

    else if (diferencia <= 90 * 24 * 60 * 60 * 1000) {
    return 'Expira pronto';
    }

    else {
    return 'Activa';
    }
}
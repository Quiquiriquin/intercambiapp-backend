import cron from "node-cron";
import moment from "moment-timezone";
// import {sendMail} from "../src/utils/EmailUtils";
import exchangeController from "../src/controllers/ExchangeController";
import pairsController from "../src/controllers/PairsController";

export default () =>
  cron.schedule(
    "30 * * * * *",
    async () => {
      const exchanges = await exchangeController.listAll({
        where: {
          hasPairs: false,
        },
      });
      console.log(exchanges);
      for (let i = 0; i < exchanges.length; i++) {
        const { reservationLimit } = exchanges[i];
        if (
          moment(new Date(reservationLimit).setHours(1))
            .add(1, "day")
            .format("YYYY-MM-DD") ===
          moment(new Date().setHours(0, 0, 0, 0)).format("YYYY-MM-DD")
        ) {
          const { id: idExchange } = exchanges[i];
          const confirmed = [];
          const pendingPromises = [];
          exchanges[i].Invitations.forEach((invite) =>
            invite.confirmed ? confirmed.push(invite) : null
          );
          if (confirmed.length % 2 === 0) {
            let left = 0;
            let right = confirmed.length - 1;
            while (left < right) {
              const from = {
                idExchange,
                from: confirmed[left].id,
                to: confirmed[right].id,
              };
              const to = {
                idExchange,
                from: confirmed[right].id,
                to: confirmed[left].id,
              };
              pendingPromises.push(from);
              pendingPromises.push(to);
              left++;
              right--;
            }
          } else {
            for (let j = 0; j < confirmed.length; j++) {
              let aux = {};
              if (j === confirmed.length - 1) {
                aux = {
                  idExchange,
                  from: confirmed[j].id,
                  to: confirmed[0].id,
                };
              } else {
                aux = {
                  idExchange,
                  from: confirmed[j].id,
                  to: confirmed[j + 1].id,
                };
              }
              pendingPromises.push(aux);
            }
          }
          const newPairs = await Promise.all(
            pendingPromises.map((pair) => pairsController.create(pair))
          );
          await exchangeController.update(idExchange, {
            hasPairs: true,
          });
          console.log(newPairs);
          console.log("Hay que hacer parejas");
        }
      }
      // for(let i = 0; i < alerts.length; i++) {
      //   const { fechaAlerta, estatus, descripcion, id } = alerts[i];
      //   const refDate = moment(fechaAlerta).tz('America/Mexico_City').hour(0).minute(0).second(0).millisecond(0);
      //   const today = moment().tz('America/Mexico_City');
      //   const dif = today.diff(refDate, "day");
      //   if ( dif > 0 ) {
      //     await notificacionController.crearNotificacion({
      //       fechaNotificacion: new Date().toDateString(),
      //       descripcion: `Se ha llegado a la fecha límite del evento: ${descripcion}.`,
      //       titulo: '¡Un evento ha vencido!',
      //     });
      //     console.log('VENCIDO')
      //     await alertasController.actualizarAlertaPlanificada(id, {
      //       estatus: 'VENCIDO',
      //     });
      //
      //
      //     mailsParaEnviar.push(await sendMail(destinatarios, 'Alerta vencida', 'AlertaVencida.html', {
      //       __TITLE__: 'UNA EVENTO HA VENCIDO',
      //       __ESTATUS__: `ha VENCIDO`,
      //       __DESCRIPTION__: descripcion,
      //       __FECHA__: fechaAlerta,
      //     }));
      //   } else if( dif === -30 ) {
      //     await notificacionController.crearNotificacion({
      //       fechaNotificacion: new Date().toDateString(),
      //       descripcion: `Falta un mes para el vencimiento del evento: ${descripcion}`,
      //       titulo: '¡Evento próximo a vencer!',
      //     });
      //
      //
      //     mailsParaEnviar.push(await sendMail(destinatarios, 'Alerta vencida', 'AlertaVencida.html', {
      //       __TITLE__: 'EVENTO PRÓXIMO A VENCER',
      //       __ESTATUS__: `esta próximo a vencer, restan 30 días`,
      //       __DESCRIPTION__: descripcion,
      //       __FECHA__: fechaAlerta,
      //     }));
      //   } else if( dif === -7 ) {
      //     await notificacionController.crearNotificacion({
      //       fechaNotificacion: new Date().toDateString(),
      //       descripcion: `Faltan 7 días para el vencimiento del evento: ${descripcion}`,
      //       titulo: '¡Un evento ha vencido!',
      //     });
      //
      //     mailsParaEnviar.push(await sendMail(destinatarios, 'Alerta vencida', 'AlertaVencida.html', {
      //       __TITLE__: 'EVENTO PRÓXIMO A VENCER',
      //       __ESTATUS__: `esta próximo a vencer, restan 7 días`,
      //       __DESCRIPTION__: descripcion,
      //       __FECHA__: fechaAlerta,
      //     }));
      //   } else if(dif === -1) {
      //
      //     await notificacionController.crearNotificacion({
      //       fechaNotificacion: new Date().toDateString(),
      //       descripcion: `Mañana es el vencimiento de un evento: ${descripcion}`,
      //       titulo: '¡Un evento ha vencido!',
      //     });
      //
      //     mailsParaEnviar.push(await sendMail(destinatarios, 'Alerta vencida', 'AlertaVencida.html', {
      //       __TITLE__: 'EVENTO PRÓXIMO A VENCER',
      //       __ESTATUS__: `esta próximo a vencer, resta 1 día`,
      //       __DESCRIPTION__: descripcion,
      //       __FECHA__: fechaAlerta,
      //     }));
      //   }
      // };
      //
      // await Promise.all(mailsParaEnviar);
      console.log("Todas las alertas han sido verificadas");
    },
    {
      scheduled: true,
      timezone: "America/Mexico_City",
    }
  );

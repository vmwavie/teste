const express = require("express");

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  try {
    console.log('headers')
    console.log(req.headers);
    console.log("----------------------------------------\n\n");
    console.log("Recebendo notificação de pagamento:");
    console.log(req.body);
    console.log("----------------------------------------\n\n");

    const notification = req.body;

    if (notification.charges && notification.charges.length > 0) {
      const charge = notification.charges[0];
      const paymentType = charge.payment_method?.type || "UNKNOWN";

      console.log("Tipo de pagamento:", paymentType);
    } else {
      console.log("Cobranças não encontradas no payload.");
    }

    res.status(200).send(notification);
  } catch (error) {
    console.error("Erro ao processar a notificação:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8080, () => {
  console.log(`Servidor rodando na porta ${8080}`);
});

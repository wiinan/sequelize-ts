import { object, string, number, mixed } from "yup";

enum choseStatus {
  open = "open",
  canceled = "canceled",
  finished = "finished",
}

export default {
  store: {
    body: object()
      .shape({
        request_id: number().required("O campo solicitante e obrigatorio"),
        product_id: string()
          .matches(
            /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            "Campo de ID invalido"
          )
          .required(),
        status: mixed()
          .oneOf(Object.values(choseStatus))
          .required("O campo solicitante e obrigatorio"),
        total_price: number()
          .test("is-decimal", "invalid decimal", (value): any => {
            if ((value + "").match(/^\d*\.{1}\d*$/)) return true;
          })
          .required("O campo precisa ter um valor!"),
      })
      .noUnknown(),
  },

  update: {
    body: object().shape({
      name: string().min(1),
      price: number().test("is-decimal", "invalid decimal", (value): any => {
        if ((value + "").match(/^\d*\.{1}\d*$/)) return true;
      }),
    }),
    params: object()
      .shape({
        id: string()
          .matches(
            /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            "Campo de ID invalido"
          )
          .required(),
      })
      .noUnknown(),
  },

  delete: {
    params: object()
      .shape({
        id: string()
          .matches(
            /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            "Campo de ID invalido"
          )
          .required(),
      })
      .noUnknown(),
  },
};

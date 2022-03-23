import { object, string, number } from "yup";

export default {
  store: {
    body: object()
      .shape({
        provider_id: number().required("O campo fornecedor e obrigatorio"),
        price: number()
          .test("is-decimal", "invalid decimal", (value): any => {
            if ((value + "").match(/^\d*\.{1}\d*$/)) return true;
          })
          .required("O campo precisa ter um valor!"),
      })
      .noUnknown(),
  },

  update: {
    body: object().shape({
      provider_id: string().min(1),
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

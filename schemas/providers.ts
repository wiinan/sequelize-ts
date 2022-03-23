import { object, string, number } from "yup";

export default {
  store: {
    body: object()
      .shape({
        name: string().required("O campo nome e obrigatorio"),
        email: string().email().required("O campo email e obrigatorio"),
        cep: number().required("O campo cep e obrigatorio"),
        number: number().required("O campo numero e obrigatorio"),
        street: string().required("O campo rua e obrigatorio"),
        city: string().required("O campo cidade e obrigatorio"),
        country: string().required("O campo estado e obrigatorio"),
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
      name: string().min(1),
      email: string().email().min(1),
      cep: number().min(1),
      number: number().min(1),
      street: string().min(1),
      city: string().min(1),
      country: string().min(1),
      price: number().min(1),
    }),
    params: object().shape({
      id: number().required(),
    }),
  },

  delete: {
    params: object()
      .shape({
        id: number().required(),
      })
      .noUnknown(),
  },
};

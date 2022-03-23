import { object, string, number, ref } from "yup";

export default {
  store: {
    body: object()
      .shape({
        name: string().required("O campo nome e obrigatorio"),
        email: string().email().required("O campo email e obrigatorio"),
        password: string().required("O campo senha e obrigatorio"),
        confirm_password: string()
          .oneOf([ref("password"), null], "As senhas nao sao iguais!")
          .required("O campo confirmacao de senha e obrigatorio"),
      })
      .noUnknown(),
  },

  login: {
    body: object()
      .shape({
        email: string().email().required("O campo email e obrigatorio"),
        password: string().required("O campo senha e obrigatorio"),
      })
      .noUnknown(),
  },

  update: {
    body: object().shape({
      name: string(),
      email: string().email(),
      password: string(),
      confirm_password: string().oneOf(
        [ref("password"), null],
        "As senhas nao sao iguais!"
      ),
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

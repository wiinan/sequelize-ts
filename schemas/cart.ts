import { object, string, number } from "yup";

export default {
  store: {
    body: object().shape({
      user_id: number().required("O campo de usuario e obrigatorio"),
      total_price: number(),
    }),
    params: object()
      .shape({
        id: string().required(),
      })
      .noUnknown(),
  },

  update: {
    body: object().shape({
      product_id: string().min(1),
      user_id: number().min(1),
      total_price: number(),
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

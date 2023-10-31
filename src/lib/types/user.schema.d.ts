import * as yup from "yup";

export const UserSchema = yup.object().noUnknown().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  name: yup.string().required(),
  image: yup.string(),
});

export type User = yup.InferType<typeof UserSchema>;

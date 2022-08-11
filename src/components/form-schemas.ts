import * as yup from 'yup';

export const newArticleSchema = yup
  .object({
    title: yup
      .string()
      .min(3, 'Title needs to be at least 3 characters')
      .max(20, 'Title needs to be at max 20 characters')
      .required('Should not be empty'),
    description: yup
      .string()
      .min(3, 'Short description needs to be at least 3 characters')
      .max(40, 'Short description needs to be at max 40 characters')
      .required(),
    body: yup.string().required('Text should not be empty!'),
  })
  .required();

export const newAccountSchema = yup
  .object({
    username: yup
      .string()
      .min(3, 'Username needs to be at least 3 characters')
      .max(20, 'Username needs to be at max 20 characters')
      .required('Username is required field!'),
    email: yup.string().email('Email should be a valid!').required('Email is required field!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.')
      .required('Password is required field!'),
    repeat: yup
      .string()
      .required('Please, repeat the password!')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    checkbox: yup.boolean().required('Accept your agree').oneOf([true], 'Accept your agree'),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup.string().email('Email should be a valid!').required('Email is required field!'),
    password: yup
      .string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be at max 40 characters.')
      .required('Password is required field!'),
  })
  .required();

export const editProfileSchema = yup
  .object({
    username: yup
      .string()
      .min(3, 'Username needs to be at least 3 characters')
      .max(20, 'Username needs to be at max 20 characters')
      .required('Should not be empty'),
    email: yup.string().email('Email should be a valid!'),
    password: yup.string(),
    image: yup.string(),
  })
  .required();

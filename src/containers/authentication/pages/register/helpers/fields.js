import * as Yup from "yup"
import { fromJS } from 'immutable'
import {INPUT} from "src/components/handle-fields"

export const loginFields = fromJS([
  {
    name: "firstName",
    component: INPUT,
    placeholder: "First Name",
    label: "First Name",
    inputClassName: "form-control form-control-lg form-control-solid",
    inputGroupClassName: "fv-row mb-10 fv-plugins-icon-container",
    type: "text",
    size: 6,
    validation: Yup.string().email().nullable().required()
  },
  {
    name: "lastName",
    component: INPUT,
    placeholder: "Last Name",
    label: "Last Name",
    inputClassName: "form-control form-control-lg form-control-solid",
    inputGroupClassName: "fv-row mb-10 fv-plugins-icon-container",
    type: "text",
    size: 6,
    validation: Yup.string().email().nullable().required()
  },
  {
    name: "email",
    component: INPUT,
    placeholder: "E-mail",
    label: "E-mail",
    inputClassName: "form-control form-control-lg form-control-solid",
    inputGroupClassName: "fv-row mb-10 fv-plugins-icon-container",
    type: "text",
    validation: Yup.string().email().nullable().required()
  },
  {
    name: "password",
    component: INPUT,
    placeholder: "Password",
    label: "Password",
    inputClassName: "form-control form-control-lg form-control-solid",
    inputGroupClassName: "fv-row mb-10 fv-plugins-icon-container",
    type: "password",
    validation: Yup.string().nullable().required()
  }
])

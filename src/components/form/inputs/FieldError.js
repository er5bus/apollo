import React from "react"
import { Trans } from "react-i18next"
import { ErrorMessage } from "formik"
import {getAttr} from "src/helpers"
import {useControlUISelector} from "../context"


export const FieldError = ({ fieldName }) => {

  const formUiProps = useControlUISelector()

  if (formUiProps && formUiProps.getFieldError(fieldName)){
    return <div className="invalid-feedback"><Trans> {formUiProps.getFieldError(fieldName)} </Trans></div>
  }

  return <ErrorMessage name={fieldName}>
    {(msg) =>
    <div className="invalid-feedback"><Trans> { msg } </Trans></div>
    }
  </ErrorMessage>
}

export const useFieldCSSClasses = (touched, errors, fieldName) => {
  const fieldError = getAttr(errors, fieldName, false)
  const fieldTouched = getAttr(touched, fieldName, false)

  const formUiProps = useControlUISelector()
  const classes = [""]

  if ((fieldTouched && fieldError) || (formUiProps && formUiProps.getFieldError(fieldName))) {
    classes.push("is-invalid is-invalid-select")
  }

  if (fieldTouched && !fieldError && (formUiProps && !formUiProps.getFieldError(fieldName))) {
    classes.push("is-valid is-valid-select")
  }

  return classes.join(" ")
}


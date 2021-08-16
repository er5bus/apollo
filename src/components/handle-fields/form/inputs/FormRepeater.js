import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import { Button, Col, Row } from 'react-bootstrap'
import { useFormikContext, FieldArray } from 'formik'

const FormRepeater = (props) => {
  const addRef = useRef()
  const { children, label, min = 0, showDeleteButton=true, showAddButton=true, max = 50, show = true } = props

  const formik = useFormikContext()

  const nestedFields = React.useMemo(() => {
    const formChildrens = [React.Children.toArray(children)]
    let fields = []

    while (formChildrens.length > 0) {
      const formChildren = formChildrens.pop()
      for (const child of formChildren) {
        if (!_.isEmpty(child) && _.isArray(_.get(child, 'props.fields', false))) {
          fields = [...fields, ..._.get(child, 'props.fields', [])]
        }
        if (!_.isEmpty(child) && _.isArray(_.get(child, 'props.children', false))) {
          formChildrens.push(_.get(child, 'props.children', []))
        }
      }
    }
    return fields
  }, [children])

  const fieldArrayName = React.useMemo(() => {
    const field = nestedFields[0] || ''
    return field.name.substring(0, field.name.lastIndexOf('[]'))
  }, [nestedFields])

  const arrayFieldValues = React.useMemo(() => {
    return _.get(formik.values, fieldArrayName, [])
  }, [formik.values, fieldArrayName])

  const initialSnapshot = React.useMemo(() => {
    const snapshot = {}
    nestedFields.forEach(field => {
      _.set(snapshot, field.name.substring(field.name.lastIndexOf('[]') + 1), _.get(field, 'initialValue', ''))
    })
    return snapshot
  }, [nestedFields])

  useEffect(() => {
    if (_.isArray(arrayFieldValues) && arrayFieldValues.length < min) {
      for (let i = 0; i < min; i++) {
        addRef && addRef.current.click()
      }
    }
    // eslint-disable-next-line
  }, [addRef, arrayFieldValues])

  return (
    <div className={!show ? 'd-none' : ''}>
      <FieldArray
        name={fieldArrayName}
        render={arrayHelpers => {
          return (
            <div>
              { showAddButton && <Button
                disabled={_.isArray(arrayFieldValues) && arrayFieldValues.length >= max}
                ref={addRef}
                className='btn btn-sm font-weight-bold btn-primary'
                onClick={() => _.isArray(arrayFieldValues) && arrayFieldValues.length < max && arrayHelpers.push(initialSnapshot)}
              >
                <i className='fas fa-plus' />
                {label}
              </Button>}
              {(_.has(formik.values, fieldArrayName) && _.isArray(arrayFieldValues)) && arrayFieldValues.map((__, index) => (
                <div className='mt-5 border-bottom' key={index}>
                  <Row>
                    <Col lg={ showDeleteButton ? 11 : 12}>
                      <Row className='d-flex align-items-end'>
                        {React.Children.map(children, (child, idx) => React.cloneElement(child, { key:index+idx, index }, null))}
                      </Row>
                    </Col>
                    {showDeleteButton && <Col lg='1' className='d-flex align-items-center justify-content-center'>
                      <Button
                        disabled={min > 0 ? _.isArray(arrayFieldValues) && arrayFieldValues.length === min : false}
                        className='btn btn-sm font-weight-bold btn-danger btn-icon'
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <i className='fas fa-trash-alt' />
                      </Button>
                    </Col> }
                  </Row>
                </div>
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}

export default FormRepeater

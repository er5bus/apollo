/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Trans } from 'react-i18next'
import { motion } from "framer-motion";
import { Img } from "src/components/controls"

import { toAbsoluteUrl } from "src/helpers";
import { APP_VERSION } from "src/store/constants";


const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100%"
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: "100%"
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1
};


const Layout = ({ children }) => (
  <>
    {/*<!--begin::Main-->*/}
    <div className="d-flex flex-column flex-root">
      {/*<!--begin::Authentication - Sign-in -->*/}
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        {/*<!--begin::Aside-->*/}
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="d-flex flex-column flex-lg-row-auto w-xl-500px aside-auth-bg">
          {/*<!--begin::Header-->*/}
          <div className="d-flex flex-column text-center p-10 pt-lg-20">
            {/*<!--begin::Logo-->*/}
            <a href="index.html" className="py-9">
              <Img
                alt="Logo"
                className="h-70px"
                path="/media/logos/logo.svg"
              />
            </a>
            {/*<!--end::Logo-->*/}
            {/*<!--begin::Title-->*/}
            <h1 className="fw-bolder fs-2qx pb-5 pb-md-10"><Trans>Welcome to our traning center</Trans></h1>
            {/*<!--end::Title-->*/}
            {/*<!--begin::Description-->*/}
            <p className="fw-bold fs-2"><Trans>Interactive learning <br /> To help you pass your exam</Trans></p>
            {/*<!--end::Description-->*/}
          </div>
          {/*<!--end::Header-->*/}
          {/*<!--begin::Illustration-->*/}
          <div
            className="d-flex flex-row-fluid bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-size-lg-auto bgi-position-y-bottom min-h-100px min-h-lg-350px"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/svg/illustrations/auth.svg")})`,
            }} />
          {/*<!--end::Illustration-->*/}
        </motion.div>
        {/*<!--begin::Aside-->*/}
        {/*<!--begin::Body-->*/}
        <div className="d-flex flex-column flex-lg-row-fluid py-10">
          {/*<!--begin::Content-->*/}
          <div className="d-flex flex-center flex-column flex-column-fluid">
            {/*<!--begin::Wrapper-->*/}
            <div className="w-lg-500px p-10 p-lg-15 mx-auto">
              {children}
            </div>
            {/*<!--end::Wrapper-->*/}
          </div>
          {/*<!--end::Content-->*/}
          {/*<!--begin::Footer-->*/}
          <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0">
            {/*<!--begin::Links-->*/}
            <div className="d-flex flex-center fw-bold fs-6">
              <div className="text-dark-50 font-weight-bolder order-2 order-sm-1 my-2">
                {new Date().getFullYear()} © {APP_VERSION}
              </div>
            </div>
            {/*<!--end::Links-->*/}
          </div>
          {/*<!--end::Footer-->*/}
        </div>
        {/*<!--end::Body-->*/}
      </div>
      {/*<!--end::Authentication - Sign-in-->*/}
    </div>
    {/*<!--end::Main-->*/}
  </>
)

export default Layout;

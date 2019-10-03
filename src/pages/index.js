import React from "react"
import withLayout from "../layout"

import Countries from "../components/Countries"


const IndexPage = () => (
  <main>
    <Countries />
  </main>
)

export default withLayout(IndexPage)

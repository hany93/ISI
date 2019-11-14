

import styled from 'styled-components'

const GlobalStyleL = styled.div`
  &#components-form-demo-normal-login .login-form {
    max-width: 300px;
    position: relative;
    top: 100px;
    right: 40%;
    left: 40%;
  }
  &#components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  &#components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
`
const GlobalStyleR = styled.div`
    max-width: 500px;
    position: relative;
    top: 50px;
    right: 30%;
    left: 30%;  
`

const GlobalStyleLayout = styled.div`
&#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);  
  margin: 16px 28px 16px 0;
  float: left;
}
`
const GlobalStylePagination = styled.div`
.ant-pagination  {
  float: right;
}
`
const GlobalStyleSelect = styled.div`
width: auto;
`
export { GlobalStyleL, GlobalStyleR, GlobalStyleLayout, GlobalStylePagination, GlobalStyleSelect }
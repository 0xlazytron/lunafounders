import React from "react";
import PropTypes from "prop-types";
import { Button as AntButton } from "antd";
import styled from "styled-components";

const StyledButton = styled(AntButton)`
  background: var(--bs-primary);
  border: 0px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  height: 45px;
  color: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &:hover,
  &:focus {
    background: var(--bs-primary-dark);
    border-color: rgba(255, 255, 255, 0.4);
    color: #fff;
  }

  &:active {
    background: var(--bs-primary-darker);
  }

  .anticon {
    margin-right: 8px;
    font-size: 16px;
  }
`;

const Button = ({
  icon,
  children,
  type = "default",
  htmlType = "submit",
  ...props
}) => {
  return (
    <StyledButton type={type} htmlType={htmlType} {...props}>
      {icon}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
  type: PropTypes.string,
  htmlType: PropTypes.string,
};

export default Button;

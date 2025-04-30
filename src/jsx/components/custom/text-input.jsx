import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import styled from "styled-components";

const StyledInput = styled(Input)`
  background: transparent !important;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 2px;
  height: 45px;
  color: #fff;
  padding-left: 40px;

  &:hover,
  &:focus {
    border-color: rgb(255, 255, 255);
    box-shadow: none;
    background: transparent !important;
  }

  &::placeholder {
    color: rgb(255, 255, 255);
  }

  &.ant-input-affix-wrapper {
    background: transparent !important;
  }

  &.ant-input {
    background: transparent !important;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  .anticon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(255, 255, 255);
    font-size: 16px;
    z-index: 1;
  }
`;

const TextInput = ({
  icon,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
  ...props
}) => {
  return (
    <InputWrapper>
      {icon && icon}
      <StyledInput
        prefix={null}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        {...props}
      />
    </InputWrapper>
  );
};

TextInput.propTypes = {
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default TextInput;

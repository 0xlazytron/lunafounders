import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import nouislider from "nouislider";

import { isEqual } from "./utils";

const areEqual = (prevProps, nextProps) => {
  const { start, step, disabled, range } = prevProps;
  return (
    nextProps.step === step &&
    isEqual(nextProps.start, start) &&
    nextProps.disabled === disabled &&
    isEqual(nextProps.range, range)
  );
};

const Nouislider = (props) => {
  const [slider, setSlider] = useState(null);
  const sliderContainer = React.createRef();

  useEffect(() => {
    const { instanceRef } = props;
    const isCreatedRef =
      instanceRef &&
      Object.prototype.hasOwnProperty.call(instanceRef, "current");
    if (instanceRef && instanceRef instanceof Function) {
      instanceRef(sliderContainer.current);
    }

    if (isCreatedRef) {
      instanceRef.current = sliderContainer.current;
    }

    return () => {
      if (isCreatedRef) {
        instanceRef.current = null;
      }
    };
  }, [sliderContainer]);

  const clickOnPip = (pip) => {
    const value = Number(pip.target.getAttribute("data-value"));
    if (slider) {
      slider.set(value);
    }
  };

  const toggleDisable = (disabled) => {
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      if (!disabled) {
        sliderHTML.removeAttribute("disabled");
      } else {
        sliderHTML.setAttribute("disabled", true);
      }
    }
  };

  const updateOptions = (options) => {
    const sliderHTML = sliderContainer.current;
    sliderHTML.noUiSlider.updateOptions(options);
  };

  const setClickableListeners = () => {
    if (props.clickablePips) {
      const sliderHTML = sliderContainer.current;
      [].slice
        .call(sliderHTML.querySelectorAll(".noUi-value"))
        .forEach((pip) => {
          pip.style.cursor = "pointer";
          pip.addEventListener("click", clickOnPip);
        });
    }
  };

  const createSlider = () => {
    const { onUpdate, onChange, onSlide, onStart, onEnd, onSet } = props;
    const sliderComponent = nouislider.create(sliderContainer.current, {
      ...props,
    });

    if (onStart) {
      sliderComponent.on("start", onStart);
    }

    if (onSlide) {
      sliderComponent.on("slide", onSlide);
    }

    if (onUpdate) {
      sliderComponent.on("update", onUpdate);
    }

    if (onChange) {
      sliderComponent.on("change", onChange);
    }

    if (onSet) {
      sliderComponent.on("set", onSet);
    }

    if (onEnd) {
      sliderComponent.on("end", onEnd);
    }

    setSlider(sliderComponent);
  };

  useEffect(() => {
    const { disabled } = props;
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      toggleDisable(disabled);
      createSlider();
    }
    return () => {
      if (slider) slider.destroy();
      if (sliderHTML) {
        [].slice
          .call(sliderHTML.querySelectorAll(".noUi-value"))
          .forEach((pip) => {
            pip.removeEventListener("click", clickOnPip);
          });
      }
    };
  }, []);

  useEffect(() => {
    if (slider) {
      setClickableListeners();
    }
  }, [slider]);

  const { start, disabled, range, step } = props;

  useEffect(() => {
    if (slider) {
      updateOptions({ range, step });
      slider.set(start);
      setClickableListeners();
    }
    toggleDisable(disabled);
  }, [start, disabled, range, step]);

  const { id, className, style } = props;
  const options = {};
  if (id) {
    options.id = id;
  }
  if (className) {
    options.className = className;
  }
  return <div {...options} ref={sliderContainer} style={style} />;
};

Nouislider.propTypes = {
  animate: PropTypes.bool,

  behaviour: PropTypes.string,
  className: PropTypes.string,
  clickablePips: PropTypes.bool,

  connect: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.bool),
    PropTypes.bool,
  ]),

  direction: PropTypes.oneOf(["ltr", "rtl"]),

  disabled: PropTypes.bool,
  format: PropTypes.object,
  keyboardSupport: PropTypes.bool,
  id: PropTypes.string,
  instanceRef: PropTypes.oneOf([PropTypes.func, PropTypes.object]),

  limit: PropTypes.number,

  margin: PropTypes.number,

  onChange: PropTypes.func,

  onEnd: PropTypes.func,

  onSet: PropTypes.func,

  onSlide: PropTypes.func,

  onStart: PropTypes.func,

  onUpdate: PropTypes.func,

  orientation: PropTypes.oneOf(["horizontal", "vertical"]),

  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),

  pips: PropTypes.object,

  range: PropTypes.object.isRequired,
  snap: PropTypes.bool,

  start: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  ]).isRequired,

  step: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),

  tooltips: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
      PropTypes.bool,
      PropTypes.shape({
        from: PropTypes.func,
        to: PropTypes.func,
      })
    ),
  ]),
};

Nouislider.defaultProps = {
  animate: true,
  behaviour: "tap",
  className: null,
  clickablePips: false,
  connect: false,
  direction: "ltr",
  disabled: false,
  format: null,
  margin: null,
  limit: null,
  keyboardSupport: true,
  id: null,
  instanceRef: null,
  padding: 0,
  pips: null,
  snap: false,
  step: null,
  style: null,
  orientation: "horizontal",
  tooltips: false,
  onChange: () => {},
  onEnd: () => {},
  onSet: () => {},
  onSlide: () => {},
  onStart: () => {},
  onUpdate: () => {},
};

export default React.memo(Nouislider, areEqual);

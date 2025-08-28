import React, { useState, useRef, useCallback } from 'react';

// Custom implementation based on Radix UI's slider pattern
const SliderRoot = React.forwardRef(
  ({ className, children, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState(null);
    const trackRef = useRef(null);
    
    const getValueFromPosition = useCallback((clientX)=> {
      if (!trackRef.current) return min;
      
      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percentage * (max - min);
      
      // Round to nearest step
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(min, Math.min(max, steppedValue));
    }, [min, max, step]);

    const handleMouseDown = useCallback((e, thumbIndex) => {
      e.preventDefault();
      setIsDragging(true);
      setActiveThumb(thumbIndex);
      
      const handleMouseMove = (e) => {
        const newValue = getValueFromPosition(e.clientX);
        const newValues = [...value];
        
        if (thumbIndex === 0) {
          // Min thumb - ensure it doesn't go above max
          newValues[0] = Math.min(newValue, value[1] - step);
        } else {
          // Max thumb - ensure it doesn't go below min
          newValues[1] = Math.max(newValue, value[0] + step);
        }
        
        onValueChange(newValues);
      };
      
      const handleMouseUp = () => {
        setIsDragging(false);
        setActiveThumb(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, [value, onValueChange, getValueFromPosition, step]);

    const handleTrackClick = useCallback((e) => {
      if (isDragging) return;
      
      const clickValue = getValueFromPosition(e.clientX);
      const distanceToMin = Math.abs(clickValue - value[0]);
      const distanceToMax = Math.abs(clickValue - value[1]);
      
      // Move the closest thumb
      const newValues= [...value];
      if (distanceToMin <= distanceToMax) {
        newValues[0] = Math.min(clickValue, value[1] - step);
      } else {
        newValues[1] = Math.max(clickValue, value[0] + step);
      }
      
      onValueChange(newValues);
    }, [value, onValueChange, getValueFromPosition, isDragging, step]);

    return (
      <div
        ref={ref}
        className={`relative flex w-full touch-none select-none items-center ${className || ''}`}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === SliderTrack) {
            return React.cloneElement(child, {
              ref: trackRef,
              onClick: handleTrackClick,
              value,
              min,
              max
            });
          }
          if (React.isValidElement(child) && child.type === SliderThumb) {
            const thumbIndex = index - 1; // Subtract 1 because track is first child
            return React.cloneElement(child, {
              value: value[thumbIndex],
              onMouseDown: (e) => handleMouseDown(e, thumbIndex),
              position: ((value[thumbIndex] - min) / (max - min)) * 100,
              isActive: activeThumb === thumbIndex
            });
          }
          return child;
        })}
      </div>
    );
  }
);

const SliderTrack = React.forwardRef(
  ({ className, children, onClick, value, min, max }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 cursor-pointer ${className || ''}`}
        onClick={onClick}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SliderRange && value && min !== undefined && max !== undefined) {
            //@ts-ignore
            return React.cloneElement(child, { value, min, max });
          }
          return child;
        })}
      </div>
    );
  }
);

const SliderRange = React.forwardRef(
  ({ className, value, min, max }, ref) => {
    if (!value || min === undefined || max === undefined) {
      return null;
    }
    
    const left = ((value[0] - min) / (max - min)) * 100;
    const width = ((value[1] - value[0]) / (max - min)) * 100;
    
    return (
      <div
        ref={ref}
        className={`absolute h-full bg-green-600 ${className || ''}`}
        style={{
          left: `${left}%`,
          width: `${width}%`
        }}
      />
    );
  }
);

const SliderThumb = React.forwardRef(
  ({ className, children, value, onMouseDown, position, isActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative block h-4 w-4 rounded-full border-2 border-green-600 bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 cursor-pointer ${
          isActive ? 'scale-110' : ''
        } ${className || ''}`}
        style={{
          position: 'absolute',
          left: `${position}%`,
          transform: 'translateX(-50%)',
          zIndex: isActive ? 30 : 20
        }}
        onMouseDown={onMouseDown}
      >
        {children}
      </div>
    );
  }
);

// Your DualRangeSlider component using the custom primitives
const DualRangeSlider = React.forwardRef(
  ({ className, label, labelPosition = 'top', ...props }, ref) => {
    const initialValue= Array.isArray(props.value) 
      ? props.value 
      : [props.min || 0, props.max || 100];
    
    return (
      <SliderRoot
        ref={ref}
        className={className}
        {...props}
      >
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        {initialValue.map((value, index) => (
          <SliderThumb key={index}>
            {label && (
              <span
                className={`absolute flex w-full justify-center text-xs text-gray-600 whitespace-nowrap ${
                  labelPosition === 'top' ? '-top-7' : 'top-4'
                }`}
              >
                {label(value)}
              </span>
            )}
          </SliderThumb>
        ))}
      </SliderRoot>
    );
  }
);

DualRangeSlider.displayName = 'DualRangeSlider';

// Set display names for better debugging
SliderRoot.displayName = 'SliderRoot';
SliderTrack.displayName = 'SliderTrack';
SliderRange.displayName = 'SliderRange';
SliderThumb.displayName = 'SliderThumb';

export { DualRangeSlider, SliderRoot, SliderTrack, SliderRange, SliderThumb };